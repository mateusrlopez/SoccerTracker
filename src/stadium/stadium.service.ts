import { Inject, Injectable } from '@nestjs/common';
import { ICreateStadium } from './dto/create-stadium.dto';
import { IUpdateStadium } from './dto/update-stadium.dto';
import { IStadium } from './entities/stadium.entity';
import { IStadiumRepository } from './stadium.repository';
import { StadiumExistsException } from './exceptions/exists.exception';
import { StadiumNotExistsException } from './exceptions/not-exists.exception';

export interface IStadiumService {
    create(data: ICreateStadium): Promise<IStadium>;
    findAll(): Promise<Array<IStadium>>;
    findOneById(id: string): Promise<IStadium>;
    updateOneById(id: string, data: IUpdateStadium): Promise<IStadium>;
    removeOneById(id: string): Promise<void>;
}

@Injectable()
export class StadiumServiceImplementation implements IStadiumService {
    constructor(
        @Inject('STADIUM_REPOSITORY') private readonly stadiumRepository: IStadiumRepository
    ) {}

    async create(data: ICreateStadium): Promise<IStadium> {
        const stadium = await this.stadiumRepository.findOneByName(data.name);

        if (stadium) {
            throw new StadiumExistsException(`Stadium with name: ${data.name} already exists`);
        }

        return this.stadiumRepository.create(data);
    }

    findAll(): Promise<Array<IStadium>> {
        return this.stadiumRepository.findMany();
    }

    async findOneById(id: string): Promise<IStadium> {
        const stadium = await this.stadiumRepository.findOneById(id);

        if (!stadium) {
            throw new StadiumNotExistsException(`Stadium with given id: ${id} does not exists`);
        }

        return stadium;
    }

    updateOneById(id: string, updateStadiumDto: IUpdateStadium): Promise<IStadium> {
        return this.stadiumRepository.updateOneById(id, updateStadiumDto);
    }

    async removeOneById(id: string): Promise<void> {
        await this.stadiumRepository.deleteOneById(id);
    }
}
