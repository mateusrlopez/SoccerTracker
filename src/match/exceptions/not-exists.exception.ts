import { NotFoundException } from '@nestjs/common';

export class MatchNotExistsException extends NotFoundException {
    constructor(message: string) {
        super(message);
    }
}
