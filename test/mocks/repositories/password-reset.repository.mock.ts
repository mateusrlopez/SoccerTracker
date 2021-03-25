import { BaseRepositoryMock } from './base.repository.mock';

export class PasswordResetRepositoryMock extends BaseRepositoryMock {
    public async findByUserEmailAndToken(): Promise<void> {}

    public async deleteExpiredRequests(): Promise<void> {}
}
