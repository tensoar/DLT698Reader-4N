import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtLongUnsigned extends AbsBaseDataType {
    mark = 18;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readUInt16BE();
    }
}
//# sourceMappingURL=DtLongUnsigned.js.map