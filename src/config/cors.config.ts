import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { EnvHelper } from '@shared/helpers/env.helper';

export const CorsConfig: CorsOptions = {
    exposedHeaders: EnvHelper.getArrayVariable('CORS_EXPOSED_HEADERS'),
    origin: EnvHelper.getVariable('CORS_ORIGIN'),
};
