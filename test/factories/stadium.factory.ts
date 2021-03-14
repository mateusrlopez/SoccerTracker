import faker from 'faker';

import { format } from '@shared/helpers/date.helper';

export const createStadiumPayload = {
    name: faker.name.findName(),
    knownby: faker.name.firstName(),
    foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
    capacity: faker.random.number(),
    pictureURL: faker.image.imageUrl(),
};

export const updateStadiumPayload = {
    name: faker.name.findName(),
    knownby: faker.name.firstName(),
    foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
    capacity: faker.random.number(),
    pictureURL: faker.image.imageUrl(),
};

export const stadiumsArray = [
    {
        id: 1,
        name: faker.name.findName(),
        knownby: faker.name.firstName(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
        capacity: faker.random.number(),
        pictureURL: faker.image.imageUrl(),
    },
    {
        id: 2,
        name: faker.name.findName(),
        knownby: faker.name.firstName(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
        capacity: faker.random.number(),
        pictureURL: faker.image.imageUrl(),
    },
    {
        id: 3,
        name: faker.name.findName(),
        knownby: faker.name.firstName(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
        capacity: faker.random.number(),
        pictureURL: faker.image.imageUrl(),
    },
    {
        id: 4,
        name: faker.name.findName(),
        knownby: faker.name.firstName(),
        foundationDate: format(faker.date.past(), 'YYYY-MM-DD'),
        capacity: faker.random.number(),
        pictureURL: faker.image.imageUrl(),
    },
];
