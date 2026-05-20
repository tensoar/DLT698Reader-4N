import PIID from "../../data-type/PIID.js";
import ResultRecord from "./domain/ResultRecord.js";
export default class GetResponseRecord {
    piid;
    resultRecord;
    constructor(piid, resultRecord) {
        this.piid = piid;
        this.resultRecord = resultRecord;
    }
    static parse(apduBuf) {
        const piid = PIID.parse(apduBuf);
        const resultRecord = ResultRecord.parse(apduBuf);
        return new GetResponseRecord(piid, resultRecord);
    }
}
//# sourceMappingURL=GetResponseRecord.js.map