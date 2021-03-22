import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateStadiumDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public readonly knownby: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public readonly foundationDate: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    public readonly capacity: number;

    @IsUrl()
    public readonly pictureURL?: string;
}
