import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { EnvHelper } from '@shared/helpers/env.helper';
import { SnakeCaseNamingStategy } from '@shared/snake-naming.strategy';

export const DatabaseConfig: TypeOrmModuleOptions = {
    entities: EnvHelper.getArrayVariable('TYPEORM_ENTITIES'),
    migrations: EnvHelper.getArrayVariable('TYPEORM_MIGRATIONS'),
    migrationsRun: EnvHelper.getBooleanVariable('TYPEORM_MIGRATIONS_RUN'),
    migrationsTableName: EnvHelper.getVariable('TYPEORM_MIGRATIONS_TABLE_NAME'),
    synchronize: EnvHelper.getBooleanVariable('TYPEORM_SYNCHRONIZE'),
    type: EnvHelper.getVariable('TYPEORM_CONNECTION') as 'postgres',
    url: EnvHelper.getVariable('TYPEORM_URL'),
    namingStrategy: new SnakeCaseNamingStategy(),
};
