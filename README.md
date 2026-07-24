# Catalog API

API REST simples para gerenciar cursos, estudantes e matrículas.

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

3. A API estará disponível em:

```text
http://localhost:3000
```

4. A documentação Swagger está disponível em:

```text
http://localhost:3000/docs
```

> A aplicação usa `express`, `Prisma`, SQLite e `zod` para validação.

## Estrutura do projeto

```
catalog-api/
├── src/
│   ├── app.ts
│   ├── config/
│   │   ├── openapi.ts
│   │   └── swagger.ts
│   ├── db/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── course.routes.ts
│   │   ├── enrollment.routes.ts
│   │   ├── index.ts
│   │   └── student.routes.ts
│   ├── middlewares/
│   │   ├── AppError.ts
│   │   ├── errorHandler.ts
│   │   └── notFoundHandler.ts
│   ├── student/
│   │   ├── student.controller.ts
│   │   ├── student.repository.ts
│   │   ├── student.schema.ts
│   │   └── student.service.ts
│   ├── course/
│   │   ├── course.controller.ts
│   │   ├── course.repository.ts
│   │   ├── course.schema.ts
│   │   └── course.service.ts
│   └── enrollment/
│       ├── enrollment.controller.ts
│       ├── enrollment.repository.ts
│       ├── enrollment.schema.ts
│       └── enrollment.service.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── tests/
│   ├── course.integration.spec.ts
│   ├── enrollment.integration.spec.ts
│   ├── student.integration.spec.ts
│   └── helpers/reset-db.ts
├── jest.config.ts
├── package.json
└── tsconfig.json
```

### Camadas principais

- `src/routes/`: definição das rotas e endpoints.
- `src/*/*.controller.ts`: lógica de entrada e resposta por recurso.
- `src/*/*.service.ts`: regras de negócio e validações de alto nível.
- `src/*/*.repository.ts`: acesso direto ao banco via Prisma.
- `src/*/*.schema.ts`: validação de request/response com Zod.
- `src/middlewares/`: tratamento de erros, 404 e respostas de exceção.
- `src/config/`: configuração da geração OpenAPI/Swagger.

## Rotas disponíveis

### Cursos

- `POST /courses`
  - Body: `{ title, category?, description? }`
  - Retorna: `201` com o curso criado.
- `GET /courses`
  - Query opcional: `cursorId`, `cursorCategory`
  - Retorna: `200` com a lista de cursos.
- `GET /courses/:id`
  - Retorna: `200` com o curso encontrado.
- `PUT /courses/:id`
  - Body: `{ title, category?, description? }`
  - Retorna: `200` com o curso atualizado.
- `DELETE /courses/:id`
  - Retorna: `204` quando o curso é removido.

### Estudantes

- `POST /students`
  - Body: `{ name, email }`
  - Retorna: `201` com o estudante criado.
- `GET /students`
  - Query opcional: `cursorId`, `cursorCategory`
  - Retorna: `200` com a lista de estudantes.
- `GET /students/:id`
  - Retorna: `200` com o estudante encontrado.
- `PUT /students/:id`
  - Body: `{ name, email }`
  - Retorna: `200` com o estudante atualizado.
- `DELETE /students/:id`
  - Retorna: `204` quando o estudante é removido.

### Matrículas

- `POST /enrollments?courseId={courseId}&studentId={studentId}`
  - Cria uma matrícula entre curso e estudante.
  - Retorna: `201` com a matrícula criada.
- `GET /students/:studentId/enrollments`
  - Retorna: `200` com as matrículas do estudante.
- `DELETE /enrollments/:id`
  - Retorna: `204` quando a matrícula é removida.

## Testes

- Executa o banco de testes e os testes Jest:

```bash
npm test
```

- Executa com geração de cobertura:

```bash
npm run test:coverage
```

> Os scripts já aplicam `prisma db push` no banco de teste antes de rodar.

## Observações

- Validações de entrada usam `zod`.
- Documentação Swagger gerada automaticamente a partir dos schemas em `/docs`.
- Erros do Prisma e validação retornam códigos HTTP apropriados (`400`, `404`, `409`, `422`, `500`).
- A API é organizada em camadas de rota, controller, service e repository.
