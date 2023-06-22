import { ConflictException } from '@nestjs/common';

export class TeamExistsException extends ConflictException {
    constructor(message: string) {
        super(message);
    }
}
