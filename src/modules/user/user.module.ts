import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { USER_QUEUE_NAME } from "./constants/user.constants";
import { UserRepository } from "./repositories/user.repository";
import { UserSubscriber } from "./subscribers/user.subscriber";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    controllers: [UserController],
    exports: [UserService],
    imports: [
        BullModule.registerQueue({ name: USER_QUEUE_NAME }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [UserService, UserSubscriber],
})
export class UserModule {}
