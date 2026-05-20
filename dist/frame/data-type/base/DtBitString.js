import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtBitString extends AbsBaseDataType {
    mark = 4;
    bitLen = 0;
    value = [];
    parse(byteBuf) {
        this.bitLen = byteBuf.readUInt8();
        const byteLen = Math.ceil(this.bitLen / 8);
        this.value = byteBuf.readBytesBE(byteLen);
    }
}
//# sourceMappingURL=DtBitString.js.map