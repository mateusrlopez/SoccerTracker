import * as env from '@helpers/env.helper';

export const jwtConfig = {
    secret: env.getVariable('JWT_KEY'),
};
