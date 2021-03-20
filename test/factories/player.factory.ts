import { factory } from 'factory-girl';
import faker from 'faker';

import { CreatePlayerDto } from '@player/dto/create-player.dto';
import { UpdatePlayerDto } from '@player/dto/update-player.dto';
import { Player } from '@player/entities/player.entity';
import { ICreatePlayer } from '@player/interfaces/create-player.interface';
import { IPlayer } from '@player/interfaces/player.interface';
import { IUpdatePlayer } from '@player/interfaces/update-player.interface';
import * as date from '@shared/helpers/date.helper';

factory.define<IPlayer>('Player', Player, {
    id: faker.random.number(),
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    knownby: faker.name.findName(),
    pictureURL: faker.image.imageUrl(),
    height: faker.random.number(),
    birthdate: date.parse(faker.date.past()),
    createdAt: date.now(),
    updatedAt: null,
});

factory.define<ICreatePlayer>('CreatePlayerDto', CreatePlayerDto, {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    knownby: faker.name.findName(),
    pictureURL: faker.image.imageUrl(),
    height: faker.random.number(),
    birthdate: date.format(faker.date.past()),
});

factory.define<IUpdatePlayer>('UpdatePlayerDto', UpdatePlayerDto, {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    knownby: faker.name.findName(),
    pictureURL: faker.image.imageUrl(),
    height: faker.random.number(),
    birthdate: date.format(faker.date.past()),
});

export const PlayerFactory = factory;
