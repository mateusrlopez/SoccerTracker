import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import * as env from "@helpers/env.helper";

export const databaseConfig: TypeOrmModuleOptions = {
    database: env.getVariable("DATABASE_DATABASE"),
    entities: env.getArrayVariable("DATABASE_ENTITIES"),
    host: env.getVariable("DATABASE_HOST"),
    migrations: env.getArrayVariable("DATABASE_MIGRATIONS"),
    migrationsRun: env.getBooleanVariable("DATABASE_MIGRATIONS_RUN"),
    migrationsTableName: env.getVariable("DATABASE_MIGRATIONS_TABLE_NAME"),
    password: env.getVariable("DATABASE_PASSWORD"),
    port: env.getNumericVariable("DATABASE_PORT"),
    synchronize: env.getBooleanVariable("DATABASE_SYNCHRONIZE"),
    type: env.getVariable("DATABASE_CONNECTION") as "postgres",
    username: env.getVariable("DATABASE_USER"),
};
