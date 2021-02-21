export interface ICreateUserDto {
    name: string;
    email: string;
    password: string;
    birthdate: string;
    photoURL: string | null;
    teamId: number | null;
}
