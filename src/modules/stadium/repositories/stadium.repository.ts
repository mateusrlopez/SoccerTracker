import { EntityRepository, Repository } from 'typeorm';

import { Stadium } from '../entities/stadium.entity';

@EntityRepository(Stadium)
export class StadiumRepository extends Repository<Stadium> {}
