import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { fullName, cpf, documents } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = usersRepository.create({
      fullName,
      cpf,
      documents,
    });

    await usersRepository.save(user);

    return response.send();
  }
}

export { UserController };
