import express from 'express';
import { setPlayer } from './setPlayer';
import { getPlayer } from './getPlayer';

const ApiEndpoints = express.Router({ mergeParams: true });

ApiEndpoints.post('/setPlayer',setPlayer );
ApiEndpoints.get('/getPlayer',getPlayer );
export default ApiEndpoints;