import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import type { AbsBaseDataType } from "../../../data-type/base/AbsBaseDataType.js";
export default class RecordRow {
    readonly dataList: AbsBaseDataType<any>[];
    constructor(dataList?: AbsBaseDataType<any>[]);
    static parse(apduBuf: ByteBuf, rowLen: number): RecordRow;
}
//# sourceMappingURL=RecordRow.d.ts.map