import { Type } from 'class-transformer';
import { Dayjs } from 'dayjs';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import * as transformer from '@helpers/transformer.helper';

export abstract class BaseEntity {
    @PrimaryColumn()
    public readonly id: number;

    @CreateDateColumn({
        name: 'created_at',
        transformer: transformer.parseTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public createdAt: Dayjs;

    @UpdateDateColumn({
        name: 'updated_at',
        transformer: transformer.parseTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public updatedAt: Dayjs;
}
