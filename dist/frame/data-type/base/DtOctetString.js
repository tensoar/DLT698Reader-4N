import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtOctetString extends AbsBaseDataType {
    mark = 8;
    value = "";
    parse(byteBuf) {
        const len = byteBuf.readUInt8();
        if (len < 1) {
            return;
        }
        this.value = byteBuf.readHexBE(len);
    }
}
//# sourceMappingURL=DtOctetString.js.map