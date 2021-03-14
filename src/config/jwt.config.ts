import * as env from '@shared/helpers/env.helper';

export const jwtConfig = {
    secret: env.getVariable('JWT_KEY'),
};
