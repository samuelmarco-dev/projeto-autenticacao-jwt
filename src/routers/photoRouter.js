import { Router } from 'express';

import { seePhotosUser, sendPhotosUser } from '../controllers/photosControllers.js';

const photoRouter = Router();

photoRouter.get('/photos', seePhotosUser);
photoRouter.post('/photos', sendPhotosUser);

export default photoRouter;