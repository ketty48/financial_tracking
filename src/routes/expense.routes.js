import express from 'express';
const expenseRouter = express.Router();
import { addExpense, getExpenses,  getUserExpense, deleteUserExpense,updateUserExpense  } from '../controllers/expense.controller.js';
import { addexpenseValidation, testValidations } from '../utils/validation.js';

import { requireAuth } from '../middlewares/authorization.js';
expenseRouter.use(requireAuth);
expenseRouter.post('/add', addExpense);
expenseRouter.get('/list', getExpenses);
expenseRouter.get('/userExpense', getUserExpense);
expenseRouter.delete('/deleteUserExpense', deleteUserExpense);
expenseRouter.put('/updateUserExpense', updateUserExpense);
export default expenseRouter;