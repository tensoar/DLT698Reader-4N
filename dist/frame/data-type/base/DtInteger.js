import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtInteger extends AbsBaseDataType {
    mark = 15;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readInt8();
    }
}
//# sourceMappingURL=DtInteger.js.map