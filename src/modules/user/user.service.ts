import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateUser } from './interfaces/create-user.interface';
import { IQueryUser } from './interfaces/query-user.interface';
import { IUpdateUser } from './interfaces/update-user.interface';
import { IUser } from './interfaces/user.interface';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    public async create(createUserDto: ICreateUser): Promise<IUser> {
        return this.userRepository.save(createUserDto);
    }

    public async findAll(queryUserDto: IQueryUser): Promise<IUser[]> {
        return this.userRepository.find(queryUserDto);
    }

    public async findByEmail(email: string, throwException = true): Promise<IUser> {
        const user = this.userRepository.findByEmail(email);

        if (throwException && typeof user === 'undefined') {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    public async findById(id: number, throwException = true): Promise<IUser> {
        const user = await this.userRepository.findOne(id);

        if (throwException && typeof user === 'undefined') {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    public async updateById(id: number, updateUserDto: IUpdateUser): Promise<IUser> {
        const user = await this.findById(id);

        return this.userRepository.save(Object.assign(user, updateUserDto));
    }

    public async updateByEmail(email: string, updateUserDto: IUpdateUser): Promise<IUser> {
        const user = await this.findByEmail(email);

        return this.userRepository.save(Object.assign(user, updateUserDto));
    }

    public async remove(id: number): Promise<void> {
        const user = await this.findById(id);

        await this.userRepository.remove(user);
    }
}
