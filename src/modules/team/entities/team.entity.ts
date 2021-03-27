import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

import { ITeam } from '../interfaces/team.interface';

@Entity()
export class Team extends BaseEntity implements ITeam {
    @Column()
    public name: string;

    @Column()
    public knownby: string;

    @Column()
    public initials: string;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public foundationDate: DateTime;

    @Column({ default: null })
    public logoURL: string;

    @Column({ default: null })
    public bio: string;

    @Column()
    public stadiumId: number;
}
