import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StadiumController } from './stadium.controller';
import { StadiumRepositoryProvider, StadiumServiceProvider } from './stadium.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [StadiumController],
    providers: [StadiumRepositoryProvider, StadiumServiceProvider],
})
export class StadiumModule {}
