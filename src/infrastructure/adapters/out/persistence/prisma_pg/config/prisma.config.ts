import "dotenv/config";
import path, { dirname } from 'path';
import { defineConfig } from "prisma/config";
import { fileURLToPath } from "url";

const PATHGENERATEMODEL = path.resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../models/'
);

export default defineConfig({
  schema: "schema.prisma",
  migrations: {
    path: PATHGENERATEMODEL,
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
