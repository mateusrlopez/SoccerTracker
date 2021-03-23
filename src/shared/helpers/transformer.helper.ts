import { ValueTransformer } from 'typeorm';

import * as date from './date.helper';
import * as hash from './hash.helper';

export const encrypt: ValueTransformer = {
    from: (value: string) => value,
    to: (value: string) => hash.encrypt(value),
};

export const parseDateTimestamp: ValueTransformer = {
    from: (value: string) => date.parseFromSQL(value),
    to: (value: string) => value,
};
