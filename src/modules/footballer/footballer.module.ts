import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FootballerController } from './footballer.controller';
import { FootballerService } from './footballer.service';
import { FootballerRepository } from './repositories/footballer.repository';

@Module({
    controllers: [FootballerController],
    exports: [FootballerService],
    imports: [TypeOrmModule.forFeature([FootballerRepository])],
    providers: [FootballerService],
})
export class FootballerModule {}
