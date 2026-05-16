import type PIID from "../../data-type/PIID.js";
import type {IGetRequest} from "./IGetRequest.js";
import type OAD from "../../data-type/base/OAD.js";
import {GetRequestType} from "../../../constant/InProtocol.js";
import {ByteBuf} from "../../../domain/ByteBuf.js";

export default class GetRequestNormal implements IGetRequest {
    readonly piid: PIID;
    readonly oad: OAD;
    private readonly buf: ByteBuf;
    constructor(piid: PIID, oad: OAD) {
        this.piid = piid;
        this.oad = oad;
        this.buf = ByteBuf.allocate(6)
        this.buf.writeUInt8(GetRequestType.NORMAL.value);
        this.buf.writeUInt8(piid.value);
        this.buf.writeBytesBE(oad.frameBuf!);
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }

}