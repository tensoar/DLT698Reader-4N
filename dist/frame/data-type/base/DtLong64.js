import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtLong64 extends AbsBaseDataType {
    mark = 20;
    value = BigInt(0);
    parse(byteBuf) {
        this.value = byteBuf.readInt64BE();
    }
}
//# sourceMappingURL=DtLong64.js.map