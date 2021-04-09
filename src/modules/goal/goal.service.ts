import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateGoal } from './interfaces/create-goal.interface';
import { IGoal } from './interfaces/goal.interface';
import { IUpdateGoal } from './interfaces/update-goal.interface';
import { GoalRepository } from './repositories/goal.repository';

@Injectable()
export class GoalService {
    constructor(
        @InjectRepository(GoalRepository) private readonly goalRepository: GoalRepository
    ) {}

    public async create(createGoalDto: ICreateGoal): Promise<IGoal> {
        return this.goalRepository.createAndSave(createGoalDto);
    }

    public async findAll(): Promise<IGoal[]> {
        return this.goalRepository.find();
    }

    public async findById(id: number, throwException = true): Promise<IGoal> {
        const goal = await this.goalRepository.findOne(id);

        if (throwException && typeof goal === 'undefined') {
            throw new NotFoundException(`Goal with id ${id} not found`);
        }

        return goal;
    }

    public async update(id: number, updateGoalDto: IUpdateGoal): Promise<IGoal> {
        const goal = await this.findById(id);

        return this.goalRepository.save(Object.assign(goal, updateGoalDto));
    }

    public async remove(id: number): Promise<void> {
        const goal = await this.findById(id);

        await this.goalRepository.remove(goal);
    }
}
