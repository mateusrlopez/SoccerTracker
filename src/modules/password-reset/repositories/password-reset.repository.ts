import { DeleteResult, EntityRepository, Repository } from 'typeorm';

import * as date from '@shared/helpers/date.helper';

import { PasswordReset } from '../entities/password-reset.entity';
import { IPasswordReset } from '../interfaces/password-reset.interface';

@EntityRepository(PasswordReset)
export class PasswordResetRepository extends Repository<PasswordReset> {
    public findByUserEmailToken(userEmail: string, token: string): Promise<IPasswordReset> {
        return this.findOne({ userEmail, token });
    }

    public deleteExpiredRequests(): Promise<DeleteResult> {
        return this.createQueryBuilder()
            .delete()
            .where('created_at < :date', { date: date.now().format('YYYY-MM-DD') })
            .execute();
    }
}
