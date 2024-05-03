
import asyncWrapper from "../middlewares/async.js";
import Budget from "../models/budget.model.js";
import UserModel from "../models/user.model.js";
import { BadRequestError } from "../errors/index.js";
import {checkBudgetExceedsIncome ,calculateTotalBudget } from "../utils/helperFunctions.js"
export const addBudgets = asyncWrapper(async (req, res, next) => {
  const budgets = req.body.budgets;
  console.log('Received budgets:', budgets);
  const userId = req.user.id;


  if (!budgets || !Array.isArray(budgets)) {
    return res.status(400).json({ error: 'Budgets array is required' });
  }
  const existingBudgets = await Budget.find({ user: userId });

  const exceedsIncome = await checkBudgetExceedsIncome(userId, budgets);
  if (exceedsIncome) {
    console.log('Total budget exceeds user income. Aborting insertion.');
    return res.status(400).json({ error: 'Total budget exceeds your income, review your budgets' });
  }

  if (existingBudgets && existingBudgets.length > 0) {

    existingBudgets[0].budgets = [...existingBudgets[0].budgets, ...budgets];
    await existingBudgets[0].save();
  } else {

    const newBudget = new Budget({
      user: userId,
      budgets: budgets
    });
    await newBudget.save();
  }

  res.status(201).json({ message: 'Budgets added successfully' });
});


  export const getUserBudgets = asyncWrapper(async (req, res, next) => {
    const budgets = await Budget.find({ user: req.user.id });
    if(!budgets){
        return next(new BadRequestError(`Budgets not found`));
    }
    res.status(200).json(budgets);
  });
 // getUserBudget function
export const getUserBudget = asyncWrapper(async (req, res, next) => {
  const budgetId = req.query.id; 
  const categoryId = req.query.categoryId; 
  const userId = req.user.id;

  // Find the user's budgets
  const userBudgets = await Budget.findOne({ user: userId });

  if (!userBudgets) {
    return next(new BadRequestError(`Budget not found`));
  }

  let budget;

  if (categoryId) {
    budget = userBudgets.budgets.find(b => b._id.toString() === categoryId);
    if (!budget) {
      return next(new BadRequestError(`Category not found in the budget`));
    }
  } else if (budgetId) {
   
    budget = userBudgets.budgets.find(b => b._id.toString() === budgetId);
    if (!budget) {
      return next(new BadRequestError(`Budget not found`));
    }
  } else {
 
    budget = userBudgets.budgets;
  }


  res.status(200).json(budget);
});

 
export const updateUserBudget = asyncWrapper(async (req, res, next) => {
  const budgetId = req.query.id; 
  const categoryId = req.query.categoryId; 
  const userId = req.user.id;
  const { category, limit } = req.body;
  const userBudgets = await Budget.findOne({ user: userId });

  if (!userBudgets) {
    return next(new BadRequestError(`Budget not found`));
  }

  let updatedBudget;
  if (categoryId) {
    const budgetToUpdate = userBudgets.budgets.find(b => b._id.toString() === categoryId);
    if (!budgetToUpdate) {
      return next(new BadRequestError(`Category not found in the budget`));
    }
    budgetToUpdate.category = category;
    budgetToUpdate.limit = limit;
    updatedBudget = await userBudgets.save();
  } else if (budgetId) {
    const budgetToUpdate = userBudgets.budgets.find(b => b._id.toString() === budgetId);
    if (!budgetToUpdate) {
      return next(new BadRequestError(`Budget not found`));
    }
    budgetToUpdate.category = category;
    budgetToUpdate.limit = limit;
    updatedBudget = await userBudgets.save();
  } else {
    return next(new BadRequestError(`Invalid request parameters`));
  }

  res.status(200).json(updatedBudget);
});
export const deleteUserBudget = asyncWrapper(async (req, res, next) => {
  const { id: budgetId } = req.query;
  const userId = req.user.id;

  // Find the user's budget object
  const userBudget = await Budget.findOne({ user: userId });

  if (!userBudget) {
    return next(new BadRequestError(`Budget not found`));
  }

  // Find the index of the specified budget in the budgets array
  const budgetIndex = userBudget.budgets.findIndex(b => b._id.toString() === budgetId);

  if (budgetIndex === -1) {
    return next(new BadRequestError(`Budget not found`));
  }

  // Remove the budget at the specified index from the budgets array
  userBudget.budgets.splice(budgetIndex, 1);

  // Save the updated userBudget
  await userBudget.save();

  res.status(200).json({ message: 'Budget deleted successfully' });
});
