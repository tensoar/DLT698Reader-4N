import { ByteBuf } from "../../../domain/ByteBuf.js";
import { GetRequestType } from "../../../constant/InProtocol.js";
export default class GetRequestRecordList {
    piid;
    buf;
    constructor(piid, getRecordList) {
        this.piid = piid;
        this.buf = ByteBuf.allocate(3 + getRecordList.reduce((sum, item) => sum + item.frameBuf.wIndex, 0));
        this.buf.writeUInt8(GetRequestType.RECORD_LIST.value);
        this.buf.writeBytesBE(piid.frameBuf);
        this.buf.writeUInt8(getRecordList.length);
        for (const getRecord of getRecordList) {
            this.buf.writeBytesBE(getRecord.frameBuf);
        }
    }
    get frameBuf() {
        return this.buf;
    }
}
//# sourceMappingURL=GetRequestRecordList.js.map