import express from 'express';
const expenseRouter = express.Router();
import { addExpense, getUserExpenses,getExpense, getExpenses, deleteExpense, updateExpense, getUserExpense, deleteUserExpense,updateUserExpense  } from '../controllers/expense.controller.js';
import { addexpenseValidation, testValidations } from '../utils/validation.js';
import { setTime } from '../middlewares/time.js';

expenseRouter.post('/add', addExpense);
expenseRouter.get('/userExpenses', getUserExpenses);
expenseRouter.put('/update', updateExpense);
expenseRouter.get('/list', getExpenses);
expenseRouter.delete('/delete', deleteExpense);
expenseRouter.get('/userExpense', getUserExpense);
expenseRouter.delete('/deleteUserExpense', deleteUserExpense);
expenseRouter.put('/updateUserExpense', updateUserExpense);
expenseRouter.get('findById', getExpense)

export default expenseRouter;