import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { HalfEnum } from '@shared/enums/half.enum';

import { IGoal } from '../interfaces/goal.interface';

@Entity()
export class Goal extends BaseEntity implements IGoal {
    @Column()
    public minute: number;

    @Column({ type: 'enum', enum: HalfEnum })
    public half: HalfEnum;

    @Column()
    public ownGoal: boolean;

    @Column()
    public scorerId: number;

    @Column()
    public assistantId: number;

    @Column()
    public teamId: number;

    @Column()
    public matchId: number;
}
