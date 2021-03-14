import { Type } from 'class-transformer';
import { Dayjs } from 'dayjs';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import * as transformer from '@shared/helpers/transformer.helper';

export abstract class BaseEntity {
    @PrimaryColumn()
    public readonly id: number;

    @CreateDateColumn({
        transformer: transformer.parseTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public createdAt: Dayjs;

    @UpdateDateColumn({
        transformer: transformer.parseTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public updatedAt: Dayjs | null;
}
