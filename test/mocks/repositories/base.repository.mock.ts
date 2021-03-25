export abstract class BaseRepositoryMock {
    public async createAndSave(): Promise<void> {}

    public async save(): Promise<void> {}

    public async find(): Promise<void> {}

    public async findOne(): Promise<void> {}

    public async remove(): Promise<void> {}
}
