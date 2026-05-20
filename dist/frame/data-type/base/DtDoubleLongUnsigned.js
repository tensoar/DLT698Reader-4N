import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtDoubleLongUnsigned extends AbsBaseDataType {
    mark = 6;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readUInt32BE();
    }
}
//# sourceMappingURL=DtDoubleLongUnsigned.js.map