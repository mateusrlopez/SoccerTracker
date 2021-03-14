import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Put,
    Query,
} from '@nestjs/common';

import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public async findAll(@Query() queryUserDto: QueryUserDto): Promise<IUser[]> {
        return this.userService.findAll(queryUserDto);
    }

    @Get(':id(\\d+)')
    public async find(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
        return this.userService.findById(id);
    }

    @Put(':id(\\d+)')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<IUser> {
        return this.userService.updateById(id, updateUserDto);
    }

    @Delete(':id(\\d+)')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.remove(id);
    }
}
