import { playersArray } from '@factories/player.factory';
import { IUpdatePlayer } from '@player/interfaces/update-player.interface';

export const mockPlayerRepository = {
    save: jest.fn().mockImplementation((updatePlayerDto: IUpdatePlayer) => updatePlayerDto),
    find: jest.fn().mockImplementation(() => playersArray),
    findOne: jest
        .fn()
        .mockImplementation((id: number) => playersArray.find(player => player.id === id)),
    remove: jest.fn().mockReturnValue(null),
};
