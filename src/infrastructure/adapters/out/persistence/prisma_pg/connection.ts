import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./models/client/client.ts";
import { LoadEnvWithExceptions } from "../../../../shareds/loadEnvWith.ts";

export const ConnectionPharosApp = new PrismaClient({
    adapter: new PrismaPg({ connectionString: LoadEnvWithExceptions('DATABASE_PHAROSPP') }),
});