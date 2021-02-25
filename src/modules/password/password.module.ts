import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';

import { PASSWORD_RESET_QUEUE_NAME } from './constants/password.constants';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { PasswordConsumer } from './processors/password.processor';
import { PasswordResetRepository } from './repositories/password-reset.repository';
import { PasswordResetSubscriber } from './subscribers/password-reset.subscriber';

@Module({
    controllers: [PasswordController],
    exports: [],
    imports: [
        BullModule.registerQueue({ name: PASSWORD_RESET_QUEUE_NAME }),
        TypeOrmModule.forFeature([PasswordResetRepository]),
        AuthModule,
        UserModule,
    ],
    providers: [PasswordConsumer, PasswordResetSubscriber, PasswordService],
})
export class PasswordModule {}
