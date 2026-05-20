import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtLong extends AbsBaseDataType {
    mark = 16;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readInt16BE();
    }
}
//# sourceMappingURL=DtLong.js.map