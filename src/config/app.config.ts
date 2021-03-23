import * as env from '@shared/helpers/env.helper';

export const AppConfig = {
    hostname: env.getVariable('APP_HOSTNAME'),
    port: env.getNumericVariable('APP_PORT'),
    routePrefix: env.getVariable('APP_ROUTE_PREFIX'),
    timezone: env.getVariable('APP_TIMEZONE'),
};
