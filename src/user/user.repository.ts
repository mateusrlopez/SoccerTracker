import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUser } from './entities/user.entity';
import { ICreateUser } from './dto/create-user.dto';
import { IUpdateUser } from './dto/update-user.dto';

export interface IUserRepository {
    create(data: ICreateUser): Promise<IUser>;
    findMany(): Promise<Array<IUser>>;
    findOneById(id: string): Promise<IUser>;
    findOneByEmail(email: string): Promise<IUser>;
    updateOneById(id: string, data: IUpdateUser): Promise<IUser>;
    deleteOneById(id: string): Promise<void>;
}

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: ICreateUser): Promise<IUser> {
        return this.prisma.user.create({ data });
    }

    findMany(): Promise<IUser[]> {
        return this.prisma.user.findMany();
    }

    findOneById(id: string): Promise<IUser> {
        return this.prisma.user.findFirst({ where: { id } });
    }

    findOneByEmail(email: string): Promise<IUser> {
        return this.prisma.user.findFirst({ where: { email } });
    }

    updateOneById(id: string, data: IUpdateUser): Promise<IUser> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteOneById(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}
