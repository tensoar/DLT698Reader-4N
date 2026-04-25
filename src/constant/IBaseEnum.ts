import type { EnumValue } from "../types/index.js";

export default interface IBaseEnum<T extends EnumValue> {
    readonly value: T;
    readonly description: string;
}