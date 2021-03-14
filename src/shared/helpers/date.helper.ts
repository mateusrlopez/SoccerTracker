import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { appConfig } from '@config/app.config';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

dayjs.tz.setDefault(appConfig.timezone);

export function format(date: Date, template: string): string {
    return dayjs(date).format(template);
}

export function parse(date: string, ...parseFormat: string[]): dayjs.Dayjs {
    return dayjs(date, parseFormat).tz();
}

export function now(): dayjs.Dayjs {
    return dayjs().tz();
}
