import { NotFoundException } from '@nestjs/common';

import { IUpdateUser } from '@user/interfaces/update-user.interface';

import { mockUserRepository } from '../repositories/user.repository.mock';

export const mockUserService = {
    updateByEmail: jest.fn().mockImplementation((email: string, updateUserDto: IUpdateUser) => {
        const user = mockUserRepository.findByEmail(email);

        if (typeof user === 'undefined') {
            throw new NotFoundException('');
        }

        return mockUserRepository.save({ ...user, updateUserDto });
    }),
};
