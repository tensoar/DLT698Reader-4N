import PIID from "../../data-type/PIID.js";
import ResultRecord from "./domain/ResultRecord.js";
import FrameCodec from "../../codec/FrameCodec.js";
export default class GetResponseRecordList {
    piid;
    resultRecordList;
    constructor(piid, resultRecordList) {
        this.piid = piid;
        this.resultRecordList = resultRecordList;
    }
    static parse(apduBuf) {
        const piid = PIID.parse(apduBuf);
        const len = FrameCodec.extraContentLength(apduBuf);
        const results = [];
        for (let i = 0; i < len; i++) {
            results.push(ResultRecord.parse(apduBuf));
        }
        return new GetResponseRecordList(piid, results);
    }
}
//# sourceMappingURL=GetResponseRecordList.js.map