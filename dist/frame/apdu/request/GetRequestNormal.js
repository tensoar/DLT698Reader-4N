import { GetRequestType } from "../../../constant/InProtocol.js";
import { ByteBuf } from "../../../domain/ByteBuf.js";
export default class GetRequestNormal {
    piid;
    oad;
    buf;
    constructor(piid, oad) {
        this.piid = piid;
        this.oad = oad;
        this.buf = ByteBuf.allocate(6);
        this.buf.writeUInt8(GetRequestType.NORMAL.value);
        this.buf.writeUInt8(piid.value);
        this.buf.writeBytesBE(oad.frameBuf);
    }
    get frameBuf() {
        return this.buf;
    }
}
//# sourceMappingURL=GetRequestNormal.js.map