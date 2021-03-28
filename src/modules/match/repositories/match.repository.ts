import { EntityRepository, Repository } from 'typeorm';

import { Match } from '@match/entities/match.entity';
import { ICreateMatch } from '@match/interfaces/create-match.interface';
import { IMatch } from '@match/interfaces/match.interface';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
    public async createAndSave(createMatchDto: ICreateMatch): Promise<IMatch> {
        const entity = this.create(createMatchDto);
        return this.save(entity);
    }
}
