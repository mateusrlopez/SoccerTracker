import { IsDefined, IsNumber, IsString, IsUrl, Validate } from 'class-validator';

import { ValidDate } from '@shared/validators/valid-date.validator';

export class CreateManagerDto {
    @IsDefined()
    @IsString()
    public firstName: string;

    @IsDefined()
    @IsString()
    public middleName: string;

    @IsDefined()
    @IsString()
    public lastName: string;

    @IsUrl()
    public pictureURL?: string;

    @IsDefined()
    @IsString()
    @Validate(ValidDate)
    public birthdate: string;

    @IsNumber()
    public teamId?: number;
}
