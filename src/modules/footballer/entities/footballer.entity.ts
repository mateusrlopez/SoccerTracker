import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { DateHelper } from '@shared/helpers/date.helper';
import { TransformerHelper } from '@shared/helpers/transformer.helper';

import { Function } from '../enums/function.enum';
import { Position } from '../enums/position.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';
import { IFootballer } from '../interfaces/footballer.interface';

@Entity()
export class Footballer extends BaseEntity implements IFootballer {
    @Column()
    public firstName: string;

    @Column()
    public middleName: string;

    @Column()
    public lastName: string;

    @Column()
    public knownby: string;

    @Column({ transformer: TransformerHelper.parseDate, type: 'date' })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd'))
    public birthdate: DateTime;

    @Column()
    public height: number;

    @Column()
    public weight: number;

    @Column({ type: 'enum', enum: Position })
    public position: Position;

    @Column({ type: 'enum', enum: PreferredFoot })
    public preferredFoot: PreferredFoot;

    @Column({ type: 'enum', enum: Function })
    public function: Function;

    @Column({ default: null })
    public pictureURL: string;

    @Column({ default: null })
    public bio: string;

    @Column({ default: null })
    public shirtNumber: number;

    @Column({ default: null })
    public teamId: number;

    @Expose()
    public get age(): number {
        return DateHelper.age(this.birthdate);
    }
}
