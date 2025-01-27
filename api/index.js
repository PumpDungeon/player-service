import express from 'express';

const router = express.Router();

import PublicRoutes from './routes'

const PublicEndpoints = express.Router({ mergeParams: true });

PublicEndpoints.use('/api', PublicRoutes);
export default PublicEndpoints;
module.exports = router;