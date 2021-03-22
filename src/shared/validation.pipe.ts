import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
    public async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value, {
            excludeExtraneousValues: true,
            strategy: 'exposeAll',
        });

        const errors = await validate(object, {
            skipMissingProperties: true,
            stopAtFirstError: true,
        });

        if (errors.length > 0) {
            throw new BadRequestException(errors[0].toString());
        }

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
