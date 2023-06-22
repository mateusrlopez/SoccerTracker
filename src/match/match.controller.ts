import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IMatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchResponseDto } from './dto/match-response.dto';

@Controller('matches')
export class MatchController {
    constructor(@Inject('MATCH_SERVICE') private readonly matchService: IMatchService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createMatchDto: CreateMatchDto): Promise<MatchResponseDto> {
        const match = await this.matchService.create(createMatchDto);

        return plainToInstance(MatchResponseDto, match);
    }

    @Get()
    async findAll(): Promise<Array<MatchResponseDto>> {
        const matches = await this.matchService.findAll();

        return plainToInstance(MatchResponseDto, matches);
    }

    @Get(':id')
    async findOneById(@Param('id') id: string): Promise<MatchResponseDto> {
        const match = await this.matchService.findOneById(id);

        return plainToInstance(MatchResponseDto, match);
    }

    @Patch(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() updateMatchDto: UpdateMatchDto
    ): Promise<MatchResponseDto> {
        const updated = await this.matchService.updateOneById(id, updateMatchDto);

        return plainToInstance(MatchResponseDto, updated);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeOneById(@Param('id') id: string) {
        await this.matchService.removeOneById(id);
    }
}
