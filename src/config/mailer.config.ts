import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import * as env from '@helpers/env.helper';

export const mailerConfig: MailerOptions = {
    defaults: {
        from: env.getVariable('MAIL_FROM'),
    },
    template: {
        adapter: new HandlebarsAdapter(),
        dir: env.getVariable('MAIL_TEMPLATE_DIR'),
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
