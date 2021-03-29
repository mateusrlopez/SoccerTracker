import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { v4 } from 'uuid';

import { PASSWORD_RESET_QUEUE_NAME } from '../constants/password-reset.constants';
import { PasswordReset } from '../entities/password-reset.entity';
import { IPasswordReset } from '../interfaces/password-reset.interface';

@EventSubscriber()
@Injectable()
export class PasswordResetSubscriber implements EntitySubscriberInterface<IPasswordReset> {
    constructor(
        @InjectQueue(PASSWORD_RESET_QUEUE_NAME) private readonly passwordResetQueue: Queue,
        @InjectConnection() private readonly connection: Connection
    ) {
        this.connection.subscribers.push(this);
    }

    public listenTo(): Function {
        return PasswordReset;
    }

    public beforeInsert(event: InsertEvent<IPasswordReset>): void {
        const { entity } = event;
        const token = v4();

        entity.token = token;
    }

    public async afterInsert(event: InsertEvent<IPasswordReset>): Promise<void> {
        await this.passwordResetQueue.add(event.entity);
    }
}
