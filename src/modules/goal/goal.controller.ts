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

import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalService } from './goal.service';
import { IGoal } from './interfaces/goal.interface';

@Controller('goals')
export class GoalController {
    constructor(private readonly goalService: GoalService) {}

    @Post()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createGoalDto: CreateGoalDto): Promise<IGoal> {
        return this.goalService.create(createGoalDto);
    }

    @Get()
    public async findAll(): Promise<IGoal[]> {
        return this.goalService.findAll();
    }

    @Get(':id(\\d+)')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<IGoal> {
        return this.goalService.findById(id);
    }

    @Put(':id(\\d+)')
    @UseGuards(AdminGuard)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateGoalDto: UpdateGoalDto
    ): Promise<IGoal> {
        return this.goalService.update(id, updateGoalDto);
    }

    @Delete(':id(\\d+)')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.goalService.remove(id);
    }
}
