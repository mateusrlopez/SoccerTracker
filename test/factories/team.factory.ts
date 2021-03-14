import faker from 'faker';

import { format } from '@helpers/date.helper';

export const createTeamPayload = {
    name: faker.name.firstName(),
    knownby: faker.name.firstName(),
    initials: 'AAA',
    logoURL: faker.image.imageUrl(),
    foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
};

export const updateTeamPayload = {
    name: faker.name.firstName(),
    knownby: faker.name.firstName(),
    initials: 'AAA',
    logoURL: faker.image.imageUrl(),
    foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
};

export const teamsArray = [
    {
        id: 1,
        name: faker.name.firstName(),
        knownby: faker.name.firstName(),
        initials: 'AAA',
        logoURL: faker.image.imageUrl(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
    {
        id: 2,
        name: faker.name.firstName(),
        knownby: faker.name.firstName(),
        initials: 'AAA',
        logoURL: faker.image.imageUrl(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
    {
        id: 3,
        name: faker.name.firstName(),
        knownby: faker.name.firstName(),
        initials: 'AAA',
        logoURL: faker.image.imageUrl(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
    {
        id: 4,
        name: faker.name.firstName(),
        knownby: faker.name.firstName(),
        initials: 'AAA',
        logoURL: faker.image.imageUrl(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
];
