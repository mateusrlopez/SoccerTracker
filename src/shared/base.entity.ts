import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { TransformerHelper } from '@shared/helpers/transformer.helper';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @CreateDateColumn({
        transformer: TransformerHelper.parseGeneratedTimestamp,
        type: 'timestamptz',
    })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd HH:mm:ss'))
    public createdAt: DateTime;

    @UpdateDateColumn({
        transformer: TransformerHelper.parseGeneratedTimestamp,
        type: 'timestamptz',
    })
    @Transform(({ value }) => (value ? value.toFormat('yyyy-MM-dd HH:mm:ss') : value))
    public updatedAt: DateTime | null;
}
