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
} from "@nestjs/common";

import { UpdateUserDto } from "./dto/update-user.dto";
import { IUser } from "./interfaces/user.interface";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public async index(): Promise<IUser[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    public async find(@Param("id", ParseIntPipe) id: number): Promise<IUser> {
        return this.userService.findById(id);
    }

    @Put(":id")
    public async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<IUser> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async destroy(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.userService.delete(id);
    }
}
