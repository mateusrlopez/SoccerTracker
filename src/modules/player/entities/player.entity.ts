import { Expose, Type } from 'class-transformer';
import { Dayjs } from 'dayjs';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import * as date from '@helpers/date.helper';
import * as transformer from '@helpers/transformer.helper';
import { BaseEntity } from '@shared/base.entity';

@Entity()
export class Player extends BaseEntity {
    @PrimaryColumn()
    public readonly id: number;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'middle_name' })
    public middleName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'picture_url' })
    public pictureURL: string | null;

    @Column()
    public knownby: string;

    @Column()
    public height: number;

    @Column({ transformer: transformer.parseDate, type: 'date' })
    @Type(() => Date)
    public birthdate: Dayjs;

    @Expose()
    public get age(): number {
        return this.birthdate.diff(date.now(), 'days');
    }
}
