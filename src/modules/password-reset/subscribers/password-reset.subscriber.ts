import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import crypto from 'crypto';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { PASSWORD_RESET_QUEUE_NAME } from '../constants/password-reset.constants';
import { PasswordReset } from '../entities/password-reset.entity';
import { IPasswordReset } from '../interfaces/password-reset.interface';

@EventSubscriber()
@Injectable()
export class PasswordResetSubscriber implements EntitySubscriberInterface<IPasswordReset> {
    constructor(
        @InjectQueue(PASSWORD_RESET_QUEUE_NAME) private passwordQueue: Queue,
        connection: Connection
    ) {
        connection.subscribers.push(this);
    }

    public listenTo(): Function {
        return PasswordReset;
    }

    public beforeInsert(event: InsertEvent<IPasswordReset>): void {
        const token = crypto.randomBytes(30).toString('hex');
        const { entity } = event;

        entity.token = token;

        this.passwordQueue.add({ entity: event.entity, token });
    }
}
