import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtLong64Unsigned extends AbsBaseDataType {
    mark = 18;
    value = BigInt(0);
    parse(byteBuf) {
        this.value = byteBuf.readUInt64BE();
    }
}
//# sourceMappingURL=DtLong64Unsigned.js.map