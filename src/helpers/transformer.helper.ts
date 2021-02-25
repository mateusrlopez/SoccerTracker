import { ValueTransformer } from 'typeorm';

import * as date from '@helpers/date.helper';
import * as hash from '@helpers/hash.helper';

export const encrypt: ValueTransformer = {
    from: (value: string) => value,
    to: (value: string) => hash.encrypt(value),
};

export const parseDate: ValueTransformer = {
    from: (value: string) => date.parse(value),
    to: (value: string) => date.parse(value, 'DD/MM/YYYY').format('YYYY-MM-DD'),
};

export const parseTimestamp: ValueTransformer = {
    from: (value: string) => date.parse(value),
    to: (value: string) => value,
};
