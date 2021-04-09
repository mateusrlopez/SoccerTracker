import { EntityRepository, Repository } from 'typeorm';

import { Goal } from '@goal/entities/goal.entity';
import { ICreateGoal } from '@goal/interfaces/create-goal.interface';
import { IGoal } from '@goal/interfaces/goal.interface';

@EntityRepository(Goal)
export class GoalRepository extends Repository<Goal> {
    public async createAndSave(createGoalDto: ICreateGoal): Promise<IGoal> {
        const entity = this.create(createGoalDto);
        return this.save(entity);
    }
}
