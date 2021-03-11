import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { fullName, cpf, documents } = request.body;

    if (!fullName || !cpf || !documents) {
      return response
        .status(401)
        .json({ error: "Please type a fullname, cpf and documents." });
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = usersRepository.create({
      fullName,
      cpf,
      documents,
    });

    const userAlreadyExists = await usersRepository.findOne({
      cpf,
    });

    if (userAlreadyExists) {
      return response
        .status(401)
        .json({ error: "User already exists with this CPF!" });
    }

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };
