import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsDifferent' })
export class IsDifferent implements ValidatorConstraintInterface {
    public validate(value: any, args?: ValidationArguments): boolean {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];

        return value !== relatedValue;
    }

    public defaultMessage(args?: ValidationArguments): string {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];

        return `$property should be different to ${relatedValue}`;
    }
}
