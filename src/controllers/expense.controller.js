import { NotFoundError, BadRequestError } from '../errors/index.js';
import expenseModel from '../models/expense.model.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';
import Expense from '../models/expense.model.js';
import user from '../models/user.model.js';
import { checkExpenseBeforeInsert} from "../utils/helperFunctions.js"


export const addExpense = asyncWrapper(async (req, res, next) => {
  
    const { category, amount, description } = req.body;
    const isExpenseAllowed = await checkExpenseBeforeInsert(req.user.id, amount);
    if (!isExpenseAllowed) {
      return res.status(400).json({ message: "Expense exceeds income. Not allowed." });
    }
  //   if (amount > user.income) {
  //     // If the expense exceeds income, send a notification to the user
  //     await sendExpenseExceedsIncomeNotification(req.user.id);
  // }

    const newExpense = new Expense({
      user: req.user.id, 
      amount,
      description
    });
    await newExpense.save();
  
 
    if (newExpense) {
        return res.status(201).json({
            message: "expense added!",
            expense: newExpense
        });
    }
  });

export const getExpenses=asyncWrapper(async(req,res,next)=>{
    const expenses=await expenseModel.find({ user: req.user.id })
    return res.status(200).json(expenses)
})
export const list=asyncWrapper(async(req,res,next)=>{
  const expenses=await expenseModel.find()
  return res.status(200).json(expenses)
})


export const getUserExpense = asyncWrapper(async (req, res, next) => {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    if (!expense) {
      return next(new NotFoundError(`Expense not found`));
    }
    res.status(200).json(expense);
  });
  
  // Delete expense by ID
  export const deleteUserExpense = asyncWrapper(async (req, res, next) => {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!expense) {
      return next(new NotFoundError(`Expense not found`));
    }
    res.status(200).json(expense);
  });
  
  // Update expense by ID
  export const updateUserExpense = asyncWrapper(async (req, res, next) => {
    const expense = await Expense.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
    if (!expense) {
      return next(new NotFoundError(`Expense not found`));
    }
    res.status(200).json(expense);
  });