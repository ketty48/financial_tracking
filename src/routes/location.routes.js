import express from 'express';
const locationRouter = express.Router();
import { test, addlocation, deletelocation, getlocations, findById, updatelocation,  } from '../controllers/location.controller.js';
import { addlocationValidation, testValidations } from '../utils/validation.js';
import { setTime } from '../middlewares/time.js';

locationRouter.post('/test', testValidations, test);
locationRouter.post('/add', setTime, addlocationValidation, addlocation);
locationRouter.get('/list', getlocations);
locationRouter.put('/update', setTime, updatelocation);
locationRouter.get('/findById', findById);
locationRouter.delete('/delete', deletelocation);

export default locationRouter;