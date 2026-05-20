import { ByteBuf } from "../../../domain/ByteBuf.js";
import RecordSelectionDesc, {} from "../../data-type/RecordSelectionDesc.js";
export default class GetRecord {
    oad;
    rsd;
    rcsd;
    buf;
    constructor(oad, rsd, rcsd) {
        this.oad = oad;
        this.rsd = rsd;
        this.rcsd = rcsd;
        this.buf = ByteBuf.allocate(4 + rsd.frameBuf.wIndex + rcsd.frameBuf.wIndex);
        this.buf.writeBytesBE(oad.frameBuf);
        this.buf.writeBytesBE(rsd.frameBuf);
        this.buf.writeBytesBE(rcsd.frameBuf);
    }
    get frameBuf() {
        return this.buf;
    }
}
//# sourceMappingURL=GetRecord.js.map