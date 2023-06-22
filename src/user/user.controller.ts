import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
    constructor(@Inject('USER_SERVICE') private readonly userService: IUserService) {}

    @Get()
    async findAll(): Promise<Array<UserResponseDto>> {
        const users = await this.userService.findAll();

        return plainToInstance(UserResponseDto, users);
    }

    @Get(':id')
    async findOneById(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.userService.findOneById(id);

        return plainToInstance(UserResponseDto, user);
    }

    @Patch(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserResponseDto> {
        const updated = await this.userService.updateOneById(id, updateUserDto);

        return plainToInstance(UserResponseDto, updated);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeOneById(@Param('id') id: string): Promise<void> {
        await this.userService.removeOneById(id);
    }
}
