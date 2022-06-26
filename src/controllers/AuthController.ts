import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import jwtSecret from "../database/jwtSecret";
import prisma from "../database";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (!userExists) {
      return res.sendStatus(401);
    }

    const isValidPassword = await compare(password, userExists.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    } else {
      const token = sign({ id: userExists.id }, jwtSecret, {
        expiresIn: "1d",
      });

      const { id, email } = userExists;

      return res.json({ user: { id, email }, token });
    }
  }
}

export default new AuthController();
