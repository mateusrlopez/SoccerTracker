import { DateTime } from 'luxon';

export abstract class DateHelper {
    public static now(): DateTime {
        return DateTime.now();
    }

    public static age(date: DateTime): number {
        return Math.floor(DateHelper.now().diff(date, 'years').years);
    }

    public static parseFromSQLDate(date: string): DateTime {
        return DateTime.fromSQL(date);
    }

    public static parseFromSQLTimestamp(timestamp: string | undefined): DateTime | undefined {
        return typeof timestamp === 'undefined'
            ? timestamp
            : DateTime.fromJSDate(new Date(timestamp));
    }

    public static parseFromJsDate(date: Date): DateTime {
        return DateTime.fromJSDate(date);
    }
}
