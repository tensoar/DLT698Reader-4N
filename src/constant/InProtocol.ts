import type IBaseEnum from "./IBaseEnum.js"

export class DIR implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly FROM_CLIENT = new DIR(0, "客户机发出");
    static readonly FROM_SERVER = new DIR(1, "服务器发出");
}

export class PRM implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly SERVER_INITIATED = new PRM(0, "服务器发起");
    static readonly CLIENT_INITIATED = new PRM(1, "客户机发起");
}
