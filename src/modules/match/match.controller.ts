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

import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { IMatch } from './interfaces/match.interface';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Post()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createMatchDto: CreateMatchDto): Promise<IMatch> {
        return this.matchService.create(createMatchDto);
    }

    @Get()
    public async findAll(): Promise<IMatch[]> {
        return this.matchService.findAll();
    }

    @Get(':id(\\d+)')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<IMatch> {
        return this.matchService.findById(id);
    }

    @Put(':id(\\d+)')
    @UseGuards(AdminGuard)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMatchDto: UpdateMatchDto
    ): Promise<IMatch> {
        return this.matchService.update(id, updateMatchDto);
    }

    @Delete(':id(\\d+)')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.matchService.remove(id);
    }
}
