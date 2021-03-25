import { DeleteResult, EntityRepository, Repository } from 'typeorm';

import { IRequestPasswordReset } from '@password-reset/interfaces/request-password-reset.interface';
import { DateHelper } from '@shared/helpers/date.helper';

import { PasswordReset } from '../entities/password-reset.entity';
import { IPasswordReset } from '../interfaces/password-reset.interface';

@EntityRepository(PasswordReset)
export class PasswordResetRepository extends Repository<PasswordReset> {
    public createAndSave(createUserDto: IRequestPasswordReset): Promise<IPasswordReset> {
        const entity = this.create(createUserDto);
        return this.save(entity);
    }

    public findByUserEmailAndToken(userEmail: string, token: string): Promise<IPasswordReset> {
        return this.findOne({ userEmail, token });
    }

    public deleteExpiredRequests(): Promise<DeleteResult> {
        return this.createQueryBuilder()
            .delete()
            .where('created_at < :date', { date: DateHelper.now().toFormat('yyyy-MM-dd') })
            .execute();
    }
}
