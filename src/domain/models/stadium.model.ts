import { BaseModel, IBaseModel } from './base.model';

export interface IStadiumModel extends IBaseModel {
    name: string;
    foudationDate: Date;
    bio: string;
    capacity: number;
    pictureFileKey: string;
}

export class StadiumModel extends BaseModel implements IStadiumModel {
    public name: string;

    public foudationDate: Date;

    public bio: string;

    public capacity: number;

    public pictureFileKey: string;
}
