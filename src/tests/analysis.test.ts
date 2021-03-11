import request from "supertest";
import { app } from "../app";
import { getConnection } from "typeorm";

import createConnection from "../database";

describe("Show analysis", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to get all analysis", async () => {
    const response = await request(app).get("/allAnalysis");

    expect(response.status).toBe(200);
  });
});
