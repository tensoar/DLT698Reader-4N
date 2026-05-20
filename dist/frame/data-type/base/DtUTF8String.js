import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtUTF8String extends AbsBaseDataType {
    mark = 12;
    value = "";
    parse(byteBuf) {
        const len = byteBuf.readUInt8();
        if (len < 1) {
            return;
        }
        this.value = byteBuf.readBufferBE(len).toString("utf-8");
    }
}
//# sourceMappingURL=DtUTF8String.js.map