import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtUnsigned extends AbsBaseDataType {
    mark = 17;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readUInt8();
    }
}
//# sourceMappingURL=DtUnsigned.js.map