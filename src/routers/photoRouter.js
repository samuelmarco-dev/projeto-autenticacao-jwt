import { Router } from 'express';

import { seePhotosUser, sendPhotosUser } from '../controllers/photosControllers.js';
import { validateSchemaPhoto } from '../middlewares/photoSchemaMiddleware.js';
import { validToken } from '../middlewares/tokenMiddleware.js';

const photoRouter = Router();

photoRouter.get('/photos', validToken, seePhotosUser);
photoRouter.post('/photos', validateSchemaPhoto, validToken, sendPhotosUser);

export default photoRouter;