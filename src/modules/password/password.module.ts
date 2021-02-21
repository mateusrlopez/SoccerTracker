import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "@user/user.module";

import { PASSWORD_RESET_QUEUE_NAME } from "./constants/password.constants";
import { PasswordController } from "./password.controller";
import { PasswordService } from "./password.service";
import { PasswordConsumer } from "./processors/password.processor";
import { PasswordResetRepository } from "./repositories/password.repository";
import { PasswordResetSubscriber } from "./subscribers/password.subscriber";

@Module({
    controllers: [PasswordController],
    exports: [],
    imports: [
        BullModule.registerQueue({ name: PASSWORD_RESET_QUEUE_NAME }),
        TypeOrmModule.forFeature([PasswordResetRepository]),
        UserModule,
    ],
    providers: [PasswordConsumer, PasswordResetSubscriber, PasswordService],
})
export class PasswordModule {}
