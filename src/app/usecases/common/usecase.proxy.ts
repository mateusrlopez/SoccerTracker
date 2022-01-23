export class UseCaseProxy<T> {
    constructor(private readonly instance: T) {}

    public getInstance(): T {
        return this.instance;
    }
}
