import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreatePlayer } from './interfaces/create-player.interface';
import { IPlayer } from './interfaces/player.interface';
import { IUpdatePlayer } from './interfaces/update-player.interface';
import { PlayerRepository } from './repositories/player.repository';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(PlayerRepository) private readonly playerRepository: PlayerRepository
    ) {}

    public async create(createPlayerDto: ICreatePlayer): Promise<IPlayer> {
        return this.playerRepository.save(createPlayerDto);
    }

    public async findAll(): Promise<IPlayer[]> {
        return this.playerRepository.find();
    }

    public async findById(id: number, throwException = true): Promise<IPlayer> {
        const player = await this.playerRepository.findOne(id);

        if (throwException && typeof player === 'undefined') {
            throw new NotFoundException(`Player with id ${id} doesn't exists`);
        }

        return player;
    }

    public async update(id: number, updatePlayerDto: IUpdatePlayer): Promise<IPlayer> {
        const player = await this.findById(id);

        return this.playerRepository.save(Object.assign(player, updatePlayerDto));
    }

    public async remove(id: number): Promise<void> {
        await this.playerRepository.delete(id);
    }
}
