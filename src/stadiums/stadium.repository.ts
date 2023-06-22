import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ICreateStadium } from './dto/create-stadium.dto';
import { IUpdateStadium } from './dto/update-stadium.dto';
import { IStadium } from './entities/stadium.entity';

export interface IStadiumRepository {
    create(data: ICreateStadium): Promise<IStadium>;
    findMany(): Promise<Array<IStadium>>;
    findOneById(id: string): Promise<IStadium>;
    findOneByName(name: string): Promise<IStadium>;
    updateOneById(id: string, data: IUpdateStadium): Promise<IStadium>;
    deleteOneById(id: string): Promise<void>;
}

@Injectable()
export class PrismaStadiumRepository implements IStadiumRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: ICreateStadium): Promise<IStadium> {
        return this.prisma.stadium.create({ data });
    }

    findMany(): Promise<IStadium[]> {
        return this.prisma.stadium.findMany();
    }

    findOneById(id: string): Promise<IStadium> {
        return this.prisma.stadium.findUnique({ where: { id } });
    }

    findOneByName(name: string): Promise<IStadium> {
        return this.prisma.stadium.findUnique({ where: { name } });
    }

    updateOneById(id: string, data: IUpdateStadium): Promise<IStadium> {
        return this.prisma.stadium.update({ where: { id }, data });
    }

    async deleteOneById(id: string): Promise<void> {
        await this.prisma.stadium.delete({ where: { id } });
    }
}
