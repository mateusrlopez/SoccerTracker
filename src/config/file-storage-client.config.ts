import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export interface IFileStorageClientConfig {
    accessKey: string;
    endPoint: string;
    port: number;
    secretKey: string;
    useSSL: boolean;
}

export const FileStorageClientConfig = registerAs<IFileStorageClientConfig>('minio', () => ({
    accessKey: get('MINIO_ACCESS_KEY').required().asString(),
    endPoint: get('MINIO_ENDPOINT').required().asString(),
    port: get('MINIO_PORT').required().asPortNumber(),
    secretKey: get('MINIO_SECRET_KEY').required().asString(),
    useSSL: get('MINIO_USE_SSL').required().asBool(),
}));
