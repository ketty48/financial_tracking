import expenseRouter from './expense.routes.js';
import goalsRouter from './goal.routes.js';
import budgetRouter from './budget.routes.js';
import express from 'express';
import userRouter from './user.routes.js';
import tokenRouter from './authToken.routes.js';
import { checkBudgetExceedsIncome,checkExpenseBeforeInsert } from "../utils/helperFunctions.js"
const router = express.Router();

router.use('/expenses',checkExpenseBeforeInsert , expenseRouter);
router.use('/budget', budgetRouter);
router.use('/user', userRouter);
router.use('/token', tokenRouter);
router.use('/goals', goalsRouter);

export default router;