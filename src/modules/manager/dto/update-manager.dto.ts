import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

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
    public birthdate?: string;

    @IsNumber()
    public teamId?: number;
}
