import type IBaseEnum from "./IBaseEnum.js";

export class Endian implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly BE = new Endian(1, "大端序");
    static readonly LE = new Endian(2, "小端序");
}