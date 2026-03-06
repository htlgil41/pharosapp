import "dotenv/config";
import path, { dirname } from 'path';
import { defineConfig } from "prisma/config";
import { fileURLToPath } from "url";
import { LoadEnvWithExceptions } from "../../../../shareds/loadEnvWith.ts";

const PATHGENERATEMODEL =  dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  schema: `${path.resolve(PATHGENERATEMODEL, 'schema/schema.prisma')}`,
  migrations: {
    path: `${path.resolve(PATHGENERATEMODEL, 'migrations')}`,
  },
  datasource: {
    url: LoadEnvWithExceptions('DATABASE_PHAROSPP'),
  },
});
