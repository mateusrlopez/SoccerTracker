import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StadiumRepository } from './repositories/stadium.repository';
import { StadiumController } from './stadium.controller';
import { StadiumService } from './stadium.service';

@Module({
    controllers: [StadiumController],
    exports: [StadiumService],
    imports: [TypeOrmModule.forFeature([StadiumRepository])],
    providers: [StadiumService],
})
export class StadiumModule {}
