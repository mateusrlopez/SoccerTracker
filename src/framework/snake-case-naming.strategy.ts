import { snakeCase } from 'change-case';
import { plural } from 'pluralize';
import { DefaultNamingStrategy } from 'typeorm';

export class SnakeCaseNamingStrategy extends DefaultNamingStrategy {
    public tableName(targetName: string, userSpecifiedName: string | undefined): string {
        return userSpecifiedName || snakeCase(plural(targetName));
    }

    public columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        return snakeCase(embeddedPrefixes.concat('').join('_')) + (customName || snakeCase(propertyName));
    }

    public joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName).concat('_', referencedColumnName);
    }
}
