import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export interface IFileStorageConfig {
    bucket: string;
}

export const FileStorageConfig = registerAs<IFileStorageConfig>('file-storage', () => ({
    bucket: get('MINIO_BUCKET').required().asString(),
}));
