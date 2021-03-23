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
} from '@nestjs/common';

import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { IManager } from './interfaces/manager.interface';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createManagerDto: CreateManagerDto): Promise<IManager> {
        return this.managerService.create(createManagerDto);
    }

    @Get()
    public async findAll(): Promise<IManager[]> {
        return this.managerService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<IManager> {
        return this.managerService.findById(id);
    }

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateManagerDto: UpdateManagerDto
    ): Promise<IManager> {
        return this.managerService.updateById(id, updateManagerDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.managerService.remove(id);
    }
}
