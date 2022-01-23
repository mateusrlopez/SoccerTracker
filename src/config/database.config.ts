import { registerAs } from '@nestjs/config';
import { get } from 'env-var';
import { ConnectionOptions } from 'typeorm';

import { SnakeCaseNamingStrategy } from '@framework/snake-case-naming.strategy';

export const DatabaseConfig = registerAs<ConnectionOptions>('database', () => ({
    type: get('TYPEORM_CONNECTION').required().asEnum(['postgres', 'mysql']),
    url: get('TYPEORM_URL').required().asUrlString(),
    synchronize: get('TYPEORM_SYNCHRONIZE').required().asBool(),
    entities: get('TYPEORM_ENTITIES').required().asArray(','),
    migrations: get('TYPEORM_MIGRATIONS').required().asArray(','),
    migrationsRun: get('TYPEORM_MIGRATIONS_RUN').required().asBool(),
    migrationsTableName: get('TYPEORM_MIGRATIONS_TABLE_NAME').required().asString(),
    namingStrategy: new SnakeCaseNamingStrategy(),
}));
