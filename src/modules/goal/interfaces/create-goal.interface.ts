import { HalfEnum } from '@shared/enums/half.enum';

export interface ICreateGoal {
    minute: number;
    half: HalfEnum;
    ownGoal: boolean;
    scorerId: number;
    assistantId: number;
    matchId: number;
    teamId: number;
}
