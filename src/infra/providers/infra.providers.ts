import { Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as Minio from 'minio';
import { createConnection } from 'typeorm';

import { DatabaseConfig } from '@config/database.config';
import { FileStorageClientConfig } from '@config/file-storage-client.config';
import { InfrastructureDITokens } from '@infra/di/infra.di';

export const InfrastructureProviders: Provider[] = [
    {
        inject: [DatabaseConfig.KEY],
        provide: InfrastructureDITokens.DatabaseConnection,
        useFactory: async (databaseConfig: ConfigType<typeof DatabaseConfig>) => await createConnection(databaseConfig),
    },
    {
        inject: [FileStorageClientConfig.KEY],
        provide: InfrastructureDITokens.FileStorageClient,
        useFactory: (fileStorageClientConfig: ConfigType<typeof FileStorageClientConfig>) =>
            new Minio.Client(fileStorageClientConfig),
    },
];
