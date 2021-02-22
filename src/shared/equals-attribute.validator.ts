import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "EqualsAttribute" })
export class EqualsAttribute implements ValidatorConstraintInterface {
    public validate(value: any, validationArguments?: ValidationArguments): boolean {
        const comparedAttributeKey = validationArguments.constraints[0];
        const comparedAttribute = validationArguments.object[comparedAttributeKey];

        return value === comparedAttribute;
    }

    public defaultMessage(validationArguments?: ValidationArguments): string {
        const comparedAttributeKey = validationArguments.constraints[0];
        const comparedAttribute = validationArguments.object[comparedAttributeKey];

        return `$property should be equal to ${comparedAttribute}`;
    }
}
