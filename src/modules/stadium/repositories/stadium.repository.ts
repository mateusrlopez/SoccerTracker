import { EntityRepository, Repository } from 'typeorm';

import { ICreateStadium } from '@stadium/interfaces/create-stadium.interface';
import { IStadium } from '@stadium/interfaces/stadium.interface';

import { Stadium } from '../entities/stadium.entity';

@EntityRepository(Stadium)
export class StadiumRepository extends Repository<Stadium> {
    public createAndSave(createStadiumDto: ICreateStadium): Promise<IStadium> {
        const entity = this.create(createStadiumDto);
        return this.save(entity);
    }
}
