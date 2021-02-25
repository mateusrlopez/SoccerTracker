import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import * as env from '@helpers/env.helper';

export const corsConfig: CorsOptions = {
    exposedHeaders: env.getArrayVariable('CORS_EXPOSED_HEADERS'),
    origin: env.getVariable('CORS_ORIGIN'),
};
