import * as bcrypt from 'bcrypt';

export class HashHelper {
    private static genSalt(): string {
        return bcrypt.genSaltSync(10);
    }

    public static encrypt(value: any): string {
        return bcrypt.hashSync(value, HashHelper.genSalt());
    }

    public static compare(value: any, encryptedValue: string): boolean {
        return bcrypt.compareSync(value, encryptedValue);
    }
}
