import { EntityRepository, Repository } from 'typeorm';

import { ICreatePlayer } from '@player/interfaces/create-player.interface';
import { IPlayer } from '@player/interfaces/player.interface';

import { Player } from '../entities/player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
    public createAndSave(createPlayerDto: ICreatePlayer): Promise<IPlayer> {
        const entity = this.create(createPlayerDto);
        return this.save(entity);
    }
}
