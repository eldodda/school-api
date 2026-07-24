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

> A aplicação usa `express`, `Prisma` e SQLite. O servidor só inicia automaticamente fora do modo de teste.

## Rotas

### Cursos

- `POST /courses`
  - Body: `{ title, category, description }`
  - Retorna: `201` com o curso criado.
- `GET /courses`
  - Retorna: `200` com a lista de cursos.
- `GET /courses/:id`
  - Retorna: `200` com o curso encontrado.
- `PUT /courses/:id`
  - Body: `{ title, category, description }`
  - Retorna: `200` com o curso atualizado.
- `DELETE /courses/:id`
  - Retorna: `204` quando o curso é removido.

### Estudantes

- `POST /students`
  - Body: `{ name, email }`
  - Retorna: `201` com o estudante criado.
- `GET /students`
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
- Erros de banco retornam códigos HTTP adequados (404, 409, 422).
- A rota de matrícula exige `courseId` e `studentId` como query params.
