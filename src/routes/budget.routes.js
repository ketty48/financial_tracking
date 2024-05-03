import express from 'express';

const budgetRouter = express.Router();
import { addBudgets,getUserBudgets,getUserBudget,updateUserBudget,deleteUserBudget} from '../controllers/budget.controller.js';
import { requireAuth } from '../middlewares/authorization.js';
budgetRouter.use(requireAuth);

budgetRouter.post('/add', addBudgets);
budgetRouter.get('/list', getUserBudgets);
budgetRouter.get('/userBudget',getUserBudget)
budgetRouter.put('/updateUserBudget',updateUserBudget)
budgetRouter.delete('/deleteUserBudget',deleteUserBudget)




export default budgetRouter;