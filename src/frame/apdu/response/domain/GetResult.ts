import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import type { AbsBaseDataType } from "../../../data-type/base/AbsBaseDataType.js";
import BaseTypeHelper from "../../../data-type/helper/BaseTypeHelper.js";

export default class GetResult<T extends AbsBaseDataType<any>> {
    constructor(
        readonly resultType: number = 0,
        readonly data: T | null = null
    ) {}

    static parse<T extends AbsBaseDataType<any>>(apduBuf: ByteBuf) {
        const dar = apduBuf.readUInt8();
        let d: T | null = null;
        if (dar == 1) {
            d = BaseTypeHelper.decodeOneType(apduBuf);
        }
        return new GetResult(dar, d);
    }

    toReadableString() {
        return `resultType: ${this.resultType}, data: ${this.data?.toReadableString()}`
    }
}