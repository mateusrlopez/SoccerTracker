import { Dayjs } from 'dayjs';

export interface IStadium {
    id: number;
    name: string;
    knownby: string;
    pictureURL: string;
    foundationDate: Dayjs;
    capacity: number;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
