import { usersArray } from '@factories/user.factory';
import { IQueryUser } from '@user/interfaces/query-user.interface';
import { IUpdateUser } from '@user/interfaces/update-user.interface';

export const mockUserRepository = {
    save: jest.fn().mockImplementation((updateUserDto: IUpdateUser) => updateUserDto),
    find: jest
        .fn()
        .mockImplementation((queryDto: IQueryUser) =>
            usersArray.filter(user => user.teamId === (queryDto?.teamId || user.teamId))
        ),
    findByEmail: jest
        .fn()
        .mockImplementation((email: string) => usersArray.find(user => user.email === email)),
    findOne: jest.fn().mockImplementation((id: number) => usersArray.find(user => user.id === id)),
    remove: jest.fn().mockReturnValue(null),
};
