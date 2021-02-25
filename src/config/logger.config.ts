import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

import * as env from '@helpers/env.helper';

export const loggerConfig: WinstonModuleOptions = {
    level: env.getVariable('LOG_LEVEL'),
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
