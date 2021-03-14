import { Dayjs } from 'dayjs';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import * as transformer from '@shared/helpers/transformer.helper';

@Entity()
export class Team extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column()
    public initials: string;

    @Column()
    public logoURL: string;

    @Column({ transformer: transformer.parseDate, type: 'date' })
    public foundationDate: Dayjs;

    @Column()
    public stadiumId: number;
}
