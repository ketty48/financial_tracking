import locationRouter from './location.routes.js';
import weatherDataRouter from './weatherData.routes.js';
import express from 'express';
import userRouter from './user.routes.js';
import tokenRouter from './authToken.routes.js';

const router = express.Router();

router.use('/locations', locationRouter);
router.use('/weatherDatas', weatherDataRouter);
router.use('/user', userRouter);
router.use('/token', tokenRouter);

export default router;