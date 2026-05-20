import BaseTypeHelper from "../../../data-type/helper/BaseTypeHelper.js";
export default class GetResult {
    resultType;
    data;
    constructor(resultType = 0, data = null) {
        this.resultType = resultType;
        this.data = data;
    }
    static parse(apduBuf) {
        const dar = apduBuf.readUInt8();
        console.log(4, apduBuf.toString('hex', false));
        let d = null;
        if (dar == 1) {
            d = BaseTypeHelper.decodeOneType(apduBuf);
        }
        return new GetResult(dar, d);
    }
    toReadableString() {
        return `resultType: ${this.resultType}, data: ${this.data?.toReadableString()}`;
    }
}
//# sourceMappingURL=GetResult.js.map