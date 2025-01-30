import express from 'express';
import { setPlayer } from './setPlayer/index.js';
import { getPlayer } from './getPlayer/index.js';

const ApiEndpoints = express.Router({ mergeParams: true });

ApiEndpoints.post('/setPlayer',setPlayer );
ApiEndpoints.get('/getPlayer',getPlayer );
export default ApiEndpoints;