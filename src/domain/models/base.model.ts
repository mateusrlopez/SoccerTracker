export interface IBaseModel {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class BaseModel implements IBaseModel {
    public id?: string;

    public createdAt?: Date;

    public updatedAt?: Date;
}
