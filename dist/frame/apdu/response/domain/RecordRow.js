import FrameCodec from "../../../codec/FrameCodec.js";
import BaseTypeHelper from "../../../data-type/helper/BaseTypeHelper.js";
export default class RecordRow {
    dataList;
    constructor(dataList = []) {
        this.dataList = dataList;
    }
    static parse(apduBuf, rowLen) {
        // const seqLen = FrameCodec.extralContentLength(apduBuf);
        const list = [];
        for (let i = 0; i < rowLen; i++) {
            list.push(BaseTypeHelper.decodeOneType(apduBuf));
        }
        return new RecordRow(list);
    }
}
//# sourceMappingURL=RecordRow.js.map