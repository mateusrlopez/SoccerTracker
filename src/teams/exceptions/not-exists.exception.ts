import { NotFoundException } from '@nestjs/common';

export class TeamNotExistsException extends NotFoundException {
    constructor(message: string) {
        super(message);
    }
}
