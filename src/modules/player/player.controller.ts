import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';

import { AdminGuard } from '@shared/admin.guard';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
        return this.playerService.create(createPlayerDto);
    }

    @Get()
    public async findAll(): Promise<IPlayer[]> {
        return this.playerService.findAll();
    }

    @Get(':id(\\d+)')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<IPlayer> {
        return this.playerService.findById(id);
    }

    @Put(':id(\\d+)')
    @UseGuards(AdminGuard)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePlayerDto: UpdatePlayerDto
    ): Promise<IPlayer> {
        return this.playerService.updateById(id, updatePlayerDto);
    }

    @Delete(':id(\\d+)')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.playerService.remove(id);
    }
}
