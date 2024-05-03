import express from 'express';
const goalsRouter = express.Router();
import { addGoal, getUserGoals,getUserGoal ,updateUserGoal ,deleteUserGoal} from '../controllers/goal.controller.js';
import { requireAuth } from '../middlewares/authorization.js';
goalsRouter.use(requireAuth);
goalsRouter.post('/add', addGoal);
goalsRouter.get('/list', getUserGoals);
goalsRouter.get('/getUserGoal', getUserGoal);

goalsRouter.put('/updateUserGoal', updateUserGoal);

goalsRouter.delete('/deleteUserGoal', deleteUserGoal);


export default goalsRouter;