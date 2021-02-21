import { IsDefined, IsFQDN, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsDefined()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsString()
    public readonly birthdate: string;

    @IsOptional()
    @IsFQDN()
    public readonly photoURL: string | null;

    @IsOptional()
    @IsNumber()
    public readonly teamId: number | null;
}
