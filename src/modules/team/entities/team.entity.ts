import { Dayjs } from 'dayjs';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import * as transformer from '@helpers/transformer.helper';

@Entity()
export class Team {
    @PrimaryColumn()
    public readonly id: number;

    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column()
    public initials: string;

    @Column({ name: 'foundation_date', transformer: transformer.parseDate, type: 'date' })
    public foundationDate: Dayjs;

    @Column({ name: 'stadium_id' })
    public stadiumId: number;

    @Column({
        name: 'created_at',
        transformer: transformer.parseTimestamp,
        type: 'timestamp with time zone',
    })
    public readonly createdAt: Dayjs;

    @Column({
        name: 'updated_at',
        transformer: transformer.parseTimestamp,
        type: 'timestamp with time zone',
    })
    public readonly updatedAt: Dayjs;
}
