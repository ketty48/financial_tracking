import { NotFoundError, BadRequestError } from '../errors/index.js';
import LocationModel from '../models/location.model.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

export const test = asyncWrapper((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return next(new BadRequestError(errors.array()[0].msg));
    }

    res.status(200).json({
        message: 'Hello World!'
    });
});

export const addlocation = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new BadRequestError(errors.array()[0].msg));
    }

    const newlocation = await LocationModel.create(req.body);
    return res.status(201).json(newlocation);
});

export const getlocations = async (req, res, next) => {
    const location = await LocationModel.find({}).populate('tags');
    if (location) {
        return res.status(200).json({
            nbHits: location.length,
            location
        });
    }
}


  

export const updatelocation = asyncWrapper(async (req, res, next) => {
    const locationId = req.query.id;
    const updates = req.body;

    if (updates.tags) {
        const locationBeforeUpdate = await LocationModel.findById(locationId);
        let tags = [];
        locationBeforeUpdate.tags.forEach(tag => {
            tags.push(tag.toString());
        })
        tags.push(updates.tags[0]);
        updates.tags = tags;
    }
    
    if (updates.tags) {
        const locationBeforeUpdate = await LocationModel.findById(locationId);
        let checkListItems = [];
        locationBeforeUpdate.checkList.forEach(item => {
            checkListItems.push(item.toString());
        })
        checkListItems.push(updates.checkList[0]);
        updates.checkList = checkListItems;
    }

    const updatedlocation = await LocationModel.findByIdAndUpdate(locationId, updates, { new: true });
    if (!updatedlocation) {
        return next(new NotFoundError(`location not found`));
    }
    return res.status(200).json(updatedlocation);
})

export const findById = asyncWrapper(async (req, res, next) => {
    const locationId = req.query.id;
    const foundlocation = await LocationModel.findById(locationId).populate('tags')
    if (!foundlocation) {
        return next(new NotFoundError(`location not found`));
    }
    return res.status(200).json(foundlocation);
});




export const deletelocation = asyncWrapper(async (req, res, next) => {
    const deletedlocation = await LocationModel.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: 'location deleted' });
});