import { AbsBaseDataType } from "./AbsBaseDataType.js";
import BaseTypeHelper from "../helper/BaseTypeHelper.js";
export default class DtStruct extends AbsBaseDataType {
    mark = 2;
    value = [];
    match(mark) {
        return this.mark === mark;
    }
    parse(byteBuf) {
        const seqOf = byteBuf.readUInt8();
        for (let i = 0; i < seqOf; i++) {
            this.value.push(BaseTypeHelper.decodeOneType(byteBuf));
        }
    }
    get seqOf() {
        return this.value.length;
    }
    get frameBuf() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=DtStruct.js.map