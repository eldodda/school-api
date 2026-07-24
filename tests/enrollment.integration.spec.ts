import request from "supertest";
import { app } from "../src/app";
import { resetDb } from "./helpers/reset-db";
import { prisma } from "../src/db/prisma";

describe("Testando integração da rota /enrollments :", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("deve criar uma matrícula com sucesso;", async () => {
    const student = await prisma.student.create({
      data: {
        name: "Carlos Lima",
        email: "carlos.lima@example.com",
      },
    });

    const course = await prisma.course.create({
      data: {
        title: "Yoga",
        category: "Fitness",
        description: "Aulas de yoga para iniciantes.",
      },
    });

    const response = await request(app)
      .post("/enrollments")
      .query({ courseId: course.id, studentId: student.id });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.studentId).toBe(student.id);
  });

  it("deve retornar 400 ao criar matrícula sem courseId ou studentId;", async () => {
    const response = await request(app).post("/enrollments").query({
      courseId: "",
      studentId: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("erro");
  });

  it("deve retornar a lista de matrículas do estudante;", async () => {
    const student = await prisma.student.create({
      data: {
        name: "Beatriz Costa",
        email: "beatriz.costa@example.com",
      },
    });

    const course = await prisma.course.create({
      data: {
        title: "Pilates",
        category: "Fitness",
        description: "Treino de pilates.",
      },
    });

    await prisma.enrollment.create({
      data: {
        courseId: course.id,
        studentId: student.id,
      },
    });

    const response = await request(app).get(
      `/students/${student.id}/enrollments`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].studentId).toBe(student.id);
  });

  it("deve deletar a matrícula correspondente ao ID enviado;", async () => {
    const student = await prisma.student.create({
      data: {
        name: "Rafael Alves",
        email: "rafael.alves@example.com",
      },
    });

    const course = await prisma.course.create({
      data: {
        title: "Crossfit",
        category: "Fitness",
        description: "Treinamento funcional.",
      },
    });

    const enrollment = await prisma.enrollment.create({
      data: {
        courseId: course.id,
        studentId: student.id,
      },
    });

    const response = await request(app).delete(`/enrollments/${enrollment.id}`);

    expect(response.status).toBe(204);
  });

  it("deve retornar 409 ao criar matrícula duplicada;", async () => {
    const student = await prisma.student.create({
      data: {
        name: "Elena Pires",
        email: "elena.pires@example.com",
      },
    });

    const course = await prisma.course.create({
      data: {
        title: "Natação",
        category: "Esportes",
        description: "Aulas de natação.",
      },
    });

    await prisma.enrollment.create({
      data: {
        courseId: course.id,
        studentId: student.id,
      },
    });

    const response = await request(app)
      .post("/enrollments")
      .query({ courseId: course.id, studentId: student.id });

    expect(response.status).toBe(409);
    expect(response.body.status).toBe("conflito");
  });

  it("deve retornar 404 ao tentar deletar sem um ID;", async () => {
    const response = await request(app).delete(`/enrollments/`);

    expect(response.status).toBe(404);
  });
});
