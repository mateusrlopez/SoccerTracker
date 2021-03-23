import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

import * as env from '@shared/helpers/env.helper';

export const MailerConfig: MailerOptions = {
    defaults: {
        from: env.getVariable('MAIL_FROM'),
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
            password: env.getVariable('MAIL_PASSWORD'),
            user: env.getVariable('MAIL_USER'),
        },
        host: env.getVariable('MAIL_HOST'),
        ignoreTLS: true,
        port: env.getNumericVariable('MAIL_PORT'),
        secure: false,
    },
};
