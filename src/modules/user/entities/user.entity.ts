import { Exclude, Expose, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import * as date from '@shared/helpers/date.helper';
import * as transformer from '@shared/helpers/transformer.helper';

@Entity()
export class User extends BaseEntity {
    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column({ transformer: transformer.encrypt })
    @Exclude()
    public password: string;

    @Column()
    public emailVerified: boolean;

    @Column({ transformer: transformer.parseDateTimestamp, type: 'date' })
    @Type(() => Date)
    public birthdate: DateTime;

    @Column()
    public photoURL: string | null;

    @Column()
    public teamId: number;

    @Column()
    public admin: boolean;

    @Expose()
    public get age(): number {
        return date.age(this.birthdate);
    }

    @Expose()
    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
