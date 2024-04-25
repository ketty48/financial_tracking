
import asyncWrapper from "../middlewares/async.js";
import Budget from "../models/budget.model.js";
export const addBudget = asyncWrapper(async (req, res, next) => {
    const { category, limit } = req.body;
    const newBudget = new Budget({
      user: req.user.id, 
      category,
      limit
    });
    await newBudget.save();
    res.status(201).json({ message: 'Budget added successfully' });
  });

  export const getUserBudgets = asyncWrapper(async (req, res, next) => {
    const budgets = await Budget.findById({ user: req.user.id });
    if(!budgets){
        return next(new NotFoundError(`Budgets not found`));
    }
    res.status(200).json(budgets);
  });
  export const getBugets= asyncWrapper(async (req, res, next) => {
    const Budgets= await Budget.find()
    res.status(200).json(Budgets)

})
export const getBuget = asyncWrapper(async (req, res, next)=>{
const budget= await Budget.findById(req.params.id)
if(!budget){
    return next(new NotFoundError(`Budget not found`))
}
res.status(200).json(budget)

})
export const updateBudget = asyncWrapper(async (req, res, next) => {
    const { category, limit } = req.body;
    const budget = await Budget.findByIdAndUpdate(req.params.id, { category, limit }, { new: true });
    if (!budget) {
        return next(new NotFoundError(`Budget not found`));
    }

    res.status(200).json(budget);
});
export const deleteBudget = asyncWrapper(async (req, res, next) => {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
        return next(new NotFoundError(`Budget not found`));
    }

    res.status(200).json(budget);
});
export const getUserBudget = asyncWrapper(async (req, res, next) => {
    const budget = await Budget.findOne({ _id: req.params.id, user: req.user.id });
    if (!budget) {
      return next(new NotFoundError(`Budget not found`));
    }
    res.status(200).json(budget);
  });
  
  // Update budget by ID
  export const updateUserBudget = asyncWrapper(async (req, res, next) => {
    const { category, limit } = req.body;
    const budget = await Budget.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { category, limit }, { new: true });
    if (!budget) {
      return next(new NotFoundError(`Budget not found`));
    }
    res.status(200).json(budget);
  });
  
  // Delete budget by ID
  export const deleteUserBudget = asyncWrapper(async (req, res, next) => {
    const budget = await Budget.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!budget) {
      return next(new NotFoundError(`Budget not found`));
    }
    res.status(200).json(budget);
  });