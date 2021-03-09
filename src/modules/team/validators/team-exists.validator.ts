import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { TeamService } from '../team.service';

@ValidatorConstraint({ async: true, name: 'TeamExistsValidator' })
@Injectable()
class TeamExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly teamService: TeamService) {}

    public async validate(id: number): Promise<boolean> {
        const team = await this.teamService.findById(id, false);
        return typeof team !== 'undefined';
    }

    public defaultMessage(): string {
        return "Team with id $value doesn't exists";
    }
}

export function TeamExists(validationOptions?: ValidationOptions): Function {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'TeamExists',
            options: validationOptions,
            propertyName,
            target: object.constructor,
            validator: TeamExistsValidator,
        });
    };
}
