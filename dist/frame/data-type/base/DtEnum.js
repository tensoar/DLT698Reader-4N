import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtEnum extends AbsBaseDataType {
    mark = 22;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readUInt8();
    }
}
//# sourceMappingURL=DtEnum.js.map