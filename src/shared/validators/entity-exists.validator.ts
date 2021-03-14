import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'typeorm';

@ValidatorConstraint({ async: true, name: 'EntityExists' })
@Injectable()
export class EntityExists implements ValidatorConstraintInterface {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    public async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const entity = validationArguments[0];
        const column = validationArguments[1] || 'id';

        const foundEntity = await this.connection
            .getRepository(entity)
            .findOne({ [column]: value });

        return typeof foundEntity !== 'undefined';
    }

    public defaultMessage(): string {
        return 'Entity does not exists';
    }
}
