import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import * as transformer from '@shared/helpers/transformer.helper';

@Entity()
export class Stadium extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column()
    public pictureURL: string;

    @Column({ transformer: transformer.parseDateTimestamp, type: 'date' })
    public foundationDate: DateTime;

    @Column()
    public capacity: number;
}
