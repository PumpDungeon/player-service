import express from 'express';
import mongoose from 'mongoose';

import Player from './entities/player/index.js';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/playerDB', {
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

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => console.error('MongoDB connection failed:', err));