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

export function format(
    date: string | Date,
    parseTemplates: string[] = undefined,
    formatTemplate = 'YYYY-MM-DD'
): string {
    return dayjs(date, parseTemplates).format(formatTemplate);
}

export function parse(
    date: string | Date,
    parseTemplates: string[] = undefined
): dayjs.Dayjs | null {
    return date ? dayjs(date, parseTemplates).tz() : null;
}

export function now(): dayjs.Dayjs {
    return dayjs().tz();
}
