import { Exclude, Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { DateHelper } from '@shared/helpers/date.helper';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

import { IUser } from '../interfaces/user.interface';

@Entity()
export class User extends BaseEntity implements IUser {
    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column({ default: false })
    public emailVerified: boolean;

    @Column({ transformer: TransformerHelper.encrypt })
    @Exclude()
    public password: string;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public birthdate: DateTime;

    @Column({ default: false })
    public admin: boolean;

    @Column({ default: null })
    public photoURL: string;

    @Column({ default: null })
    public bio: string;

    @Column()
    public teamId: number;

    @Expose()
    public get age(): number {
        return DateHelper.age(this.birthdate);
    }

    @Expose()
    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
