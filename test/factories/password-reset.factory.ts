import { factory } from 'factory-girl';
import faker from 'faker';

import { RequestPasswordResetDto } from '@password-reset/dto/request-password-reset.dto';
import { ResetPasswordDto } from '@password-reset/dto/reset-password.dto';
import { PasswordReset } from '@password-reset/entities/password-reset.entity';
import { IPasswordReset } from '@password-reset/interfaces/password-reset.interface';
import { IRequestPasswordReset } from '@password-reset/interfaces/request-password-reset.interface';
import { IResetPassword } from '@password-reset/interfaces/reset-password.interface';
import * as date from '@shared/helpers/date.helper';

factory.define<IPasswordReset>('PasswordReset', PasswordReset, {
    userEmail: faker.internet.email(),
    token: faker.random.alpha({ count: 60 }),
    createdAt: date.now(),
});

factory.define<IRequestPasswordReset>('RequestPasswordResetDto', RequestPasswordResetDto, {
    userEmail: faker.internet.email(),
});

factory.define<IResetPassword>('ResetPasswordDto', ResetPasswordDto, {
    userEmail: faker.internet.email(),
    token: faker.random.alpha({ count: 60 }),
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password(),
});

export const PasswordResetFactory = factory;
