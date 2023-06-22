import { NotFoundException } from '@nestjs/common';

export class UserNotExistsException extends NotFoundException {
    constructor(message: string) {
        super(message);
    }
}
