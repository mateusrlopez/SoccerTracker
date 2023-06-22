import { Inject, Injectable } from '@nestjs/common';
import { ICreateMatch } from './dto/create-match.dto';
import { IUpdateMatch } from './dto/update-match.dto';
import { IMatch } from './entities/match.entity';
import { IMatchRepository } from './match.repository';
import { MatchNotExistsException } from './exceptions/not-exists.exception';

export interface IMatchService {
    create(createMatchDto: ICreateMatch): Promise<IMatch>;
    findAll(): Promise<Array<IMatch>>;
    findManyByUser(id: string): Promise<Array<IMatch>>;
    findOneById(id: string): Promise<IMatch>;
    updateOneById(id: string, updateMatchDto: IUpdateMatch): Promise<IMatch>;
    connectOneToUser(matchId: string, userId: string): Promise<void>;
    disconnectOneToUser(matchId: string, userId: string): Promise<void>;
    removeOneById(id: string): Promise<void>;
}

@Injectable()
export class MatchServiceImplementation implements IMatchService {
    constructor(@Inject('MATCH_REPOSITORY') private readonly matchRepository: IMatchRepository) {}

    create(createMatchDto: ICreateMatch): Promise<IMatch> {
        return this.matchRepository.create(createMatchDto);
    }

    findAll(): Promise<Array<IMatch>> {
        return this.matchRepository.findMany();
    }

    findManyByUser(id: string): Promise<IMatch[]> {
        return this.matchRepository.findManyByUser(id);
    }

    async findOneById(id: string): Promise<IMatch> {
        const match = await this.matchRepository.findOneById(id);

        if (!match) {
            throw new MatchNotExistsException(`Match with given id: ${id} does not exists`);
        }

        return match;
    }

    updateOneById(id: string, updateMatchDto: IUpdateMatch): Promise<IMatch> {
        return this.matchRepository.updateOneById(id, updateMatchDto);
    }

    async connectOneToUser(matchId: string, userId: string): Promise<void> {
        await this.matchRepository.connectOneToUser(matchId, userId);
    }

    async disconnectOneToUser(matchId: string, userId: string): Promise<void> {
        await this.matchRepository.disconnectOneToUser(matchId, userId);
    }

    async removeOneById(id: string): Promise<void> {
        await this.matchRepository.deleteOneById(id);
    }
}
