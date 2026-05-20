import OAD from "../../../data-type/base/OAD.js";
import GetResult from "./GetResult.js";
export default class ResultNormal {
    oad;
    result;
    constructor(oad, result) {
        this.oad = oad;
        this.result = result;
    }
    static parse(apduBuf) {
        const oad = OAD.parse(apduBuf);
        const result = GetResult.parse(apduBuf);
        return new ResultNormal(oad, result);
    }
}
//# sourceMappingURL=ResultNormal.js.map