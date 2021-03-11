import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as env from '@helpers/env.helper';
import { SnakeCaseNamingStategy } from '@shared/snake-naming.strategy';

export const databaseConfig: TypeOrmModuleOptions = {
    entities: env.getArrayVariable('TYPEORM_ENTITIES'),
    migrations: env.getArrayVariable('TYPEORM_MIGRATIONS'),
    migrationsRun: env.getBooleanVariable('TYPEORM_MIGRATIONS_RUN'),
    migrationsTableName: env.getVariable('TYPEORM_MIGRATIONS_TABLE_NAME'),
    synchronize: env.getBooleanVariable('TYPEORM_SYNCHRONIZE'),
    type: env.getVariable('TYPEORM_CONNECTION') as 'postgres',
    url: env.getVariable('TYPEORM_URL'),
    namingStrategy: new SnakeCaseNamingStategy(),
};
