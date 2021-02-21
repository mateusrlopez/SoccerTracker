export class ResetPasswordDto {
    public readonly email: string;

    public readonly token: string;

    public readonly password: string;

    public readonly passwordConfirmation: string;
}
