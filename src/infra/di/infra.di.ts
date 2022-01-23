export abstract class InfrastructureDITokens {
    public static readonly DatabaseConnection: unique symbol = Symbol('DATABASE_CONNECTION');
    public static readonly FileStorageClient: unique symbol = Symbol('FILE_STORAGE_CLIENT');
}
