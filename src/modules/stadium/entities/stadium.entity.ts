import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

@Entity()
export class Stadium extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column({ default: null })
    public pictureURL: string | null;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public foundationDate: DateTime;

    @Column()
    public capacity: number;
}
