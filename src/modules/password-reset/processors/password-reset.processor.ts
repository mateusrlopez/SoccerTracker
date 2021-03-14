import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { PASSWORD_RESET_QUEUE_NAME } from '../constants/password-reset.constants';
import { IPasswordReset } from '../interfaces/password-reset.interface';

@Processor(PASSWORD_RESET_QUEUE_NAME)
export class PasswordResetConsumer {
    constructor(private readonly mailerService: MailerService) {}

    @Process()
    public async sendMail(job: Job<{ entity: IPasswordReset; token: string }>): Promise<void> {
        const { user } = job.data.entity;
        const { token } = job.data;

        await this.mailerService.sendMail({
            context: {
                name: user.firstName,
                url: `?token=${token}&email=${user.email}`,
            },
            subject: 'Password reset at SoccerStats',
            template: 'password-reset',
            to: user.email,
        });
    }
}
