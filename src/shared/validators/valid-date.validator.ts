import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import * as date from '@shared/helpers/date.helper';

@ValidatorConstraint({ name: 'ValidDate' })
export class ValidDate implements ValidatorConstraintInterface {
    public validate(value: string, validationArguments?: ValidationArguments): boolean {
        const format = validationArguments[0] || 'yyyy-MM-dd';

        return date.validDate(value, format);
    }

    public defaultMessage(): string {
        return 'Invalid date';
    }
}
