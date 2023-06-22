import { NotFoundException } from '@nestjs/common';

export class StadiumNotExistsException extends NotFoundException {
    constructor(message: string) {
        super(message);
    }
}
