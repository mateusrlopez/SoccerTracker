import { Inject, Injectable } from '@nestjs/common';
import { ICreateUser } from './dto/create-user.dto';
import { IUpdateUser } from './dto/update-user.dto';
import { IUser } from './entities/user.entity';
import { IUserRepository } from './user.repository';
import { UserAlreadyExistsException } from './exceptions/exists.exception';
import { UserNotExistsException } from './exceptions/not-exists.exceptions';

export interface IUserService {
    create(createUserDto: ICreateUser): Promise<IUser>;
    findAll(): Promise<Array<IUser>>;
    findOneById(id: string): Promise<IUser>;
    findOneByEmail(email: string): Promise<IUser>;
    updateOneById(id: string, updateUserDto: IUpdateUser): Promise<IUser>;
    removeOneById(id: string): Promise<void>;
}

@Injectable()
export class UserServiceImplementation implements IUserService {
    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository) {}

    async create(createUserDto: ICreateUser): Promise<IUser> {
        const user = await this.userRepository.findOneByEmail(createUserDto.email);

        if (user) {
            throw new UserAlreadyExistsException(
                `User with given email: ${user.email} already exists`
            );
        }

        return this.userRepository.create(createUserDto);
    }

    findAll(): Promise<Array<IUser>> {
        return this.userRepository.findMany();
    }

    async findOneById(id: string): Promise<IUser> {
        const user = await this.userRepository.findOneById(id);

        if (!user) {
            throw new UserNotExistsException(`User with given id: ${id} does not exists`);
        }

        return user;
    }

    async findOneByEmail(email: string): Promise<IUser> {
        const user = await this.userRepository.findOneByEmail(email);

        if (!user) {
            throw new UserNotExistsException(`User with given email: ${email} does not exists`);
        }

        return user;
    }

    updateOneById(id: string, updateUserDto: IUpdateUser): Promise<IUser> {
        return this.userRepository.updateOneById(id, updateUserDto);
    }

    async removeOneById(id: string): Promise<void> {
        await this.userRepository.deleteOneById(id);
    }
}
