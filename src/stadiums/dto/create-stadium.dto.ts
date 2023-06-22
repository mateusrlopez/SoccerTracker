import { IsNotEmpty, IsPositive } from 'class-validator';

export interface ICreateStadium {
    name: string;
    country: string;
    capacity: number;
    foundationDate: Date;
}

export class CreateStadiumDto implements ICreateStadium {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    @IsPositive()
    capacity: number;

    @IsNotEmpty()
    foundationDate: Date;
}
