import { factory } from 'factory-girl';
import * as faker from 'faker';

import { DateHelper } from '@shared/helpers/date.helper';
import { CreateStadiumDto } from '@stadium/dto/create-stadium.dto';
import { UpdateStadiumDto } from '@stadium/dto/update-stadium.dto';
import { Stadium } from '@stadium/entities/stadium.entity';
import { ICreateStadium } from '@stadium/interfaces/create-stadium.interface';
import { IStadium } from '@stadium/interfaces/stadium.interface';
import { IUpdateStadium } from '@stadium/interfaces/update-stadium.interface';

factory.define<IStadium>('Stadium', Stadium, {
    id: faker.random.number(),
    name: faker.name.findName(),
    knownby: faker.name.findName(),
    pictureURL: faker.image.imageUrl(),
    foundationDate: DateHelper.parseFromJsDate(faker.date.past()),
    capacity: faker.random.number(),
    createdAt: DateHelper.now(),
    updatedAt: null,
});

factory.define<ICreateStadium>('CreateStadiumDto', CreateStadiumDto, {
    name: faker.name.findName(),
    knownby: faker.name.findName(),
    pictureURL: faker.image.imageUrl(),
    foundationDate: DateHelper.parseFromJsDate(faker.date.past()),
    capacity: faker.random.number(),
});

factory.define<IUpdateStadium>('UpdateStadiumDto', UpdateStadiumDto, {
    name: faker.name.findName(),
    knownby: faker.name.findName(),
    pictureURL: faker.image.imageUrl(),
    foundationDate: DateHelper.parseFromJsDate(faker.date.past()),
    capacity: faker.random.number(),
});

export const StadiumFactory = factory;
