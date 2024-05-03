import GoalModel from '../models/goal.model.js';

import asyncWrapper from "../middlewares/async.js";
import { BadRequestError } from "../errors/index.js";

export const addGoal = asyncWrapper(async (req, res, next) => {
    const { title, targetAmount, deadline } = req.body;
    const newGoal = new GoalModel({
      user: req.user.id, // Assuming you're using authentication and storing user ID in req.user
      title,
      targetAmount,
      deadline
    });
    await newGoal.save();
    res.status(201).json({ message: 'Goal added successfully' });
  });
  export const getUserGoals=asyncWrapper(async(req,res,next)=>{
    const goals=await GoalModel.find({user:req.user.id});
    if(!goals){
        return next(new NotFoundError(`goal not found`));
    }
    res.status(200).json(goals);
  });


  export const getUserGoal = asyncWrapper(async (req, res, next) => {
    const goalId = req.query.id;
    const userId = req.user.id;
    
    const goal = await GoalModel.findOne({ _id: goalId, user: userId });
    if (!goal) {
      return next(new NotFoundError(`Goal not found`));
    }
    res.status(200).json(goal);
  });
  
  export const updateUserGoal = asyncWrapper(async (req, res, next) => {
    const goalId = req.query.id;
    const userId = req.user.id;
    
    const updatedGoal = await GoalModel.findOneAndUpdate({ _id: goalId, user: userId }, req.body, { new: true });
    if (!updatedGoal) {
      return next(new NotFoundError(`Goal not found`));
    }
    res.status(200).json(updatedGoal);
  });
  
  export const deleteUserGoal = asyncWrapper(async (req, res, next) => {
    const goalId = req.query.id;
    const userId = req.user.id;
    
    const deletedGoal = await GoalModel.findOneAndDelete({ _id: goalId, user: userId });
    if (!deletedGoal) {
      return next(new NotFoundError(`Goal not found`));
    }
    res.status(200).json(deletedGoal);
  });