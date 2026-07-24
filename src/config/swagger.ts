import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { registry } from "./openapi";
import {
  CreateStudent,
  ResponseStudent,
  ResponseStudentList,
} from "../student/student.schema";
import {
  createCourse,
  responseCourse,
  ResponseCourseList,
} from "../course/course.schema";
import {
  ResponseEnrollment,
  ResponseEnrollList,
} from "../enrollment/enrollment.schema";

const PaginationQuery = z
  .object({
    cursorId: z
      .string()
      .uuid()
      .optional()
      .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    cursorCategory: z.string().optional().openapi({ example: "Programming" }),
  })
  .partial();

registry.registerPath({
  method: "post",
  path: "/students",
  summary: "Criar estudante",
  description: "Cria um novo estudante com nome e email.",
  request: {
    body: {
      description: "Dados do estudante",
      content: {
        "application/json": {
          schema: CreateStudent,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Estudante criado",
      content: {
        "application/json": {
          schema: ResponseStudent,
        },
      },
    },
    400: { description: "Dados inválidos ou falta de parâmetros" },
    409: { description: "Email já cadastrado" },
  },
});

registry.registerPath({
  method: "get",
  path: "/students",
  summary: "Listar estudantes",
  description: "Retorna a lista de estudantes. Aceita cursor para paginação.",
  request: {
    query: PaginationQuery,
  },
  responses: {
    200: {
      description: "Lista de estudantes",
      content: {
        "application/json": {
          schema: ResponseStudentList,
        },
      },
    },
    400: { description: "Parâmetros de consulta inválidos" },
  },
});

registry.registerPath({
  method: "get",
  path: "/students/{id}",
  summary: "Buscar estudante",
  description: "Retorna um estudante pelo ID.",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    }),
  },
  responses: {
    200: {
      description: "Estudante encontrado",
      content: {
        "application/json": {
          schema: ResponseStudent,
        },
      },
    },
    400: { description: "ID inválido ou ausente" },
    404: { description: "Estudante não encontrado" },
  },
});

registry.registerPath({
  method: "put",
  path: "/students/{id}",
  summary: "Atualizar estudante",
  description: "Atualiza os dados de um estudante existente.",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    }),
    body: {
      description: "Dados atualizados do estudante",
      content: {
        "application/json": {
          schema: CreateStudent,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Estudante atualizado",
      content: {
        "application/json": {
          schema: ResponseStudent,
        },
      },
    },
    400: { description: "ID inválido ou dados de atualização inválidos" },
    404: { description: "Estudante não encontrado" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/students/{id}",
  summary: "Excluir estudante",
  description: "Exclui um estudante pelo ID.",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    }),
  },
  responses: {
    204: { description: "Estudante excluído com sucesso" },
    400: { description: "ID inválido ou ausente" },
    404: { description: "Estudante não encontrado" },
  },
});

registry.registerPath({
  method: "post",
  path: "/courses",
  summary: "Criar curso",
  description: "Cria um novo curso com título, categoria e descrição.",
  request: {
    body: {
      description: "Dados do curso",
      content: {
        "application/json": {
          schema: createCourse,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Curso criado",
      content: {
        "application/json": {
          schema: responseCourse,
        },
      },
    },
    400: { description: "Dados inválidos ou falta de parâmetros" },
    409: { description: "Conflito de curso" },
  },
});

registry.registerPath({
  method: "get",
  path: "/courses",
  summary: "Listar cursos",
  description: "Retorna a lista de cursos. Aceita cursor para paginação.",
  request: {
    query: PaginationQuery,
  },
  responses: {
    200: {
      description: "Lista de cursos",
      content: {
        "application/json": {
          schema: ResponseCourseList,
        },
      },
    },
    400: { description: "Parâmetros de consulta inválidos" },
  },
});

registry.registerPath({
  method: "get",
  path: "/courses/{id}",
  summary: "Buscar curso",
  description: "Retorna um curso pelo ID.",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    }),
  },
  responses: {
    200: {
      description: "Curso encontrado",
      content: {
        "application/json": {
          schema: responseCourse,
        },
      },
    },
    400: { description: "ID inválido ou ausente" },
    404: { description: "Curso não encontrado" },
  },
});

registry.registerPath({
  method: "put",
  path: "/courses/{id}",
  summary: "Atualizar curso",
  description: "Atualiza um curso existente.",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    }),
    body: {
      description: "Dados atualizados do curso",
      content: {
        "application/json": {
          schema: createCourse,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Curso atualizado",
      content: {
        "application/json": {
          schema: responseCourse,
        },
      },
    },
    400: { description: "ID inválido ou dados inválidos" },
    404: { description: "Curso não encontrado" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/courses/{id}",
  summary: "Excluir curso",
  description: "Exclui um curso pelo ID.",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    }),
  },
  responses: {
    204: { description: "Curso excluído com sucesso" },
    400: { description: "ID inválido ou ausente" },
    404: { description: "Curso não encontrado" },
  },
});

registry.registerPath({
  method: "post",
  path: "/enrollments",
  summary: "Criar matrícula",
  description: "Cria uma matrícula vinculando um estudante e um curso.",
  request: {
    query: z.object({
      studentId: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
      courseId: z
        .string()
        .uuid()
        .openapi({ example: "daf409df-60b2-45ce-856e-c42444b386d7" }),
    }),
  },
  responses: {
    201: {
      description: "Matrícula criada",
      content: {
        "application/json": {
          schema: ResponseEnrollment,
        },
      },
    },
    400: { description: "Faltam parâmetros ou são inválidos" },
    404: { description: "Estudante ou curso não encontrado" },
  },
});

registry.registerPath({
  method: "get",
  path: "/students/{studentId}/enrollments",
  summary: "Listar matrículas",
  description: "Retorna as matrículas de um estudante.",
  request: {
    params: z.object({
      studentId: z
        .string()
        .uuid()
        .openapi({ example: "27dc4a15-6107-4373-a056-ae2d942bc0f5" }),
    }),
  },
  responses: {
    200: {
      description: "Lista de matrículas do estudante",
      content: {
        "application/json": {
          schema: ResponseEnrollList,
        },
      },
    },
    400: { description: "ID do estudante inválido ou ausente" },
    404: { description: "Estudante não encontrado" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/enrollments/{id}",
  summary: "Excluir matrícula",
  description: "Exclui uma matrícula pelo ID.",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "c13b910d-9f16-40d7-85c2-d57d78940ea2" }),
    }),
  },
  responses: {
    204: { description: "Matrícula excluída com sucesso" },
    400: { description: "ID inválido ou ausente" },
    404: { description: "Matrícula não encontrada" },
  },
});

export function generateSwaggerDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Catalog API",
      description: "Documentação da API",
    },
    servers: [{ url: "/" }],
  });
}
