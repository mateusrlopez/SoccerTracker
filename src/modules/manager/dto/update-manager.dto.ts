import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';

import { ValidDate } from '@shared/validators/valid-date.validator';

export class UpdateManagerDto {
    @IsNotEmpty()
    @IsString()
    public firstName?: string;

    @IsNotEmpty()
    @IsString()
    public middleName?: string;

    @IsNotEmpty()
    @IsString()
    public lastName?: string;

    @IsUrl()
    public pictureURL?: string;

    @IsNotEmpty()
    @IsString()
    @Validate(ValidDate)
    public birthdate?: string;

    @IsNumber()
    public teamId?: number;
}
