import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtFloat64 extends AbsBaseDataType {
    mark = 24;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readDoubleBE();
    }
}
//# sourceMappingURL=DtFloat64.js.map