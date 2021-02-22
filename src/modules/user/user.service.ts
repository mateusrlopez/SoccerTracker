import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ICreateUserDto } from "./interfaces/create-user-dto.interface";
import { IUserUpdateDto } from "./interfaces/update-user-dto.interface";
import { IUser } from "./interfaces/user.interface";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    public async findAll(): Promise<IUser[]> {
        return this.userRepository.find();
    }

    public async findByEmail(email: string): Promise<IUser> {
        const user = this.userRepository.findByEmail(email);

        if (typeof user === "undefined") {
            throw new NotFoundException();
        }

        return user;
    }

    public async findById(id: number): Promise<IUser> {
        const user = await this.userRepository.findOne(id);

        if (typeof user === "undefined") {
            throw new NotFoundException();
        }

        return user;
    }

    public async create(createUserDto: ICreateUserDto): Promise<IUser> {
        return this.userRepository.save(createUserDto);
    }

    public async updateById(id: number, updateUserDto: IUserUpdateDto): Promise<IUser> {
        const user = await this.findById(id);

        return this.userRepository.save(Object.assign(user, updateUserDto));
    }

    public async updateByEmail(email: string, updateUserDto: IUserUpdateDto): Promise<IUser> {
        const user = await this.findByEmail(email);

        return this.userRepository.save(Object.assign(user, updateUserDto));
    }

    public async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
