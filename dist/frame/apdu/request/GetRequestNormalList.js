import { ByteBuf } from "../../../domain/ByteBuf.js";
import { GetRequestType } from "../../../constant/InProtocol.js";
export default class GetRequestNormalList {
    buf;
    piid;
    oadList;
    constructor(piid, oadList) {
        this.piid = piid;
        this.oadList = oadList;
        this.buf = ByteBuf.allocate(3 + oadList.length * 4);
        this.buf.writeUInt8(GetRequestType.NORMAL_LIST.value);
        this.buf.writeUInt8(piid.value);
        this.buf.writeUInt8(oadList.length);
        oadList.forEach(oda => this.buf.writeBytesBE(oda.frameBuf));
    }
    get frameBuf() {
        return this.buf;
    }
}
//# sourceMappingURL=GetRequestNormalList.js.map