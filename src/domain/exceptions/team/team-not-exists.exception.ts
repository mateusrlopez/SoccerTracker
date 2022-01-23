import { Exception } from '../common/base.exception';

export class TeamNotExistsException extends Exception {
    public constructor(message: string) {
        super();
        this.message = message;
        this.code = 404;
        this.name = this.constructor.name;
    }
}
