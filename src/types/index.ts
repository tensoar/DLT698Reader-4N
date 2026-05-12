
export type EnumValue = string | number | Buffer
export interface Class<T> extends NewableFunction {
    new (...args: any[]): T;
}

export type EnumClass<T> = Function & { prototype: T };