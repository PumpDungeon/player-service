import express from 'express';

import ApiEndpoints from './routes/index.js'

const PublicEndpoints = express.Router({ mergeParams: true });

PublicEndpoints.use('/api', ApiEndpoints);
export default PublicEndpoints;