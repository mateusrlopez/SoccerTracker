import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

import { EnvHelper } from '@shared/helpers/env.helper';

export const LoggerConfig: WinstonModuleOptions = {
    level: EnvHelper.getVariable('LOG_LEVEL'),
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.json()
            ),
        }),
    ],
};
