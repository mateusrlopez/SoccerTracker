import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { DateHelper } from '@shared/helpers/date.helper';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

import { Position } from '../enums/poisition.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';

@Entity()
export class Player extends BaseEntity {
    @Column()
    public firstName: string;

    @Column()
    public middleName: string;

    @Column()
    public lastName: string;

    @Column()
    public knownby: string;

    @Column({ default: null })
    public pictureURL: string | null;

    @Column()
    public height: number;

    @Column({ default: null })
    public shirtNumber: number | null;

    @Column({ type: 'enum', enum: Position })
    public position: Position;

    @Column({ type: 'enum', enum: PreferredFoot })
    public preferredFoot: PreferredFoot;

    @Column({ default: null })
    public teamId: number | null;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public birthdate: DateTime;

    @Expose()
    public get age(): number {
        return DateHelper.age(this.birthdate);
    }
}
