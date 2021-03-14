import { teamsArray } from '@factories/team.factory';
import { IUpdateTeam } from '@team/interfaces/update-team.interface';

export const mockTeamRepository = {
    save: jest.fn().mockImplementation((updateTeamDto: IUpdateTeam) => updateTeamDto),
    find: jest.fn().mockImplementation(() => teamsArray),
    findOne: jest.fn().mockImplementation((id: number) => teamsArray.find(team => team.id === id)),
    remove: jest.fn().mockReturnValue(null),
};
