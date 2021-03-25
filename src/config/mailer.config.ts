import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

import { EnvHelper } from '@shared/helpers/env.helper';

export const MailerConfig: MailerOptions = {
    defaults: {
        from: EnvHelper.getVariable('MAIL_FROM'),
    },
    template: {
        adapter: new HandlebarsAdapter(),
        dir: path.join(__dirname, '..', '..', 'templates'),
        options: {
            strict: true,
        },
    },
    transport: {
        auth: {
            password: EnvHelper.getVariable('MAIL_PASSWORD'),
            user: EnvHelper.getVariable('MAIL_USER'),
        },
        host: EnvHelper.getVariable('MAIL_HOST'),
        ignoreTLS: true,
        port: EnvHelper.getNumericVariable('MAIL_PORT'),
        secure: false,
    },
};
