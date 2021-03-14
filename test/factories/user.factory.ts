import faker from 'faker';

import { format } from '@shared/helpers/date.helper';

export const createUserPayload = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
    password: faker.internet.password(),
    photoURL: faker.image.imageUrl(),
    teamId: faker.random.number(),
};

export const updateUserPayload = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
};

export const usersArray = [
    {
        id: 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'mateusrlopez@gmail.com',
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
        password: faker.internet.password(),
        photoURL: faker.image.imageUrl(),
        teamId: 1,
    },
    {
        id: 2,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
        password: faker.internet.password(),
        photoURL: faker.image.imageUrl(),
        teamId: 1,
    },
    {
        id: 3,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
        password: faker.internet.password(),
        photoURL: faker.image.imageUrl(),
        teamId: 2,
    },
    {
        id: 4,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: format(faker.date.past(), 'YYYY-MM-DD'),
        password: faker.internet.password(),
        photoURL: faker.image.imageUrl(),
        teamId: 3,
    },
];
