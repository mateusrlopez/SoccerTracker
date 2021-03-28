import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateMatch } from './interfaces/create-match.interface';
import { IMatch } from './interfaces/match.interface';
import { IUpdateMatch } from './interfaces/update-match.interface';
import { MatchRepository } from './repositories/match.repository';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(MatchRepository) private readonly matchRepository: MatchRepository
    ) {}

    public async create(createMatchDto: ICreateMatch): Promise<IMatch> {
        return this.matchRepository.createAndSave(createMatchDto);
    }

    public async findAll(): Promise<IMatch[]> {
        return this.matchRepository.find();
    }

    public async findById(id: number, throwException = true): Promise<IMatch> {
        const match = await this.matchRepository.findOne(id);

        if (throwException && typeof match === 'undefined') {
            throw new NotFoundException(`Match with id ${id} not found`);
        }

        return match;
    }

    public async update(id: number, updateMatchDto: IUpdateMatch): Promise<IMatch> {
        const match = await this.findById(id);

        return this.matchRepository.save(Object.assign(match, updateMatchDto));
    }

    public async remove(id: number): Promise<void> {
        const match = await this.findById(id);

        await this.matchRepository.remove(match);
    }
}
