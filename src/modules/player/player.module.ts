import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerRepository } from './repositories/player.repository';

@Module({
    controllers: [PlayerController],
    exports: [PlayerService],
    imports: [TypeOrmModule.forFeature([PlayerRepository])],
    providers: [PlayerService],
})
export class PlayerModule {}
