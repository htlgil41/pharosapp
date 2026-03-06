import "dotenv/config";
import path, { dirname } from 'path';
import { defineConfig } from "prisma/config";
import { fileURLToPath } from "url";
import { LoadEnvWithExceptions } from "../../../../../shareds/loadEnvWithExceptions.ts";

const PATHGENERATEMODEL = path.resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../models'
);

export default defineConfig({
  schema: "schema.prisma",
  migrations: {
    path: `${PATHGENERATEMODEL}`,
  },
  datasource: {
    url: LoadEnvWithExceptions('DATABASE_PHAROSPP'),
  },
});
