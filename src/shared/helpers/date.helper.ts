import { DateTime, Settings } from 'luxon';

import { AppConfig } from '@config/app.config';

Settings.defaultZoneName = AppConfig.timezone;

export function now(): DateTime {
    return DateTime.now();
}

export function age(date: DateTime): number {
    return Math.ceil(date.diff(now(), 'years').years);
}

export function validDate(date: string, format: string): boolean {
    return DateTime.fromFormat(date, format).isValid;
}

export function parseFromSQL(date: string): DateTime {
    return DateTime.fromSQL(date);
}

export function parseFromJsDate(date: Date): DateTime {
    return DateTime.fromJSDate(date);
}
