import { BaseRepositoryMock } from './base.repository.mock';

export class UserRepositoryMock extends BaseRepositoryMock {
    public async findByEmail(): Promise<void> {}
}
