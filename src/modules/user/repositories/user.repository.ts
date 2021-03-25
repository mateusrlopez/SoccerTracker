import { EntityRepository, Repository } from 'typeorm';

import { User } from '@user/entities/user.entity';
import { ICreateUser } from '@user/interfaces/create-user.interface';
import { IUser } from '@user/interfaces/user.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public createAndSave(createUserDto: ICreateUser): Promise<IUser> {
        const entity = this.create(createUserDto);
        return this.save(entity);
    }

    public findByEmail(email: string): Promise<IUser> {
        return this.findOne({ email });
    }
}
