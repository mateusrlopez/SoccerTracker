import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateStadiumDto {
    @IsNotEmpty()
    @IsString()
    public readonly name?: string;

    @IsNotEmpty()
    @IsString()
    public readonly knownby?: string;

    @IsNotEmpty()
    @IsString()
    public readonly foundationDate?: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly capacity?: number;

    @IsUrl()
    public readonly pictureURL?: string;
}
