import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Analysis1615302600734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "analysis",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "analyzedAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "documents_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE", //atualiza ou exclui os dados da tabela filha caso a tabela users mude (por ex)
            onUpdate: "CASCADE",
          },
          {
            name: "FKDocument",
            referencedTableName: "documents",
            referencedColumnNames: ["id"],
            columnNames: ["documents_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("analysis");
  }
}
