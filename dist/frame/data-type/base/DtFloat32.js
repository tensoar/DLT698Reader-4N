import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtFloat32 extends AbsBaseDataType {
    mark = 23;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readFloatBE();
    }
}
//# sourceMappingURL=DtFloat32.js.map