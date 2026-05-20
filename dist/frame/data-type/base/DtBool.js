import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtBool extends AbsBaseDataType {
    mark = 3;
    value = 0;
    // buf: ByteBuf;
    parse(byteBuf) {
        this.value = byteBuf.readUInt8();
    }
}
//# sourceMappingURL=DtBool.js.map