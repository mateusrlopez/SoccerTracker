import { DateTime } from 'luxon';
import { ValueTransformer } from 'typeorm';

import { AppConfig } from '@config/app.config';

import { DateHelper } from './date.helper';
import { HashHelper } from './hash.helper';

export class TransformerHelper {
    public static readonly encrypt: ValueTransformer = {
        from: (value: string) => value,
        to: (value: string) => HashHelper.encrypt(value),
    };

    public static readonly parseDate: ValueTransformer = {
        from: (value: string) => DateHelper.parseFromSQLDate(value),
        to: (value: DateTime) => value.toFormat('yyyy-MM-dd'),
    };

    public static readonly parseGeneratedTimestamp: ValueTransformer = {
        from: (value: string) =>
            DateHelper.parseFromSQLTimestamp(value)?.setZone(AppConfig.timezone),
        to: (value: string) =>
            DateHelper.parseFromSQLTimestamp(value)?.toFormat('yyyy-MM-dd HH:mm:ss z'),
    };
}
