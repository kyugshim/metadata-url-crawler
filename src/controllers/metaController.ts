import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Metadata from "../model/schema";


const getAllMeta = (req: Request, res: Response, next: NextFunction) => {
    Metadata.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                data: results,
                count: results.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const createMeta = (req: Request, res: Response, next: NextFunction) => {
    const { date, description, image, publisher, title, url } = req.body;

    const metadata = new Metadata({
        _id: new mongoose.Types.ObjectId(),
        date,
        description,
        image,
        publisher,
        title,
        url
    });
    return metadata
        .save()
        .then((result) => {
            return res.status(201).json({
                data: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};


export default { createMeta, getAllMeta };