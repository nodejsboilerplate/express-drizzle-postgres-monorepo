# Nebula Monorepo

**Production-ready TypeScript monorepo boilerplate.**

Nebula ships with authentication, observability, background infrastructure, and developer tooling pre-wired across a Turborepo + pnpm workspace, so you can skip the setup grind and start building features on day one.

---

## Table of Contents

- [Stack Overview](#stack-overview)
- [Dependency Injection Container](#dependency-injection-container)
- [Email Templates](#email-templates)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Commands](#database-commands)
- [Testing & Validation](#testing--validation)
- [Monitoring](#monitoring)
- [Port Map](#port-map)
- [Quick Start Summary](#quick-start-summary)

---

## Stack Overview

| Layer                    | Technology                                           |
| ------------------------ | ----------------------------------------------------- |
| Monorepo                 | Turborepo + pnpm workspaces                          |
| Language                 | TypeScript                                           |
| Runtime                  | Node.js                                              |
| Framework                | Express                                              |
| Database                 | PostgreSQL                                           |
| ORM                      | Drizzle                                              |
| Cache / Queue / Sessions | Redis                                                |
| Validation               | Zod (`@repo/zod`)                                    |
| Auth                     | JWT + Cookies + Google OAuth                         |
| Email Delivery           | Resend + `@repo/emails` (react-email)                |
| SMS                      | Twilio                                               |
| Logging                  | Pino + request logger middleware, Winston (for Loki) |
| Rate Limiting            | express-rate-limit + Redis-backed store              |
| Testing                  | Vitest + Supertest                                   |
| Dev Tooling              | Husky, Commitlint, Prettier, ESLint, tsdown           |
| Containers               | Docker + Docker Compose                              |
| Monitoring               | Prometheus + Grafana + Loki                          |

---

## Dependency Injection Container

Same pattern as before - no Inversify, no decorators, no `reflect-metadata`. Plain composition functions, wired per-service:

```
createContainer()
createServices()
createRepositories()
createValidators()
createMiddlewares()
createControllers()
```

---

## Email Templates

`@repo/emails` ships with **4 pre-built react-email templates, designed off real Dribbble references** - not the usual bare-bones "Welcome to X" placeholder. Ready to send from day one:

- signup confirmation
- Password reset / OTP
- Order confirmation

---

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Create Environment Files

For local, non-Docker development:

```bash
cp apps/server/.env.example apps/server/.env
```

For Docker-based local/production-like setup:

```bash
cp apps/server/.env.example apps/server/.env.production.local
```

> **Important:** Docker Compose reads `./apps/server/.env.production.local` for the app service (`env_file`).

### 3. Run in Development Mode

```bash
pnpm dev
```

Runs `turbo run dev --concurrency=30`. The server starts with `tsx --watch ./src/index.ts`, listening on `PORT` from `.env` (default: `3000`).

### 4. Run a Production Build Locally

```bash
pnpm build
```

Run the compiled server:

```bash
PORT=3000 node apps/server/dist/index.mjs
```

### 5. Run with Docker

```bash
docker compose up --build
```

Detached:

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

---

## Environment Setup

```bash
cp apps/server/.env.example apps/server/.env
```

**Key values include:**

| Variable                    | Purpose                          |
| ---------------------------- | --------------------------------- |
| `PORT`                      | App server port                  |
| `NODE_ENV`                  | Runtime environment              |
| `DATABASE_URL`              | PostgreSQL connection string     |
| `REDIS_HOST` / `REDIS_PORT` | Redis connection                 |
| `JWT_ACCESS_TOKEN_SECRET`   | JWT access token signing secret  |
| `JWT_REFRESH_TOKEN_SECRET`  | JWT refresh token signing secret |
| `RESEND_API_KEY`            | Email delivery via Resend        |
| `GOOGLE_CLIENT_ID`          | Google OAuth                     |
| `GOOGLE_CLIENT_SECRET`      | Google OAuth                     |
| `GOOGLE_AUTH_REDIRECT_URI`  | Google OAuth redirect            |
| `TWILIO_ACCOUNT_SID`        | SMS via Twilio                   |
| `TWILIO_AUTH_TOKEN`         | SMS via Twilio                   |

---

## Database Commands

```bash
pnpm --filter server db:generate
pnpm --filter server db:migrate
pnpm --filter server db:push
pnpm --filter server db:seed
```

---

## Testing & Validation

```bash
pnpm test
pnpm check:types
pnpm check:lint
```

Each runs via Turborepo across all packages, cached and parallelized.

---

## Monitoring

### Setup

1. Grafana, Prometheus, and Loki come up with the Docker Compose stack.
2. From `terraform/`:

```bash
cd terraform
terraform init
terraform plan
terraform apply -auto-approve
```

> **Note:** Uses the Grafana Terraform provider; modules rely on JSON dashboard templates in the repo.

### Viewing Metrics and Logs

**Default Docker Compose UI ports:**

| Service      | URL                   | Notes                                                    |
| ------------ | --------------------- | --------------------------------------------------------- |
| Grafana      | http://localhost:3005 | Dashboards from Terraform. Default creds: `admin:admin`  |
| Prometheus   | http://localhost:9090 | Explore metrics, run ad-hoc queries                      |
| Loki         | http://localhost:3100 | Log aggregation                                          |
| RedisInsight | http://localhost:5540 | Inspect Redis data                                       |

---

## Port Map

| Service        | Address                       |
| --------------- | ------------------------------ |
| App server     | http://localhost:3000         |
| ↳ Health check | http://localhost:3000/health  |
| ↳ Metrics      | http://localhost:3000/metrics |
| PostgreSQL     | localhost:5432                |
| Redis          | localhost:6379                |
| RedisInsight   | http://localhost:5540         |
| Prometheus     | http://localhost:9090         |
| Grafana        | http://localhost:3005         |
| Loki           | http://localhost:3100         |

---

## Quick Start Summary

**Shortest path to running locally:**

```bash
pnpm install
cp apps/server/.env.example apps/server/.env
pnpm dev
```

**Shortest path to the full Docker stack:**

```bash
cp apps/server/.env.example apps/server/.env.production.local
docker compose up
```