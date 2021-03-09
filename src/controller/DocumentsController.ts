import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { DocumentsRepository } from "../repositories/DocumentsRepository";

class DocumentsController {
  async create(request: Request, response: Response) {
    const documentsRepository = getCustomRepository(DocumentsRepository);

    const statusValids = ["fraud", "valid", "error"];

    const status = statusValids[Math.floor(Math.random() * 3)];
    const src = "link";

    const document = documentsRepository.create({
      status,
      src,
    });

    await documentsRepository.save(document);

    return response.status(201).json(document);
  }
}

export { DocumentsController };
