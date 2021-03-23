import { Expose, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import * as date from '@shared/helpers/date.helper';
import * as transformer from '@shared/helpers/transformer.helper';

@Entity()
export class Manager extends BaseEntity {
    @Column()
    public firstName: string;

    @Column()
    public middleName: string;

    @Column()
    public lastName: string;

    @Column()
    public pictureURL: string | null;

    @Column({ transformer: transformer.parseDateTimestamp, type: 'date' })
    @Type(() => Date)
    public birthdate: DateTime;

    @Column()
    public teamId: number;

    @Expose()
    public get age(): number {
        return date.age(this.birthdate);
    }
}
