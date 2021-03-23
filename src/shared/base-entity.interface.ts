import { Dayjs } from 'dayjs';

export interface IBaseEntity {
    id: number;
    createdAt: Dayjs;
    updatedAt: Dayjs | null;
}
