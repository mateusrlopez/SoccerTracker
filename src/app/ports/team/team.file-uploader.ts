export interface ITeamFileUploader {
    uploadTeamLogo(teamName: string, data: string): Promise<string>;
}
