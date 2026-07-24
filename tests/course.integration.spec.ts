import request from "supertest";
import { app } from "../src/app";
import { resetDb } from "./helpers/reset-db";
import { prisma } from "../src/db/prisma";

describe("Testando integração da rota /course :", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("deve criar um novo curso com sucesso;", async () => {
    const response = await request(app).post("/courses").send({
      title: "Modern Greek",
      category: "Languages",
      description: "Learn the modern greek language.",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Modern Greek");
  });

  it("deve retornar 400 ao enviar um corpo inválido;", async () => {
    const response = await request(app).post("/courses").send({
      category: "Sports",
    });

    expect(response.status).toBe(422);
    expect(response.body.status).toBe("dados_invalidos");
  });

  it("deve retornar em um objeto a lista de cursos;", async () => {
    const response = await request(app).get("/courses");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("deve retornar o curso correspondente ao ID enviado;", async () => {
    const course = await prisma.course.create({
      data: {
        title: "Boxing",
        category: "Sports",
        description: "Soco",
      },
    });
    const response = await request(app).get(`/courses/${course.id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Boxing");
  });

  it("deve retornar um registro atualizado com os dados enviados;", async () => {
    const course = await prisma.course.create({
      data: {
        title: "Boxing",
        category: "Sports",
        description: "Soco",
      },
    });
    const newData = {
      title: "Muay Thai",
      category: "Sports",
      description: "Chute",
    };
    const response = await request(app)
      .put(`/courses/${course.id}`)
      .send(newData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Muay Thai");
  });

  it("deve deletar o curso correspondente ao ID enviado;", async () => {
    const course = await prisma.course.create({
      data: {
        title: "Boxing",
        category: "Sports",
        description: "Soco",
      },
    });
    const response = await request(app).delete(`/courses/${course.id}`);

    expect(response.status).toBe(204);
  });

  it("deve retornar 404 ao buscar um curso inexistente;", async () => {
    const response = await request(app).get(
      "/courses/00000000-0000-0000-0000-000000000000",
    );

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("erro");
  });

  it("deve retornar 422 ao atualizar com dados inválidos;", async () => {
    const course = await prisma.course.create({
      data: {
        title: "Boxing",
        category: "Sports",
        description: "Soco",
      },
    });

    const response = await request(app).put(`/courses/${course.id}`).send({
      title: "Go",
    });

    expect(response.status).toBe(422);
    expect(response.body.status).toBe("dados_invalidos");
  });

  it("deve retornar 404 ao atualizar um curso inexistente;", async () => {
    const response = await request(app)
      .put("/courses/00000000-0000-0000-0000-000000000000")
      .send({
        title: "Muay Thai",
        category: "Sports",
        description: "Chute",
      });

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("nao_encontrado");
  });

  it("deve retornar 404 ao tentar deletar sem um ID;", async () => {
    const response = await request(app).delete(`/courses/`);

    expect(response.status).toBe(404);
  });
});
