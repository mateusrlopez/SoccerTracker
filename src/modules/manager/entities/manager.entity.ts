import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { DateHelper } from '@shared/helpers/date.helper';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

@Entity()
export class Manager extends BaseEntity {
    @Column()
    public firstName: string;

    @Column()
    public middleName: string;

    @Column()
    public lastName: string;

    @Column({ default: null })
    public pictureURL: string | null;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public birthdate: DateTime;

    @Column({ default: null })
    public teamId: number | null;

    @Expose()
    public get age(): number {
        return DateHelper.age(this.birthdate);
    }
}
