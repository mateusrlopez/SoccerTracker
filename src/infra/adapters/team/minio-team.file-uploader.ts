import { ConfigType } from '@nestjs/config';
import { paramCase } from 'change-case';
import * as crypto from 'crypto';
import { extension } from 'mime-types';
import { Client } from 'minio';

import { ITeamFileUploader } from '@app/ports/team/team.file-uploader';
import { FileStorageConfig } from '@config/file-storage.config';

export class MinioTeamFileUploader implements ITeamFileUploader {
    constructor(
        private readonly client: Client,
        private readonly fileStorageConfig: ConfigType<typeof FileStorageConfig>
    ) {}

    public async uploadTeamLogo(teamName: string, dataURL: string): Promise<string> {
        const matches = /^data:(image\/[\w]+);base64,(.*)/.exec(dataURL);

        const mimeType = matches[1];
        const data = matches[2];
        const ext = extension(mimeType);

        const fileName = `${crypto.randomBytes(10).toString('hex')}-${paramCase(teamName)}.${ext}`;
        const key = `team-logos/${fileName}`;
        const buffer = Buffer.from(data, 'base64');

        await this.client.putObject(this.fileStorageConfig.bucket, key, buffer, { 'Content-Type': mimeType });

        return key;
    }
}
