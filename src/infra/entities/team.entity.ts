import { plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { ITeamModel, TeamModel } from '@domain/models/team.model';

import { BaseEntity } from './base.entity';

@Entity({ name: 'teams' })
export class TeamEntity extends BaseEntity implements ITeamModel {
    @Column()
    public readonly name: string;

    @Column()
    public readonly initials: string;

    @Column()
    public readonly foundationDate: Date;

    @Column()
    public readonly logoFileKey: string;

    @Column({ type: 'text' })
    public readonly bio: string;

    @Column()
    public readonly stadiumId: string;

    public toModel(): TeamModel {
        return plainToClass(TeamModel, this);
    }
}
