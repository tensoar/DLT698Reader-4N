import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import OAD from "../../../data-type/base/OAD.js";
import RecordColumnSelectionDesc from "../../../data-type/RecordColumnSelectionDesc.js";
import RecordRow from "./RecordRow.js";
export default class ResultRecord {
    readonly oad: OAD;
    readonly resultType: number;
    readonly rcsd: RecordColumnSelectionDesc;
    readonly recordRow: RecordRow | null;
    constructor(oad: OAD, resultType: number, rcsd: RecordColumnSelectionDesc, recordRow: RecordRow | null);
    static parse(apduBuf: ByteBuf): ResultRecord;
    getRecordRowItemByColumOAD(oad: OAD): import("../../../data-type/base/AbsBaseDataType.js").AbsBaseDataType<any> | null | undefined;
}
//# sourceMappingURL=ResultRecord.d.ts.map