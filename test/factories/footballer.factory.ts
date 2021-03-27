import { factory } from 'factory-girl';
import * as faker from 'faker';

import { CreateFootballerDto } from '@footballer/dto/create-footballer.dto';
import { UpdateFootballerDto } from '@footballer/dto/update-footballer.dto';
import { Footballer } from '@footballer/entities/footballer.entity';
import { Function } from '@footballer/enums/function.enum';
import { Position } from '@footballer/enums/position.enum';
import { PreferredFoot } from '@footballer/enums/preferred-foot.enum';
import { ICreateFootballer } from '@footballer/interfaces/create-footballer.interface';
import { IFootballer } from '@footballer/interfaces/footballer.interface';
import { IUpdateFootballer } from '@footballer/interfaces/update-footballer.interface';
import { DateHelper } from '@shared/helpers/date.helper';

factory.define<IFootballer>('Footballer', Footballer, {
    id: faker.random.number(),
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    knownby: faker.name.findName(),
    birthdate: DateHelper.parseFromJsDate(faker.date.past()),
    height: faker.random.number(),
    weight: faker.random.number(),
    position: faker.random.arrayElement([
        'Goalkeeper',
        'Defender',
        'Midfielder',
        'Foward',
    ]) as Position,
    preferredFoot: faker.random.arrayElement(['Left', 'Right', 'Both']) as PreferredFoot,
    function: faker.random.arrayElement(['Manager', 'Player']) as Function,
    pictureURL: faker.image.imageUrl(),
    bio: faker.random.words(30),
    shirtNumber: faker.random.number(),
    createdAt: DateHelper.now(),
    updatedAt: null,
});

factory.define<ICreateFootballer>('CreateFootballerDto', CreateFootballerDto, {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    knownby: faker.name.findName(),
    birthdate: DateHelper.parseFromJsDate(faker.date.past()),
    height: faker.random.number(),
    weight: faker.random.number(),
    position: faker.random.arrayElement([
        'Goalkeeper',
        'Defender',
        'Midfielder',
        'Foward',
    ]) as Position,
    preferredFoot: faker.random.arrayElement(['Left', 'Right', 'Both']) as PreferredFoot,
    function: faker.random.arrayElement(['Manager', 'Player']) as Function,
    pictureURL: faker.image.imageUrl(),
    bio: faker.random.words(30),
    shirtNumber: faker.random.number(),
});

factory.define<IUpdateFootballer>('UpdateFootballerDto', UpdateFootballerDto, {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    knownby: faker.name.findName(),
    birthdate: DateHelper.parseFromJsDate(faker.date.past()),
    height: faker.random.number(),
    weight: faker.random.number(),
    position: faker.random.arrayElement([
        'Goalkeeper',
        'Defender',
        'Midfielder',
        'Foward',
    ]) as Position,
    preferredFoot: faker.random.arrayElement(['Left', 'Right', 'Both']) as PreferredFoot,
    function: faker.random.arrayElement(['Manager', 'Player']) as Function,
    pictureURL: faker.image.imageUrl(),
    bio: faker.random.words(30),
    shirtNumber: faker.random.number(),
});

export const FootballerFactory = factory;
