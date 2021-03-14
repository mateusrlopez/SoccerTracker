import faker from 'faker';

import * as hash from '@shared/helpers/hash.helper';

export const requestPasswordResetPayload = {
    userEmail: faker.internet.email(),
};

export const resetPasswordPayload = {
    userEmail: 'mateusrlopez@gmail.com',
    token: 'teste123',
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password(),
};

export const invalidTokenResetPasswordPayload = {
    userEmail: 'mateusrlopez@gmail.com',
    token: 'teste',
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password(),
};

export const invalidEmailResetPasswordPayload = {
    userEmail: 'mateusrlopes',
    token: 'teste123',
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password(),
};

export const passwordResetsArray = [
    {
        userEmail: 'mateusrlopez@gmail.com',
        token: hash.encrypt('teste123'),
    },
    {
        userEmail: faker.internet.email(),
        token: faker.random.word(),
    },
    {
        userEmail: faker.internet.email(),
        token: faker.random.word(),
    },
    {
        userEmail: faker.internet.email(),
        token: faker.random.word(),
    },
];
