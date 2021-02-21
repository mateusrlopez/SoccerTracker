export function getVariable(key: string): string {
    return process.env[key];
}

export function getNumericVariable(key: string): number {
    return parseInt(getVariable(key), 10);
}

export function getBooleanVariable(key: string): boolean {
    return getVariable(key) === "true";
}

export function getArrayVariable(key: string, delimiter = ","): string[] {
    return getVariable(key).split(delimiter);
}
