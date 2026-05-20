import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtVisibleString extends AbsBaseDataType {
    mark = 10;
    value = "";
    parse(byteBuf) {
        const len = byteBuf.readUInt8();
        if (len < 1) {
            return;
        }
        this.value = byteBuf.readAsciiBE(len);
    }
}
//# sourceMappingURL=DtVisibleString.js.map