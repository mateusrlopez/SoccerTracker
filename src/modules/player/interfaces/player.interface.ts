import { Dayjs } from 'dayjs';

export interface IPlayer {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    knownby: string;
    pictureURL: string | null;
    height: number;
    birthdate: Dayjs;
    age: number;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
