import { IsNotEmpty, IsPositive } from 'class-validator';

export interface IUpdateStadium {
    name: string;
    country: string;
    capacity: number;
    foundationDate: Date;
}

export class UpdateStadiumDto implements IUpdateStadium {
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
