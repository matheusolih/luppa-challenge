import { EntityRepository, Repository } from "typeorm";
import { Analysis } from "../models/Analysis";

@EntityRepository(Analysis)
class AnalysisRepository extends Repository<Analysis> {}

export { AnalysisRepository };
