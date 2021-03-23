import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';

import { ValidDate } from '@shared/validators/valid-date.validator';

export class CreateStadiumDto {
    @IsDefined()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsString()
    public readonly knownby: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Validate(ValidDate)
    public readonly foundationDate: string;

    @IsDefined()
    @IsNumber()
    public readonly capacity: number;

    @IsUrl()
    public readonly pictureURL?: string;
}
