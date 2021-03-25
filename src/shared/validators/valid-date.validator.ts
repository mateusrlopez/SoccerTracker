import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DateTime } from 'luxon';

@ValidatorConstraint({ name: 'ValidDate' })
export class ValidDate implements ValidatorConstraintInterface {
    public validate(value: DateTime): boolean {
        return value.isValid;
    }

    public defaultMessage(): string {
        return 'Invalid date';
    }
}
