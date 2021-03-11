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

    if (analysisAlreadyExists) {
      return response.status(200).json(analysisAlreadyExists);
    }

    await analysisRepository.save(analysis);

    return response.status(201).json(analysis);
  }

  async all(request: Request, response: Response) {
    const analysisRepository = getCustomRepository(AnalysisRepository);

    const allAnalysis = await analysisRepository.find({
      relations: ["documents", "user"],
    });

    if (allAnalysis) {
      allAnalysis.map((elem) => {
        delete elem.documents_id, delete elem.user_id;
      });

      return response.status(200).json(allAnalysis);
    }

    return response.status(400).json({ error: "There is no analysis yet!" });
  }
}

export { AnalysisController };
