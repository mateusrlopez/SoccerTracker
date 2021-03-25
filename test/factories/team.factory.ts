import { factory } from 'factory-girl';
import * as faker from 'faker';

import { DateHelper } from '@shared/helpers/date.helper';
import { CreateTeamDto } from '@team/dto/create-team.dto';
import { UpdateTeamDto } from '@team/dto/update-team.dto';
import { Team } from '@team/entities/team.entity';
import { ICreateTeam } from '@team/interfaces/create-team.interface';
import { ITeam } from '@team/interfaces/team.interface';
import { IUpdateTeam } from '@team/interfaces/update-team.interface';

factory.define<ITeam>('Team', Team, {
    id: faker.random.number(),
    name: faker.name.findName(),
    knownby: faker.name.findName(),
    initials: faker.random.alpha({ count: 3 }),
    logoURL: faker.image.imageUrl(),
    stadiumId: faker.random.number(),
    foundationDate: DateHelper.parseFromJsDate(faker.date.past()),
    createdAt: DateHelper.now(),
    updatedAt: null,
});

factory.define<ICreateTeam>('CreateTeamDto', CreateTeamDto, {
    name: faker.name.findName(),
    knownby: faker.name.findName(),
    initials: faker.random.alpha({ count: 3 }),
    logoURL: faker.image.imageUrl(),
    stadiumId: faker.random.number(),
    foundationDate: DateHelper.parseFromJsDate(faker.date.past()),
});

factory.define<IUpdateTeam>('UpdateTeamDto', UpdateTeamDto, {
    name: faker.name.findName(),
    knownby: faker.name.findName(),
    initials: faker.random.alpha({ count: 3 }),
    logoURL: faker.image.imageUrl(),
    stadiumId: faker.random.number(),
    foundationDate: DateHelper.parseFromJsDate(faker.date.past()),
});

export const TeamFactory = factory;
