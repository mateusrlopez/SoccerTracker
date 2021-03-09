import { EntityRepository, Repository } from 'typeorm';

import { Player } from '../entities/player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {}
