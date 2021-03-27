import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateFootballer } from './interfaces/create-footballer.interface';
import { IFootballer } from './interfaces/footballer.interface';
import { IUpdateFootballer } from './interfaces/update-footballer.interface';
import { FootballerRepository } from './repositories/footballer.repository';

@Injectable()
export class FootballerService {
    constructor(
        @InjectRepository(FootballerRepository)
        private readonly footballerRepository: FootballerRepository
    ) {}

    public async create(createFootballerDto: ICreateFootballer): Promise<IFootballer> {
        return this.footballerRepository.createAndSave(createFootballerDto);
    }

    public async findAll(): Promise<IFootballer[]> {
        return this.footballerRepository.find();
    }

    public async findById(id: number, throwException = true): Promise<IFootballer> {
        const footballer = await this.footballerRepository.findOne(id);

        if (throwException && typeof footballer === 'undefined') {
            throw new NotFoundException(`Footballer with id ${id} not found`);
        }

        return footballer;
    }

    public async updateById(
        id: number,
        updateFootballerDto: IUpdateFootballer
    ): Promise<IFootballer> {
        const footballer = await this.findById(id);

        return this.footballerRepository.save({ ...footballer, ...updateFootballerDto });
    }

    public async remove(id: number): Promise<void> {
        const footballer = await this.findById(id);

        await this.footballerRepository.remove(footballer);
    }
}
