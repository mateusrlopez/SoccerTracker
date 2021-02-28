import { Exclude, Expose, Type } from 'class-transformer';
import { Dayjs } from 'dayjs';
import { Column, Entity } from 'typeorm';

import * as date from '@helpers/date.helper';
import * as transformer from '@helpers/transformer.helper';
import { BaseEntity } from '@shared/base.entity';

@Entity()
export class User extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column({ transformer: transformer.encrypt })
    @Exclude()
    public password: string;

    @Column({ name: 'email_verified' })
    public emailVerified: boolean;

    @Column({ transformer: transformer.parseDate, type: 'date' })
    @Type(() => Date)
    public birthdate: Dayjs;

    @Column({ name: 'photo_url' })
    public photoURL: string | null;

    @Column({ name: 'team_id' })
    public teamId: number | null;

    @Column()
    public admin: boolean;

    @Expose()
    public get age(): number {
        return this.birthdate.diff(date.now(), 'years');
    }
}
