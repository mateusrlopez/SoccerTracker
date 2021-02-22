export interface IUserUpdateDto {
    name?: string;
    password?: string;
    birthdate?: string;
    photoURL?: string | null;
    teamId?: number | null;
}
