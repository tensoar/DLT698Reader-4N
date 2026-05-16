import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import type { IBaseDataType } from "../../../data-type/base/IBaseDataType.js";
import BaseTypeHelper from "../../../data-type/helper/BaseTypeHelper.js";

export default class GetResult<T extends IBaseDataType<any>> {
    constructor(
        readonly dar: number = 0,
        readonly data: T | null = null
    ) {}

    static parse<T extends IBaseDataType<any>>(apduBuf: ByteBuf) {
        const dar = apduBuf.readUInt8();
        console.log(4, apduBuf.toString('hex', false))
        let d: T | null = null;
        if (dar == 1) {
            d = BaseTypeHelper.decodeOneType(apduBuf);
        }
        return new GetResult(dar, d);
    }
}