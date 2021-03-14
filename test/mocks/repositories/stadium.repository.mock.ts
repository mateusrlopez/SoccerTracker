import { stadiumsArray } from '@factories/stadium.factory';
import { IUpdateStadium } from '@stadium/interfaces/update-stadium.interface';

export const mockStadiumRepository = {
    save: jest.fn().mockImplementation((updateStadiumDto: IUpdateStadium) => updateStadiumDto),
    find: jest.fn().mockImplementation(() => stadiumsArray),
    findOne: jest
        .fn()
        .mockImplementation((id: number) => stadiumsArray.find(stadium => stadium.id === id)),
    remove: jest.fn().mockReturnValue(null),
};
