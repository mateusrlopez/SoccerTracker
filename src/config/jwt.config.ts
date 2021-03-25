import { EnvHelper } from '@shared/helpers/env.helper';

export const JwtConfig = {
    secret: EnvHelper.getVariable('JWT_KEY'),
};
