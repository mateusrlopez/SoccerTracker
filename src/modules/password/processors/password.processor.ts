import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { PASSWORD_RESET_QUEUE_NAME } from '@password/constants/password.constants';
import { IPasswordReset } from '@password/interfaces/password-reset.interface';

@Processor(PASSWORD_RESET_QUEUE_NAME)
export class PasswordConsumer {
    constructor(private readonly mailerService: MailerService) {}

    @Process()
    public async sendMail(job: Job<IPasswordReset>): Promise<void> {
        const { email, user } = job.data;

        await this.mailerService.sendMail({
            context: {
                name: user.firstName,
                url: ``,
            },
            subject: 'Password reset at SoccerStats',
            template: 'password-reset',
            to: email,
        });
    }
}
