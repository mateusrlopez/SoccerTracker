import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { ManagerRepository } from './repositories/manager.repository';

@Module({
    controllers: [ManagerController],
    exports: [ManagerService],
    imports: [TypeOrmModule.forFeature([ManagerRepository])],
    providers: [ManagerService],
})
export class ManagerModule {}
