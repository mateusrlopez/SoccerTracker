import * as bcrypt from "bcrypt";

export function genSalt(): string {
    return bcrypt.genSaltSync(10);
}

export function encrypt(value: any): string {
    return bcrypt.hashSync(value, genSalt());
}

export function compare(value: any, encryptedValue: string): boolean {
    return bcrypt.compareSync(value, encryptedValue);
}
