import { EntityRepository, Repository } from 'typeorm';

import { Manager } from '@manager/entities/manager.entity';

@EntityRepository(Manager)
export class ManagerRepository extends Repository<Manager> {}
