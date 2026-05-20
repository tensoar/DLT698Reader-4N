import { ByteBuf } from "../../../domain/ByteBuf.js";
import { GetRequestType } from "../../../constant/InProtocol.js";
export default class GetRequestRecord {
    piid;
    getRecord;
    buf;
    constructor(piid, getRecord) {
        this.piid = piid;
        this.getRecord = getRecord;
        this.buf = ByteBuf.allocate(2 + getRecord.frameBuf.wIndex);
        this.buf.writeUInt8(GetRequestType.RECORD.value);
        this.buf.writeBytesBE(piid.frameBuf);
        this.buf.writeBytesBE(getRecord.frameBuf);
    }
    get frameBuf() {
        return this.buf;
    }
}
//# sourceMappingURL=GetRequestRecord.js.map