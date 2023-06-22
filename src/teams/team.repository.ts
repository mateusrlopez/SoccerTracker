import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ICreateTeam } from './dto/create-team.dto';
import { IUpdateTeam } from './dto/update-team.dto';
import { ITeam } from './entities/team.entity';

export interface ITeamRepository {
    create(data: ICreateTeam): Promise<ITeam>;
    findMany(): Promise<Array<ITeam>>;
    findOneById(id: string): Promise<ITeam>;
    findOneByName(name: string): Promise<ITeam>;
    updateOneById(id: string, data: IUpdateTeam): Promise<ITeam>;
    deleteOneById(id: string): Promise<void>;
}

@Injectable()
export class PrismaTeamRepository implements ITeamRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: ICreateTeam): Promise<ITeam> {
        return this.prisma.team.create({ data, include: { stadium: true } });
    }

    findMany(): Promise<ITeam[]> {
        return this.prisma.team.findMany({ include: { stadium: true } });
    }

    findOneById(id: string): Promise<ITeam> {
        return this.prisma.team.findUnique({ where: { id }, include: { stadium: true } });
    }

    findOneByName(name: string): Promise<ITeam> {
        return this.prisma.team.findUnique({ where: { name }, include: { stadium: true } });
    }

    updateOneById(id: string, data: IUpdateTeam): Promise<ITeam> {
        return this.prisma.team.update({ where: { id }, data, include: { stadium: true } });
    }

    async deleteOneById(id: string): Promise<void> {
        await this.prisma.team.delete({ where: { id } });
    }
}
