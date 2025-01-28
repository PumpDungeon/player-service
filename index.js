import express from 'express';
import mongoose from 'mongoose';
import Player from './entities/player/index.js';
import PublicEndpoints from './api/index.js';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import {initWebSocket} from "./webSocket/index.js";
const app = express();
const port = 3002;

dotenv.config();

app.use(express.json());

app.use(cors({}));

app.use(PublicEndpoints);
const server = createServer(app);
initWebSocket(server);

mongoose.connect(process.env.MONGO_URL , {
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
            console.log(`Serveur actif sur http://localhost:${port}`);
            console.log(`WebSocket actif sur ws://localhost:${port}`);
        });
    })
    .catch(err => console.error('MongoDB connection failed:', err));
