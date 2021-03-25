import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';

import { PASSWORD_RESET_QUEUE_NAME } from './constants/password-reset.constants';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetProcessor } from './processors/password-reset.processor';
import { PasswordResetRepository } from './repositories/password-reset.repository';
import { PasswordResetSubscriber } from './subscribers/password-reset.subscriber';

@Module({
    controllers: [PasswordResetController],
    exports: [],
    imports: [
        BullModule.registerQueue({ name: PASSWORD_RESET_QUEUE_NAME }),
        TypeOrmModule.forFeature([PasswordResetRepository]),
        AuthModule,
        UserModule,
    ],
    providers: [PasswordResetProcessor, PasswordResetSubscriber, PasswordResetService],
})
export class PasswordModule {}
