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

@Controller()
export class MatchController {
    constructor(@Inject('MATCH_SERVICE') private readonly matchService: IMatchService) {}

    @Post('matches')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createMatchDto: CreateMatchDto): Promise<MatchResponseDto> {
        const match = await this.matchService.create(createMatchDto);

        return plainToInstance(MatchResponseDto, match);
    }

    @Get('matches')
    async findAll(): Promise<Array<MatchResponseDto>> {
        const matches = await this.matchService.findAll();

        return plainToInstance(MatchResponseDto, matches);
    }

    @Get('matches/:id')
    async findOneById(@Param('id') id: string): Promise<MatchResponseDto> {
        const match = await this.matchService.findOneById(id);

        return plainToInstance(MatchResponseDto, match);
    }

    @Patch('matches/:id')
    async updateOneById(
        @Param('id') id: string,
        @Body() updateMatchDto: UpdateMatchDto
    ): Promise<MatchResponseDto> {
        const updated = await this.matchService.updateOneById(id, updateMatchDto);

        return plainToInstance(MatchResponseDto, updated);
    }

    @Delete('matches/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeOneById(@Param('id') id: string): Promise<void> {
        await this.matchService.removeOneById(id);
    }

    @Post('matches/:matchId/users/:userId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async connectOneToUser(
        @Param('matchId') matchId: string,
        @Param('userId') userId: string
    ): Promise<void> {
        await this.matchService.connectOneToUser(matchId, userId);
    }

    @Get('users/:id/matches')
    async retrieveByUser(@Param('id') id: string): Promise<Array<MatchResponseDto>> {
        const matches = await this.matchService.findManyByUser(id);

        return plainToInstance(MatchResponseDto, matches);
    }

    @Delete('matches/:matchId/users/:userId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async disconnectOneToUser(
        @Param('matchId') matchId: string,
        @Param('userId') userId: string
    ): Promise<void> {
        await this.matchService.disconnectOneToUser(matchId, userId);
    }
}
