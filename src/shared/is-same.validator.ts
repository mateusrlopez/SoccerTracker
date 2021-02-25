import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsSameValidator' })
export class IsSameValidator implements ValidatorConstraintInterface {
    public validate(value: any, args?: ValidationArguments): boolean {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];

        return value === relatedValue;
    }

    public defaultMessage(args?: ValidationArguments): string {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];

        return `$property should be equal to ${relatedValue}`;
    }
}

export function IsSame(property: string, validationOptions?: ValidationOptions): Function {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            constraints: [property],
            name: 'IsSame',
            options: validationOptions,
            propertyName,
            target: object.constructor,
            validator: IsSameValidator,
        });
    };
}
