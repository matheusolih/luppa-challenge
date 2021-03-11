import request from "supertest";
import { app } from "../app";
import { getConnection } from "typeorm";

import createConnection from "../database";

describe("Create new document", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/documents").send({});

    expect(response.status).toBe(201);
  });
});
