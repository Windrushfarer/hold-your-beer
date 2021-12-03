## Overview

- [Overview](#overview)
- [Project setup](#project-setup)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. PostgreSQL with Docker](#2-postgresql-with-docker)
  - [3. Prisma Migrate](#3-prisma-migrate)
  - [4. Prisma: Prisma Client JS](#4-prisma-prisma-client-js)
  - [5. Seed the database data with this script](#5-seed-the-database-data-with-this-script)
  - [6. Start application](#6-start-application)
- [Docker](#docker)
  - [Docker Compose](#docker-compose)
- [Schema Development](#schema-development)
- [React component development](#react-component-development)

## Project setup

### 1. Install Dependencies

Install the dependencies for the whole application:

```bash
yarn
```

### 2. PostgreSQL with Docker

To setup a development PostgreSQL with Docker copy [.env.example](./server/.env.example) and rename to `.env` - `cp .env.example .env` - which sets the required environments for PostgreSQL such as `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB`. Update the variables as you wish and select a strong password.

Start the PostgreSQL database

```bash
docker-compose -f docker-compose.db.yml up -d
# or
npm run docker:db
# or
yarn docker:db
```

### 3. Prisma Migrate

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and migration of the database. Prisma datasource requires an environment variable `DATABASE_URL` for the connection to the PostgreSQL database. Prisma reads the `DATABASE_URL` from the root [.env](./.env) file.

Use Prisma Migrate in your [development environment](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#evolving-the-schema-in-development) to

1. Creates `migration.sql` file
2. Updates Database Schema
3. Generates Prisma Client

```bash
npx prisma migrate dev
# or
npm run migrate:dev
# or
yarn migrate:dev
```

If you like to customize your `migration.sql` file run the following command. After making your customizations run `npx prisma migrate dev` to apply it.

```bash
npx prisma migrate dev --create-only
# or
npm run migrate:dev:create
# or
yarn migrate:dev:create
```

If you are happy with your database changes you want to deploy those changes to your [production database](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#applying-migrations-in-production-and-other-environments). Use `prisma migrate deploy` to apply all pending migrations, can also be used in CI/CD pipelines as it works without prompts.

```bash
npx prisma migrate deploy
# or
npm run migrate:deploy
# or
yarn migrate:deploy
```

### 4. Prisma: Prisma Client JS

[Prisma Client JS](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/api) is a type-safe database client auto-generated based on the data model.

Generate Prisma Client JS by running

> **Note**: Every time you update [schema.prisma](prisma/schema.prisma) re-generate Prisma Client JS

```bash
npx prisma generate
# or
npm run prisma:generate
# or
yarn prisma:generate
```

### 5. Seed the database data with this script

Execute the script with this command:

```bash
yarn db:seed
```

### 6. Start application

Run application in Development mode:

```bash
yarn dev
```

Run server in Production mode:

```bash
npm run start:prod
# or
yarn start:prod
```

## Docker

This project is a Node.js application and it is easily [dockerized](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

See the [Dockerfile](./Dockerfile) on how to build a Docker image of your server.

Now to build a Docker image of your own server simply run:

```bash
# give your docker image a name
docker build -t <your username>/prisma-server .
# for example
docker build -t prisma-server .
```

After Docker build your docker image you are ready to start up a docker container running the server:

```bash
docker run -d -t -p 3001:3001 --env-file .env prisma-server
```

Now your server is running on [localhost:3001](http://localhost:3000).

When you run your application in a Docker container update your [.env](.env) file

```diff
- DB_HOST=localhost
# replace with name of the database container
+ DB_HOST=postgres

# Prisma database connection
+ DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
```

If `DATABASE_URL` is missing in the root `.env` file, which is loaded into the Docker container, the application will exit with the following error:

```bash
(node:19) UnhandledPromiseRejectionWarning: Error: error: Environment variable not found: DATABASE_URL.
  -->  schema.prisma:3
   |
 2 |   provider = "postgresql"
 3 |   url      = env("DATABASE_URL")
```

### Docker Compose

You can also setup a the database and the application with the docker-compose

```bash
# building new docker image
docker-compose build

# start docker-compose
docker-compose up -d
```

## Schema Development

Update the Prisma schema `prisma/schema.prisma` and after that run the following two commands:

```bash
yarn prisma:generate
yarn prisma:generate:watch
```

## React component development

If you want to create new component you can reduce all boirlerplane job by running

```bash
yarn component:new
```

Which creates new component in the `client/src/components` directory

**[⬆ back to top](#overview)**