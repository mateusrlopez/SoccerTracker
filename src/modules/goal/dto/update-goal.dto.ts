import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { HalfEnum } from '@shared/enums/half.enum';

import { IUpdateGoal } from '../interfaces/update-goal.interface';

export class UpdateGoalDto implements IUpdateGoal {
    @IsNotEmpty()
    @IsNumber()
    public readonly minute?: number;

    @IsNotEmpty()
    @IsEnum(HalfEnum)
    public readonly half: HalfEnum;

    @IsNotEmpty()
    @IsBoolean()
    public readonly ownGoal?: boolean;

    @IsNotEmpty()
    @IsNumber()
    public readonly scorerId?: number;

    @IsNotEmpty()
    @IsNumber()
    public readonly assistantId?: number;

    @IsNotEmpty()
    @IsNumber()
    public readonly matchId?: number;

    @IsNotEmpty()
    @IsNumber()
    public readonly teamId?: number;
}
