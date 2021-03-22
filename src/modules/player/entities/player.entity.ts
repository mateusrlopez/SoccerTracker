import { Expose, Type } from 'class-transformer';
import { Dayjs } from 'dayjs';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { Position } from '@shared/enums/poisition.enum';
import { PreferredFoot } from '@shared/enums/preferred-foot.enum';
import * as date from '@shared/helpers/date.helper';
import * as transformer from '@shared/helpers/transformer.helper';

@Entity()
export class Player extends BaseEntity {
    @PrimaryColumn()
    public readonly id: number;

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

    @Column({ transformer: transformer.parseDate, type: 'date' })
    @Type(() => Date)
    public birthdate: Dayjs;

    @Expose()
    public get age(): number {
        return this.birthdate.diff(date.now(), 'days');
    }
}
