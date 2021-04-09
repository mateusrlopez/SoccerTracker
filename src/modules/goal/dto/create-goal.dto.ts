import { IsBoolean, IsDefined, IsEnum, IsNumber } from 'class-validator';

import { HalfEnum } from '@shared/enums/half.enum';

import { ICreateGoal } from '../interfaces/create-goal.interface';

export class CreateGoalDto implements ICreateGoal {
    @IsDefined()
    @IsNumber()
    public readonly minute: number;

    @IsDefined()
    @IsEnum(HalfEnum)
    public readonly half: HalfEnum;

    @IsDefined()
    @IsBoolean()
    public readonly ownGoal: boolean;

    @IsDefined()
    @IsNumber()
    public readonly scorerId: number;

    @IsDefined()
    @IsNumber()
    public readonly assistantId: number;

    @IsDefined()
    @IsNumber()
    public readonly matchId: number;

    @IsDefined()
    @IsNumber()
    public readonly teamId: number;
}
