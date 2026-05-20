import PIID from "../../data-type/PIID.js";
import FrameCodec from "../../codec/FrameCodec.js";
import { FrameCheckResult } from "../../../constant/InProtocol.js";
import ResultNormal from "./domain/ResultNormal.js";
export default class GetResponseNormal {
    piid;
    resultNormal;
    constructor(piid, resultNormal) {
        this.piid = piid;
        this.resultNormal = resultNormal;
    }
    static parse(frameBuf) {
        const piid = PIID.parse(frameBuf);
        const result = ResultNormal.parse(frameBuf);
        return new GetResponseNormal(piid, result);
    }
}
//# sourceMappingURL=GetResponseNormal.js.map