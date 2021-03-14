import faker from 'faker';

import { format } from '@shared/helpers/date.helper';

export const createPlayerPayload = {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    knownby: faker.name.firstName(),
    pictureURL: faker.image.imageUrl(),
    height: faker.random.number(),
    birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
};

export const updatePlayerPayload = {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
};

export const playersArray = [
    {
        id: 1,
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        knownby: faker.name.firstName(),
        pictureURL: faker.image.imageUrl(),
        height: faker.random.number(),
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
    {
        id: 2,
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        knownby: faker.name.firstName(),
        pictureURL: faker.image.imageUrl(),
        height: faker.random.number(),
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
    {
        id: 3,
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        knownby: faker.name.firstName(),
        pictureURL: faker.image.imageUrl(),
        height: faker.random.number(),
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
    {
        id: 4,
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        knownby: faker.name.firstName(),
        pictureURL: faker.image.imageUrl(),
        height: faker.random.number(),
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
    },
];
