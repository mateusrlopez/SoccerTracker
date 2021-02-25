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

import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { IStadium } from './interfaces/stadium.interface';
import { StadiumService } from './stadium.service';

@Controller('stadium')
export class StadiumController {
    constructor(private readonly stadiumService: StadiumService) {}

    @Post()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createStadiumDto: CreateStadiumDto): Promise<IStadium> {
        return this.stadiumService.create(createStadiumDto);
    }

    @Get()
    public async findAll(): Promise<IStadium[]> {
        return this.stadiumService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<IStadium> {
        return this.stadiumService.findById(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStadiumDto: UpdateStadiumDto
    ): Promise<IStadium> {
        return this.stadiumService.updateById(id, updateStadiumDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.stadiumService.remove(id);
    }
}
