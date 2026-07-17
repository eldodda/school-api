# CATALOG API

## Catálogo de cursos

Uma API RESTful com catálogo de cursos, alunos e matrículas.

Construído com:

1. TypeScript;
2. Prisma;
3. SQLite;

O projeto é parte de um desafio na carreira de Node.JS para back-end da Alura.

#### Regras gerais

- A API deve ser RESTful e expor endpoints sob o prefixo /api.
- Banco relacional recomendado (PostgreSQL / SQLite para facilidade).
- Relacionamentos: N:N entre Student e Course por meio de Enrollment.
- ORM: escolha um por projeto (ex.: Prisma no Express e TypeORM no Nest, para comparar).

#### Validações mínimas:

- **Course.title** ≥ 3 caracteres.
- **Student.email** válido e único.
- Não permitir matrícula duplicada do mesmo estudante no mesmo curso (conflito **409**).
- **Erros padronizados**: corpo JSON com message, details (opcional) e **código HTTP coerente** (400, 404, 409, 422, 500).
- **Documentação**: Swagger/OpenAPI (NestJS tem @nestjs/swagger; Express pode usar swagger-ui-express).
- Modelo de domínio (comum às duas versões)

#### Entidades obrigatórias

1. **Course**: id, title, category (opcional), description (opcional), createdAt
2. **Student**: id, name, email (único), createdAt
3. **Enrollment**: id, studentId, courseId, createdAt

- Restrição: (studentId, courseId) único

#### Relacionamentos

**Student** 1—N **Enrollment** N—1 **Course** (equivale a N:N entre **Student** e **Course**).
