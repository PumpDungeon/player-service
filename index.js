import express from 'express';
import mongoose from 'mongoose';
import Player from './entities/player/index.js';
import PublicEndpoints from './api/index.js';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import amqp from 'amqplib';
import { initWebSocket } from "./webSocket/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors({}));
app.use(PublicEndpoints);

const server = createServer(app);
initWebSocket(server);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const existingCollections = (await db.listCollections().toArray()).map(c => c.name);

        if (!existingCollections.includes(Player.collection.name)) {
            await Player.createCollection();
            console.log(`Collection '${Player.collection.name}' created`);
        }

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
            console.log(`WebSocket running at ws://localhost:${port}`);
        });

        await setupRabbitMQConsumers();

    })
    .catch(err => console.error('MongoDB connection failed:', err));

async function setupRabbitMQConsumers() {
    try {
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);
        const channel = await connection.createChannel();

        async function setupConsumer(playerId) {
            const queue = playerId;

            await channel.assertQueue(queue, {
                durable: true
            });

            console.log(`Waiting for messages in queue: ${queue}`);

            channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    const messageContent = JSON.parse(msg.content.toString());
                    console.log(`Received message: ${JSON.stringify(messageContent)}`);

                    const playerId = messageContent.player._id;
                    const updatedData = messageContent.player;

                    await Player.findByIdAndUpdate(playerId, updatedData);

                    channel.ack(msg);
                }
            }, {
                noAck: false
            });
        }

        const players = await Player.find({}, '_id');
        players.forEach(player => setupConsumer(player._id.toString()));

    } catch (err) {
        console.error('RabbitMQ connection failed:', err);
    }
}