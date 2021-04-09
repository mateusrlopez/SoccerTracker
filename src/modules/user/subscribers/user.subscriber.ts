import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { USER_QUEUE_NAME } from '@user/constants/user.constants';
import { User } from '@user/entities/user.entity';
import { IUser } from '@user/interfaces/user.interface';

@EventSubscriber()
@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(
        @InjectQueue(USER_QUEUE_NAME) private readonly userQueue: Queue,
        @InjectConnection() private readonly connection: Connection
    ) {
        this.connection.subscribers.push(this);
    }

    public listenTo(): Function {
        return User;
    }

    public async afterInsert(event: InsertEvent<IUser>): Promise<void> {
        await this.userQueue.add(event.entity);
    }
}
