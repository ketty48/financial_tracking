import { NotFoundError, BadRequestError } from '../errors/index.js';
import expenseModel from '../models/expense.model.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';
import Expense from '../models/expense.model.js';
import user from '../models/user.model.js';
import Budget from '../models/budget.model.js';
import { checkExpenseBeforeInsert} from "../utils/helperFunctions.js"  


export const addExpense = asyncWrapper(async (req, res, next) => {
  const { category, amount, description } = req.body;
  
  // Check if the expense amount exceeds the user's income
  const isExpenseAllowed = await checkExpenseBeforeInsert(req.user.id, amount);
  // if (!isExpenseAllowed) {
  //     return res.status(400).json({ error: 'Your expense exceeds your income, review your expense' });
  // }
  
  // Create a new expense
  const newExpense = new Expense({
      user: req.user.id,
      category,
      amount,
      description
  });
  await newExpense.save();
  
  // Deduct the expense amount from the corresponding budget
  const userBudget = await Budget.findOne({ user: req.user.id });
  const budgetToUpdate = userBudget.budgets.find(b => b.category === category);
  if (!userBudget) {
      console.error('Budget not found for the specified category.');
      // Handle the case where the budget for the category is not found
      // You can choose to send an error response or handle it based on your application logic
  }
  else {
    // Deduct the expense amount from the budget
    budgetToUpdate.limit -= amount;
    await userBudget.save();
}

  return res.status(201).json({
      message: 'Expense added!',
      expense: newExpense,
      updatedBudget: userBudget // Send the updated budget in the response
  });
});


export const getExpenses=asyncWrapper(async(req,res,next)=>{
    const expenses=await expenseModel.find({ user: req.user.id })
    return res.status(200).json(expenses)
})


export const getUserExpense = asyncWrapper(async (req, res, next) => {
  const expenseId = req.query.id;
  const userId = req.user.id;
  
  try {
    const expense = await Expense.findOne({ _id: expenseId, user: userId });
    if (!expense) {
      return next(new NotFoundError(`Expense not found`));
    }
    res.status(200).json(expense);
  } catch (error) {
    return next(error);
  }
});

export const deleteUserExpense = asyncWrapper(async (req, res, next) => {
  const expenseId = req.query.id; 
  const userId = req.user.id;
  const expense = await Expense.findOneAndDelete({ _id: expenseId, user: userId });
  if (!expense) {
    return next(new NotFoundError(`Expense not found`));
  }

  res.status(200).json(expense);
});

  
  // Update expense by ID
  export const updateUserExpense = asyncWrapper(async (req, res, next) => {
    const expenseId = req.query.id; // Get the expense ID from the query parameter
    const userId = req.user.id;
  

    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      req.body,
      { new: true }
    );
  
    if (!expense) {
      return next(new NotFoundError(`Expense not found`));
    }

    res.status(200).json(expense);
  });
  