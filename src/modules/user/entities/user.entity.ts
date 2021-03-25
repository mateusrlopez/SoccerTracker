import { Exclude, Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { DateHelper } from '@shared/helpers/date.helper';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

@Entity()
export class User extends BaseEntity {
    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column({ transformer: TransformerHelper.encrypt })
    @Exclude()
    public password: string;

    @Column({ default: false })
    public emailVerified: boolean;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public birthdate: DateTime;

    @Column({ default: null })
    public photoURL: string | null;

    @Column()
    public teamId: number;

    @Column({ default: false })
    public admin: boolean;

    @Expose()
    public get age(): number {
        return DateHelper.age(this.birthdate);
    }

    @Expose()
    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
