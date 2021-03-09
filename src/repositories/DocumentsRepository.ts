import { EntityRepository, Repository } from "typeorm";
import { Documents } from "../models/Documents";

@EntityRepository(Documents)
class DocumentsRepository extends Repository<Documents> {}

export { DocumentsRepository };
