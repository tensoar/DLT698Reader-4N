import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import FrameCodec from "../../../codec/FrameCodec.js";
import OAD from "../../../data-type/base/OAD.js";
import RecordColumnSelectionDesc from "../../../data-type/RecordColumnSelectionDesc.js";
import RecordRow from "./RecordRow.js";

export default class ResultRecord {
    constructor(
        readonly oad: OAD,
        readonly resultType: number,
        readonly rcsd: RecordColumnSelectionDesc,
        readonly recordRow: RecordRow | null,
    ) {}

    static parse(apduBuf: ByteBuf) {
        const oad = OAD.parse(apduBuf);
        const rcds = RecordColumnSelectionDesc.parse(apduBuf);
        const resultType = apduBuf.readUInt8();
        let recordRow: RecordRow | null = null;
        if (resultType == 1) {
            const len = FrameCodec.extraContentLength(apduBuf);
            if (len == 1) {
                recordRow = RecordRow.parse(apduBuf, rcds.length);
            }
        }
        return new ResultRecord(oad, resultType, rcds, recordRow);
    }

    getRecordRowItemByColumOAD(oad: OAD) {
        if (this.recordRow == null) {
            return null;
        }
        const index = this.rcsd.relatedColumOadList.findIndex(it => oad.match(it));
        return this.recordRow.dataList[index];
    }
}