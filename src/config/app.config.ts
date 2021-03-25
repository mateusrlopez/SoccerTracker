import { EnvHelper } from '@shared/helpers/env.helper';

export const AppConfig = {
    nodeEnv: EnvHelper.getVariable('NODE_ENV'),
    hostname: EnvHelper.getVariable('APP_HOSTNAME'),
    port: EnvHelper.getNumericVariable('APP_PORT'),
    routePrefix: EnvHelper.getVariable('APP_ROUTE_PREFIX'),
    timezone: EnvHelper.getVariable('APP_TIMEZONE'),
};
