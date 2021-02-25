import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { USER_QUEUE_NAME } from '@user/constants/user.constants';
import { User } from '@user/entities/user.entity';
import { IUser } from '@user/interfaces/user.interface';

@EventSubscriber()
@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<IUser> {
    constructor(
        @InjectQueue(USER_QUEUE_NAME) private readonly userQueue: Queue,
        private readonly connection: Connection
    ) {
        this.connection.subscribers.push(this);
    }

    public listenTo(): Function {
        return User;
    }

    public afterInsert(event: InsertEvent<IUser>): void {
        this.userQueue.add(event.entity);
    }
}
