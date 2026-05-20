import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class ObjectIdentifier extends AbsBaseDataType {
    mark = 80;
    value = 0;
    parse(byteBuf) {
        this.value = byteBuf.readUInt16BE();
    }
    static parse(byteBuf) {
        const oi = new ObjectIdentifier();
        oi.parse(byteBuf);
        return oi;
    }
}
//# sourceMappingURL=ObjectIdentifier.js.map