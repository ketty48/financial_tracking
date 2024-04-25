import GoalModel from '../models/goal.model.js';

import asyncWrapper from "../middlewares/async.js";
import { BadRequestError } from "../errors/index.js";

export const addGoal = asyncWrapper(async (req, res, next) => {
    const { title, targetAmount, deadline } = req.body;
    const newGoal = new Goal({
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
  export const getGoals=asyncWrapper(async(req,res,next)=>{
    const goals=await GoalModel.find();
    res.status(200).json(goals);
  });
  export const getGoal=asyncWrapper(async(req,res,next)=>{
    const goal=await GoalModel.findById(req.params.id);
    if(!goal){
        return next(new NotFoundError(`goal not found`));
    }
    res.status(200).json(goal);
  });
  export const updateGoal=asyncWrapper(async(req,res,next)=>{
    const updatedGoal=await GoalModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!updatedGoal){
        return next(new NotFoundError(`goal not found`));
    }
    res.status(200).json(updatedGoal);
  });
  export const deleteGoal=asyncWrapper(async(req,res,next)=>{
    const deletedGoal=await GoalModel.findByIdAndDelete(req.params.id);
    if(!deletedGoal){
        return next(new NotFoundError(`goal not found`));
    }
    res.status(200).json(deletedGoal);
  });
  export const getUserGoal = asyncWrapper(async (req, res, next) => {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });
    if (!goal) {
      return next(new NotFoundError(`Goal not found`));
    }
    res.status(200).json(goal);
  });
  
  export const updateUserGoal = asyncWrapper(async (req, res, next) => {
    const updatedGoal = await Goal.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
    if (!updatedGoal) {
      return next(new NotFoundError(`Goal not found`));
    }
    res.status(200).json(updatedGoal);
  });
  
  export const deleteUserGoal = asyncWrapper(async (req, res, next) => {
    const deletedGoal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedGoal) {
      return next(new NotFoundError(`Goal not found`));
    }
    res.status(200).json(deletedGoal);
  });