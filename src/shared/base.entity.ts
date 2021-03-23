import { Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import * as transformer from '@shared/helpers/transformer.helper';

export abstract class BaseEntity {
    @PrimaryColumn()
    public readonly id: number;

    @CreateDateColumn({
        transformer: transformer.parseDateTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public createdAt: DateTime;

    @UpdateDateColumn({
        transformer: transformer.parseDateTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public updatedAt: DateTime | null;
}
