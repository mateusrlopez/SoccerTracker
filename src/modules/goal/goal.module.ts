import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { GoalRepository } from './repositories/goal.repository';

@Module({
    controllers: [GoalController],
    exports: [GoalService],
    imports: [TypeOrmModule.forFeature([GoalRepository])],
    providers: [GoalService],
})
export class GoalModule {}
