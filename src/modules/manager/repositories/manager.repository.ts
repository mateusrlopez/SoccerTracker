import { EntityRepository, Repository } from 'typeorm';

import { Manager } from '@manager/entities/manager.entity';
import { ICreateManager } from '@manager/interfaces/create-manager.interface';
import { IManager } from '@manager/interfaces/manager.interface';

@EntityRepository(Manager)
export class ManagerRepository extends Repository<Manager> {
    public createAndSave(createManagerDto: ICreateManager): Promise<IManager> {
        const entity = this.create(createManagerDto);
        return this.save(entity);
    }
}
