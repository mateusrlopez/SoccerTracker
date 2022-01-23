import { Exception } from '../common/base.exception';

export class TeamExistsException extends Exception {
    public constructor(message: string) {
        super();
        this.message = message;
        this.code = 400;
        this.name = this.constructor.name;
    }
}
