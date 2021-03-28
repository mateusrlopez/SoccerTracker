import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { IMatch } from '@match/interfaces/match.interface';
import { BaseEntity } from '@shared/base.entity';

@Entity()
export class Match extends BaseEntity implements IMatch {
    @Column({ type: 'timestamptz' })
    public datetime: DateTime;

    @Column()
    public totalPublic: number;

    @Column()
    public homeTeamId: number;

    @Column()
    public awayTeamId: number;

    @Column()
    public stadiumId: number;
}
