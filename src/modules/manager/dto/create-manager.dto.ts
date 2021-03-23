import { IsDefined, IsNumber, IsString, IsUrl } from 'class-validator';

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
    public birthdate: string;

    @IsNumber()
    public teamId?: number;
}
