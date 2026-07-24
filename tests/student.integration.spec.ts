import request from "supertest";
import { app } from "../src/app";
import { resetDb } from "./helpers/reset-db";
import { prisma } from "../src/db/prisma";

describe("Testando integração da rota /students :", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("deve criar um novo estudante com sucesso;", async () => {
    const response = await request(app).post("/students").send({
      name: "João Silva",
      email: "joao.silva@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("João Silva");
  });

  it("deve retornar 422 ao enviar um corpo inválido;", async () => {
    const response = await request(app).post("/students").send({
      name: "Jo",
    });

    expect(response.status).toBe(422);
    expect(response.body.status).toBe("dados_invalidos");
  });

  it("deve retornar em um objeto a lista de estudantes;", async () => {
    const response = await request(app).get("/students");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("deve retornar o estudante correspondente ao ID enviado;", async () => {
    const student = await prisma.student.create({
      data: {
        name: "Maria Souza",
        email: "maria.souza@example.com",
      },
    });

    const response = await request(app).get(`/students/${student.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Maria Souza");
  });

  it("deve retornar um registro atualizado com os dados enviados;", async () => {
    const student = await prisma.student.create({
      data: {
        name: "Pedro Gomes",
        email: "pedro.gomes@example.com",
      },
    });

    const newData = {
      name: "Pedro Silva",
      email: "pedro.silva@example.com",
    };

    const response = await request(app)
      .put(`/students/${student.id}`)
      .send(newData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Pedro Silva");
  });

  it("deve deletar o estudante correspondente ao ID enviado;", async () => {
    const student = await prisma.student.create({
      data: {
        name: "Ana Paula",
        email: "ana.paula@example.com",
      },
    });

    const response = await request(app).delete(`/students/${student.id}`);

    expect(response.status).toBe(204);
  });

  it("deve retornar 409 ao criar um estudante com email duplicado;", async () => {
    await prisma.student.create({
      data: {
        name: "Lucas Santos",
        email: "lucas.santos@example.com",
      },
    });

    const response = await request(app).post("/students").send({
      name: "Lucas Santos",
      email: "lucas.santos@example.com",
    });

    expect(response.status).toBe(409);
    expect(response.body.status).toBe("conflito");
  });

  it("deve retornar 404 ao tentar deletar sem um ID;", async () => {
    const response = await request(app).delete(`/students/`);

    expect(response.status).toBe(404);
  });
});
