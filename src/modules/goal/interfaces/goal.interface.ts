import { IBaseEntity } from '@shared/base-entity.interface';
import { HalfEnum } from '@shared/enums/half.enum';

export interface IGoal extends IBaseEntity {
    minute: number;
    half: HalfEnum;
    ownGoal: boolean;
    scorerId: number;
    assistantId: number;
    matchId: number;
    teamId: number;
}
