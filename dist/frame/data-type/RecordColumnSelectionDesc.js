import { ByteBuf } from "../../domain/ByteBuf.js";
import OAD from "./base/OAD.js";
export default class RecordColumnSelectionDesc {
    relatedColumOadList;
    buf;
    constructor(relatedColumOadList) {
        this.relatedColumOadList = relatedColumOadList;
        this.buf = ByteBuf.allocate(relatedColumOadList.length + 1);
        this.buf.writeUInt8(relatedColumOadList.length);
        for (const related of relatedColumOadList) {
            this.buf.writeUInt8(0);
            this.buf.writeBytesBE(related.frameBuf);
        }
    }
    static parse(buf) {
        const seqOf = buf.readUInt8();
        if (seqOf < 1) {
            return new RecordColumnSelectionDesc([]);
        }
        const oadList = [];
        for (let i = 0; i < seqOf; i++) {
            buf.readUInt8();
            oadList.push(OAD.parse(buf));
        }
        return new RecordColumnSelectionDesc(oadList);
    }
    get frameBuf() {
        return this.buf;
    }
    get length() {
        return this.relatedColumOadList.length;
    }
}
//# sourceMappingURL=RecordColumnSelectionDesc.js.map