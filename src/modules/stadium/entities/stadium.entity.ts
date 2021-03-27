import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

import { IStadium } from '../interfaces/stadium.interface';

@Entity()
export class Stadium extends BaseEntity implements IStadium {
    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column({ default: null })
    public pictureURL: string;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public foundationDate: DateTime;

    @Column()
    public address: string;

    @Column()
    public capacity: number;

    @Column({ default: null })
    public bio: string;
}
