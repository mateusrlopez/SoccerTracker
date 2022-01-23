import { BaseModel, IBaseModel } from './base.model';

export interface ITeamModel extends IBaseModel {
    name: string;
    initials: string;
    foundationDate: Date;
    logoFileKey: string;
    bio: string;
    stadiumId: string;
}

export class TeamModel extends BaseModel implements ITeamModel {
    public name: string;

    public initials: string;

    public foundationDate: Date;

    public logoFileKey: string;

    public bio: string;

    public stadiumId: string;
}
