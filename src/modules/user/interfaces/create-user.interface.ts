export interface ICreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: string;
    photoURL?: string;
    teamId: number;
}
