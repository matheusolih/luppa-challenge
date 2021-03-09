import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Documents1615297737112 implements MigrationInterface {
  constructor() {}
  //id, status, src
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "documents",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "src",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("documents");
  }
}
