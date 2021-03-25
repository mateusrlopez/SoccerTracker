export abstract class EnvHelper {
    public static getVariable(key: string): string {
        return process.env[key];
    }

    public static getNumericVariable(key: string): number {
        return parseInt(EnvHelper.getVariable(key), 10);
    }

    public static getBooleanVariable(key: string): boolean {
        return EnvHelper.getVariable(key) === 'true';
    }

    public static getArrayVariable(key: string, delimiter = ','): string[] {
        return EnvHelper.getVariable(key).split(delimiter);
    }
}
