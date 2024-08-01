import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';
import { BookDocument } from '../models/bookModel';

// Define a custom interface for Response with pagination property
interface CustomResponse extends Response {
  pagination?: {
    results: BookDocument[];
    totalPages: number;
  };
}

const paginationMiddleware = (model: Model<BookDocument>) => {
  return async (req: Request, res: CustomResponse, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    const pageNum: number = parseInt(page as string, 10);
    const limitNum: number = parseInt(limit as string, 10);

    try {
      if (pageNum <= 0 || limitNum <= 0) {
        throw new Error('Invalid page or limit parameters');
      }

      const results = await model.find()
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      const total = await model.countDocuments();
      const totalPages = Math.ceil(total / limitNum);

      res.pagination = {
        results,
        totalPages,
      };

      next();
    } catch (err: any) {
      res.status(500).json({ msg: 'Pagination failed', error: err.message });
    }
  };
};

export default paginationMiddleware;
