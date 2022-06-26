import { Request, Response } from "express";
import { hash } from "bcryptjs";

import prisma from "../database";

class UserController {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    // Hashes password
    hash(password, 10).then(async (encryptedPassword) => {
      const user = await prisma.user.create({
        data: { email, password: encryptedPassword },
        select: { id: true, email: true, password: false },
      });

      return res.json(user);
    });
  }
}

export default new UserController();
