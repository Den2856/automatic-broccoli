import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(request: Request, response: Response): void {
  response.status(404).json({
    message: `Route ${request.originalUrl} not found`
  });
}

export function errorHandler(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  console.error(error);

  response.status(500).json({
    message: error instanceof Error ? error.message : "Internal server error"
  });
}
