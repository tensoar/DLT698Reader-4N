import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import type { AbsBaseDataType } from "../../../data-type/base/AbsBaseDataType.js";
export default class GetResult<T extends AbsBaseDataType<any>> {
    readonly resultType: number;
    readonly data: T | null;
    constructor(resultType?: number, data?: T | null);
    static parse<T extends AbsBaseDataType<any>>(apduBuf: ByteBuf): GetResult<T>;
    toReadableString(): string;
}
//# sourceMappingURL=GetResult.d.ts.map