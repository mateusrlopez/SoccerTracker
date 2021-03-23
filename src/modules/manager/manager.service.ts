import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateManager } from './interfaces/create-manager.interface';
import { IManager } from './interfaces/manager.interface';
import { IUpdateManager } from './interfaces/update-manager.interface';
import { ManagerRepository } from './repositories/manager.repository';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(ManagerRepository) private readonly managerRepository: ManagerRepository
    ) {}

    public async create(createManagerDto: ICreateManager): Promise<IManager> {
        return this.managerRepository.save(createManagerDto);
    }

    public async findAll(): Promise<IManager[]> {
        return this.managerRepository.find();
    }

    public async findById(id: number, throwException = true): Promise<IManager> {
        const manager = await this.managerRepository.findOne(id);

        if (throwException && typeof manager === 'undefined') {
            throw new NotFoundException(`Manager with id ${id} not found`);
        }

        return manager;
    }

    public async updateById(id: number, updateManagerDto: IUpdateManager): Promise<IManager> {
        const manager = await this.findById(id);

        return this.managerRepository.save({ ...manager, ...updateManagerDto });
    }

    public async remove(id: number): Promise<void> {
        const manager = await this.findById(id);

        await this.managerRepository.remove(manager);
    }
}
