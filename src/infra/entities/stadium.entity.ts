import { plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { IStadiumModel, StadiumModel } from '@domain/models/stadium.model';

import { BaseEntity } from './base.entity';

@Entity({ name: 'stadiums' })
export class StadiumEntity extends BaseEntity implements IStadiumModel {
    @Column()
    public readonly name: string;

    @Column()
    public readonly foudationDate: Date;

    @Column({ type: 'text' })
    public readonly bio: string;

    @Column()
    public readonly capacity: number;

    @Column()
    public readonly pictureFileKey: string;

    public toModel(): StadiumModel {
        return plainToClass(StadiumModel, this);
    }
}
