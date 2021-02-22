export interface IResetPasswordDto {
    email: string;
    token: string;
    password: string;
    passwordConfirmation: string;
}
