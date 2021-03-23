import * as env from '@shared/helpers/env.helper';

export const JwtConfig = {
    secret: env.getVariable('JWT_KEY'),
};
