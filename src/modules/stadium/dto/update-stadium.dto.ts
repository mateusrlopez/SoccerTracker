import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';

import { ValidDate } from '@shared/validators/valid-date.validator';

export class UpdateStadiumDto {
    @IsNotEmpty()
    @IsString()
    public readonly name?: string;

    @IsNotEmpty()
    @IsString()
    public readonly knownby?: string;

    @IsNotEmpty()
    @IsString()
    @Validate(ValidDate)
    public readonly foundationDate?: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly capacity?: number;

    @IsUrl()
    public readonly pictureURL?: string;
}
