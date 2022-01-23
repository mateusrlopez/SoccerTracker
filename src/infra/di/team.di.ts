export abstract class TeamDITokens {
    public static readonly RepositoryToken: unique symbol = Symbol('TEAM_REPOSITORY');
    public static readonly FileUploaderToken: unique symbol = Symbol('TEAM_FILE_UPLOADER');

    public static readonly CreateUseCaseToken: unique symbol = Symbol('CREATE_TEAM_USE_CASE');
    public static readonly FindByIdUseCaseToken: unique symbol = Symbol('FIND_TEAM_BY_ID_USE_CASE');
    public static readonly FindAllUseCaseToken: unique symbol = Symbol('FIND_ALL_TEAM_USE_CASE');
    public static readonly UpdateByIdUseCaseToken: unique symbol = Symbol('UPDATE_TEAM_BY_ID_USE_CASE');
    public static readonly DeleteByIdUseCaseToken: unique symbol = Symbol('DELETE_TEAM_BY_ID_USE_CASE');
}
