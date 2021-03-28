import * as bcrypt from 'bcrypt';

export class HashHelper {
    private static saltRounds = 10;

    private static regexp = new RegExp(`^\\$2[aby]?\\$${HashHelper.saltRounds}\\$.{53}$`);

    private static genSalt(): string {
        return bcrypt.genSaltSync(HashHelper.saltRounds);
    }

    public static encrypt(value: any): string {
        return !HashHelper.regexp.test(value)
            ? bcrypt.hashSync(value, HashHelper.genSalt())
            : value;
    }

    public static compare(value: any, encryptedValue: string): boolean {
        return bcrypt.compareSync(value, encryptedValue);
    }
}
