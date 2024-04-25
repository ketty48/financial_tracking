import express from 'express';
const budgetRouter = express.Router();
import { addBudget,getUserBudgets,getBugets, getBuget , updateBudget ,deleteBudget,getUserBudget,updateUserBudget,deleteUserBudget} from '../controllers/budget.controller.js';


budgetRouter.post('/add', addBudget);
budgetRouter.get('/listUser', getUserBudgets);
budgetRouter.put('/update', updateBudget);
budgetRouter.get('/findById',getBugets);
budgetRouter.delete('/delete', deleteBudget);
budgetRouter.get('/userBudget',getUserBudget)
budgetRouter.put('/updateUserBudget',updateUserBudget)
budgetRouter.delete('/deleteUserBudget',deleteUserBudget)
budgetRouter.get('/getBuget',getBuget)



export default budgetRouter;