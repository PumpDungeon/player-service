import express from 'express';
import { setPlayer } from './setPlayer/index.js';
import { getPlayer } from './getPlayer/index.js';
import { helloWorld } from './helloWorld/index.js';

const ApiEndpoints = express.Router({ mergeParams: true });

ApiEndpoints.post('/setPlayer',setPlayer );
ApiEndpoints.get('/getPlayer',getPlayer );
ApiEndpoints.get('/helloWorld',helloWorld );
export default ApiEndpoints;