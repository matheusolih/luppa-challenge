import request from "supertest";
import { app } from "../app";
import { getConnection } from "typeorm";

import createConnection from "../database";

describe("Create user", () => {
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
    const response = await request(app).post("/users").send({
      fullName: "tal",
      cpf: "124.321.132-88",
      documents: "teste documents",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create a new user with the same CPF", async () => {
    const response = await request(app).post("/users").send({
      fullName: "tal",
      cpf: "124.321.132-88",
      documents: "teste documents",
    });

    expect(response.status).toBe(401);
  });

  it("Should not be able to create a new user without fullname, cpf or documents!", async () => {
    const response = await request(app).post("/users").send({
      fullName: "fullname teste",
      documents: "teste documents",
    });

    expect(response.status).toBe(401);
  });
});
