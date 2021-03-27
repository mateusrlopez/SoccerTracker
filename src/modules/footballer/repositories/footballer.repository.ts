import { EntityRepository, Repository } from 'typeorm';

import { Footballer } from '../entities/footballer.entity';
import { ICreateFootballer } from '../interfaces/create-footballer.interface';
import { IFootballer } from '../interfaces/footballer.interface';

@EntityRepository(Footballer)
export class FootballerRepository extends Repository<Footballer> {
    public createAndSave(createFootballerDto: ICreateFootballer): Promise<IFootballer> {
        const entity = this.create(createFootballerDto);
        return this.save(entity);
    }
}
