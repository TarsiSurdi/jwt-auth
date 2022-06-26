import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import jwtSecret from "../database/jwtSecret";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.sendStatus(401);
  }

  const token = bearer.replace("Bearer ", "").trim();
  try {
    const data = verify(token, jwtSecret);

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
};

export default AuthMiddleware;
