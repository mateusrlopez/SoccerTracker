import { factory } from 'factory-girl';
import * as faker from 'faker';

import * as date from '@shared/helpers/date.helper';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { QueryUserDto } from '@user/dto/query-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { User } from '@user/entities/user.entity';
import { ICreateUser } from '@user/interfaces/create-user.interface';
import { IQueryUser } from '@user/interfaces/query-user.interface';
import { IUpdateUser } from '@user/interfaces/update-user.interface';
import { IUser } from '@user/interfaces/user.interface';

factory.define<IUser>('User', User, {
    id: faker.random.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    admin: faker.random.boolean(),
    emailVerified: faker.random.boolean(),
    birthdate: date.parseFromJsDate(faker.date.past()),
    photoURL: faker.image.imageUrl(),
    teamId: faker.random.number(),
    createdAt: date.now(),
    updatedAt: null,
});

factory.define<ICreateUser>('CreateUserDto', CreateUserDto, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    birthdate: date.parseFromJsDate(faker.date.past()).toFormat('yyyy-MM-dd'),
    photoURL: faker.image.imageUrl(),
    teamId: faker.random.number(),
});

factory.define<IUpdateUser>('UpdateUserDto', UpdateUserDto, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthdate: date.parseFromJsDate(faker.date.past()).toFormat('yyyy-MM-dd'),
    photoURL: faker.image.imageUrl(),
    teamId: faker.random.number(),
});

factory.define<IQueryUser>('QueryUserDto', QueryUserDto, {
    teamId: faker.random.number(),
});

export const UserFactory = factory;
