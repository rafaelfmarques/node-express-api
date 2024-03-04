import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error & { statusCode: number },
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode ?? 500;
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
