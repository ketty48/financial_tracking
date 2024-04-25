import express from 'express';
const goalsRouter = express.Router();
import { addGoal, getUserGoals, getGoals,getGoal,updateGoal,deleteGoal,getUserGoal ,updateUserGoal ,deleteUserGoal} from '../controllers/goal.controller.js';


goalsRouter.post('/add', addGoal);
goalsRouter.get('/userGoals', getUserGoals);
goalsRouter.put('/update', updateGoal);
goalsRouter.get('/findById', getGoal);
goalsRouter.delete('/delete', deleteGoal);
goalsRouter.get('/getUserGoal', getUserGoal);

goalsRouter.put('/updateUserGoal', updateUserGoal);

goalsRouter.delete('/deleteUserGoal', deleteUserGoal);
goalsRouter.get('/list',getGoals)

export default goalsRouter;