import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as relativeTime from "dayjs/plugin/relativeTime";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";

import { appConfig } from "@config/app.config";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

dayjs.tz.setDefault(appConfig.timezone);

export function parse(date: string, parseFormat?: string): dayjs.Dayjs {
    return dayjs(date, parseFormat).tz();
}

export function now(): dayjs.Dayjs {
    return dayjs().tz();
}
