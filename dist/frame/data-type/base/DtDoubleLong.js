import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtDoubleLong extends AbsBaseDataType {
    mark = 5;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readInt32BE();
    }
}
//# sourceMappingURL=DtDoubleLong.js.map