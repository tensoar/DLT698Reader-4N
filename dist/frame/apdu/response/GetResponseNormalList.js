import FrameCodec from "../../codec/FrameCodec.js";
import PIID from "../../data-type/PIID.js";
import ResultNormal from "./domain/ResultNormal.js";
export default class GetResponseNormalList {
    piid;
    resultNormals;
    constructor(piid, resultNormals = []) {
        this.piid = piid;
        this.resultNormals = resultNormals;
    }
    static parse(apduBuf) {
        const piid = PIID.parse(apduBuf);
        const seqLen = FrameCodec.extralContentLength(apduBuf);
        const results = [];
        if (seqLen > 0) {
            for (let i = 0; i < seqLen; i++) {
                results.push(ResultNormal.parse(apduBuf));
            }
        }
        return new GetResponseNormalList(piid, results);
    }
    getResultByOad(oad) {
        return this.resultNormals.find(it => oad.match(it.oad));
    }
}
//# sourceMappingURL=GetResponseNormalList.js.map