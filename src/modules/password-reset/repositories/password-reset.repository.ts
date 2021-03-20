import { EntityRepository, Repository } from 'typeorm';

import { PasswordReset } from '../entities/password-reset.entity';
import { IPasswordReset } from '../interfaces/password-reset.interface';

@EntityRepository(PasswordReset)
export class PasswordResetRepository extends Repository<PasswordReset> {
    public findByUserEmailToken(userEmail: string, token: string): Promise<IPasswordReset> {
        return this.findOne({ userEmail, token });
    }
}
