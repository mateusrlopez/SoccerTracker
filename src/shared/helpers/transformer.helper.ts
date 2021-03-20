import { ValueTransformer } from 'typeorm';

import * as date from './date.helper';
import * as hash from './hash.helper';

export const encrypt: ValueTransformer = {
    from: (value: string) => value,
    to: (value: string) => hash.encrypt(value),
};

export const parseDate: ValueTransformer = {
    from: (value: string) => date.parse(value, ['YYYY-MM-DD']),
    to: (value: string) => date.format(value, ['YYYY-MM-DD', 'DD/MM/YYYY']),
};

export const parseTimestamp: ValueTransformer = {
    from: (value: string) => date.parse(value, []),
    to: (value: string) => value,
};
