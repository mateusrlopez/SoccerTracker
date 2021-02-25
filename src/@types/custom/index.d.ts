import { Dayjs } from 'dayjs';

declare global {
    namespace Express {
        interface User {
            id: number;
            name: string;
            email: string;
            emailVerified: boolean;
            password: string;
            birthdate: Dayjs;
            age: number;
            photoURL: string | null;
            teamId: number | null;
            admin: true;
            createdAt: Dayjs;
            updatedAt: Dayjs;
        }
    }
}
