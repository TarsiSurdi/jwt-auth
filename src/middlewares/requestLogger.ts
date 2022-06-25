import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `PATH: ${req.path}`,
    `| QUERY: ${JSON.stringify(req.query)}`,
    `| METHOD: ${req.method}`
  );
  return next();
};

export default requestLogger;
