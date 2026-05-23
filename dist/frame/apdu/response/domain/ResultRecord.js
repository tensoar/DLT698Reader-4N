import FrameCodec from "../../../codec/FrameCodec.js";
import OAD from "../../../data-type/base/OAD.js";
import RecordColumnSelectionDesc from "../../../data-type/RecordColumnSelectionDesc.js";
import RecordRow from "./RecordRow.js";
export default class ResultRecord {
    oad;
    resultType;
    rcsd;
    recordRow;
    constructor(oad, resultType, rcsd, recordRow) {
        this.oad = oad;
        this.resultType = resultType;
        this.rcsd = rcsd;
        this.recordRow = recordRow;
    }
    static parse(apduBuf) {
        const oad = OAD.parse(apduBuf);
        const rcds = RecordColumnSelectionDesc.parse(apduBuf);
        const resultType = apduBuf.readUInt8();
        let recordRow = null;
        if (resultType == 1) {
            const len = FrameCodec.extraContentLength(apduBuf);
            if (len == 1) {
                recordRow = RecordRow.parse(apduBuf, rcds.length);
            }
        }
        return new ResultRecord(oad, resultType, rcds, recordRow);
    }
    getRecordRowItemByColumOAD(oad) {
        if (this.recordRow == null) {
            return null;
        }
        const index = this.rcsd.relatedColumOadList.findIndex(it => oad.match(it));
        return this.recordRow.dataList[index];
    }
}
//# sourceMappingURL=ResultRecord.js.map