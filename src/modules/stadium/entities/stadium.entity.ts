import { Dayjs } from 'dayjs';
import { Column, Entity } from 'typeorm';

import * as transformer from '@helpers/transformer.helper';
import { BaseEntity } from '@shared/base.entity';

@Entity()
export class Stadium extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column({ name: 'foundation_date', transformer: transformer.parseDate, type: 'date' })
    public foundationDate: Dayjs;

    @Column()
    public capacity: number;
}
