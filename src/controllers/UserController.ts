import { Request, Response } from "express";
import { prisma } from "..";

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

    const user = await prisma.user.create({ data: { email, password } });

    return res.json(user);
  }
}

export default new UserController();
