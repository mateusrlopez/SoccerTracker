import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export interface IApplicationConfiguration {
    port: number;
}

export const ApplicationConfiguration = registerAs<IApplicationConfiguration>(
    'application',
    () => ({
        port: get('PORT').required().asPortNumber(),
    })
);
