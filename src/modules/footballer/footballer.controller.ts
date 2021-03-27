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

import { CreateFootballerDto } from './dto/create-footballer.dto';
import { UpdateFootballerDto } from './dto/update-footballer.dto';
import { FootballerService } from './footballer.service';
import { IFootballer } from './interfaces/footballer.interface';

@Controller('footballer')
export class FootballerController {
    constructor(private readonly footballerService: FootballerService) {}

    @Post()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createFootballerDto: CreateFootballerDto): Promise<IFootballer> {
        return this.footballerService.create(createFootballerDto);
    }

    @Get()
    public async findAll(): Promise<IFootballer[]> {
        return this.footballerService.findAll();
    }

    @Get(':id(\\d+)')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<IFootballer> {
        return this.footballerService.findById(id);
    }

    @Put(':id(\\d+)')
    @UseGuards(AdminGuard)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFootballerDto: UpdateFootballerDto
    ): Promise<IFootballer> {
        return this.footballerService.updateById(id, updateFootballerDto);
    }

    @Delete(':id(\\d+)')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.footballerService.remove(id);
    }
}
