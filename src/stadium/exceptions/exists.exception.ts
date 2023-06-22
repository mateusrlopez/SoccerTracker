import { ConflictException } from '@nestjs/common';

export class StadiumExistsException extends ConflictException {
    constructor(message: string) {
        super(message);
    }
}
