import { Dayjs } from 'dayjs';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import * as transformer from '@shared/helpers/transformer.helper';

@Entity()
export class Stadium extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column({ name: 'picture_url' })
    public pictureURL: string;

    @Column({ name: 'foundation_date', transformer: transformer.parseDate, type: 'date' })
    public foundationDate: Dayjs;

    @Column()
    public capacity: number;
}
