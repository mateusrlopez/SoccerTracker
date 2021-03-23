import { Expose, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import * as date from '@shared/helpers/date.helper';
import * as transformer from '@shared/helpers/transformer.helper';

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

    @Column()
    public pictureURL: string | null;

    @Column()
    public height: number;

    @Column()
    public shirtNumber: number | null;

    @Column({ type: 'enum', enum: Position })
    public position: Position;

    @Column({ type: 'enum', enum: PreferredFoot })
    public preferredFoot: PreferredFoot;

    @Column()
    public teamId: number;

    @Column({ transformer: transformer.parseDateTimestamp, type: 'date' })
    @Type(() => Date)
    public birthdate: DateTime;

    @Expose()
    public get age(): number {
        return date.age(this.birthdate);
    }
}
