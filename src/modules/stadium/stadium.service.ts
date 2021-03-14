import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateStadium } from './interfaces/create-stadium.interface';
import { IStadium } from './interfaces/stadium.interface';
import { IUpdateStadium } from './interfaces/update-stadium.interface';
import { StadiumRepository } from './repositories/stadium.repository';

@Injectable()
export class StadiumService {
    constructor(
        @InjectRepository(StadiumRepository) private readonly stadiumRepository: StadiumRepository
    ) {}

    public async create(createStadiumDto: ICreateStadium): Promise<IStadium> {
        return this.stadiumRepository.save(createStadiumDto);
    }

    public async findAll(): Promise<IStadium[]> {
        return this.stadiumRepository.find();
    }

    public async findById(id: number, throwException = true): Promise<IStadium> {
        const stadium = await this.stadiumRepository.findOne(id);

        if (throwException && typeof stadium === 'undefined') {
            throw new NotFoundException(`Stadium with ${id} not found`);
        }

        return stadium;
    }

    public async updateById(id: number, updateStadiumDto: IUpdateStadium): Promise<IStadium> {
        const stadium = await this.findById(id);

        return this.stadiumRepository.save(Object.assign(stadium, updateStadiumDto));
    }

    public async remove(id: number): Promise<void> {
        const stadium = await this.findById(id);

        await this.stadiumRepository.remove(stadium);
    }
}
