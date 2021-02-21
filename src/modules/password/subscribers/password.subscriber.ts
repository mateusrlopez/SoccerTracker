import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

import { PASSWORD_QUEUE_NAME } from "@password/constants/password.constants";
import { PasswordReset } from "@password/entities/password-reset.entity";
import { IPasswordReset } from "@password/interfaces/password-reset.interface";

@EventSubscriber()
@Injectable()
export class PasswordResetSubscriber implements EntitySubscriberInterface<IPasswordReset> {
    constructor(
        @InjectQueue(PASSWORD_QUEUE_NAME) private passwordQueue: Queue,
        connection: Connection
    ) {
        connection.subscribers.push(this);
    }

    public listenTo(): Function {
        return PasswordReset;
    }

    public afterInsert(event: InsertEvent<IPasswordReset>): void {
        this.passwordQueue.add(event.entity);
    }
}
