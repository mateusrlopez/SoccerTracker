import { Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as Minio from 'minio';
import { Connection } from 'typeorm';

import { ITeamFileUploader } from '@app/ports/team/team.file-uploader';
import { ITeamRepository } from '@app/ports/team/team.repository';
import { UseCaseProxy } from '@app/usecases/common/usecase.proxy';
import { CreateTeamUseCase } from '@app/usecases/team/create-team.usecase';
import { DeleteTeamByIdUseCase } from '@app/usecases/team/delete-team-by-id.usecase';
import { FindAllTeamUseCase } from '@app/usecases/team/find-all-team.usecase';
import { FindTeamByIdUseCase } from '@app/usecases/team/find-team-by-id.usecase';
import { UpdateTeamByIdUseCase } from '@app/usecases/team/update-team-by-id.usecase';
import { FileStorageConfig } from '@config/file-storage.config';
import { MinioTeamFileUploader } from '@infra/adapters/team/minio-team.file-uploader';
import { TypeOrmTeamRepository } from '@infra/adapters/team/typeorm-team.repository';
import { InfrastructureDITokens } from '@infra/di/infra.di';
import { TeamDITokens } from '@infra/di/team.di';

export const TeamProviders: Provider[] = [
    {
        inject: [InfrastructureDITokens.DatabaseConnection],
        provide: TeamDITokens.RepositoryToken,
        useFactory: (connection: Connection) => connection.getCustomRepository(TypeOrmTeamRepository),
    },
    {
        inject: [InfrastructureDITokens.FileStorageClient, FileStorageConfig.KEY],
        provide: TeamDITokens.FileUploaderToken,
        useFactory: (fileStorageClient: Minio.Client, fileStorageConfig: ConfigType<typeof FileStorageConfig>) =>
            new MinioTeamFileUploader(fileStorageClient, fileStorageConfig),
    },
    {
        inject: [TeamDITokens.RepositoryToken, TeamDITokens.FileUploaderToken],
        provide: TeamDITokens.CreateUseCaseToken,
        useFactory: (reposistory: ITeamRepository, fileUploader: ITeamFileUploader) =>
            new UseCaseProxy(new CreateTeamUseCase(reposistory, fileUploader)),
    },
    {
        inject: [TeamDITokens.RepositoryToken],
        provide: TeamDITokens.FindByIdUseCaseToken,
        useFactory: (repository: ITeamRepository) => new UseCaseProxy(new FindTeamByIdUseCase(repository)),
    },
    {
        inject: [TeamDITokens.RepositoryToken],
        provide: TeamDITokens.FindAllUseCaseToken,
        useFactory: (repository: ITeamRepository) => new UseCaseProxy(new FindAllTeamUseCase(repository)),
    },
    {
        inject: [TeamDITokens.RepositoryToken, TeamDITokens.FileUploaderToken],
        provide: TeamDITokens.UpdateByIdUseCaseToken,
        useFactory: (repository: ITeamRepository, fileUploader: ITeamFileUploader) =>
            new UseCaseProxy(new UpdateTeamByIdUseCase(repository, fileUploader)),
    },
    {
        inject: [TeamDITokens.RepositoryToken],
        provide: TeamDITokens.DeleteByIdUseCaseToken,
        useFactory: (repository: ITeamRepository) => new UseCaseProxy(new DeleteTeamByIdUseCase(repository)),
    },
];
