import { IsDefined, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateTeamDto {
    @IsDefined()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsString()
    public readonly knownby: string;

    @IsDefined()
    @IsString()
    @Length(3, 3)
    public readonly initials: string;

    @IsUrl()
    public readonly logoURL?: string;

    @IsDefined()
    @IsString()
    public readonly foundationDate: string;

    @IsDefined()
    @IsNumber()
    public readonly stadiumId: number;
}
