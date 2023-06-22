import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IStadiumService } from './stadium.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { StadiumResponseDto } from './dto/stadium-response.dto';

@Controller('stadiums')
export class StadiumController {
    constructor(@Inject('STADIUM_SERVICE') private readonly stadiumService: IStadiumService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createStadiumDto: CreateStadiumDto): Promise<StadiumResponseDto> {
        const stadium = await this.stadiumService.create(createStadiumDto);

        return plainToInstance(StadiumResponseDto, stadium);
    }

    @Get()
    async findAll(): Promise<Array<StadiumResponseDto>> {
        const stadiums = await this.stadiumService.findAll();

        return plainToInstance(StadiumResponseDto, stadiums);
    }

    @Get(':id')
    async findOneById(@Param('id') id: string): Promise<StadiumResponseDto> {
        const stadium = await this.stadiumService.findOneById(id);

        return plainToInstance(StadiumResponseDto, stadium);
    }

    @Patch(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() updateStadiumDto: UpdateStadiumDto
    ): Promise<StadiumResponseDto> {
        const updated = await this.stadiumService.updateOneById(id, updateStadiumDto);

        return plainToInstance(StadiumResponseDto, updated);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeOneById(@Param('id') id: string): Promise<void> {
        await this.stadiumService.removeOneById(id);
    }
}
