import { ValueTransformer } from "typeorm";

import * as hash from "@helpers/hash.helper";

export const encrypt: ValueTransformer = {
    from: (value: string) => value,
    to: (value: string) => hash.encrypt(value),
};
