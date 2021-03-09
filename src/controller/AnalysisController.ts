import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AnalysisRepository } from "../repositories/Analysis";

class AnalysisController {
  async execute(request: Request, response: Response) {
    const { user_id, documents_id } = request.body;

    const analysisRepository = getCustomRepository(AnalysisRepository);

    const analysis = analysisRepository.create({
      user_id,
      documents_id,
    });

    const analysisAlreadyExists = await analysisRepository.findOne({
      where: [{ user_id }],
      relations: ["documents", "user"],
    });

    const { id, analyzedAt, documents, user } = analysisAlreadyExists;

    if (analysisAlreadyExists) {
      return response.status(200).json({ id, analyzedAt, documents, user });
    }

    await analysisRepository.save(analysis);

    return response.status(201).json({ id, analyzedAt, documents, user });
  }
}

export { AnalysisController };
