import type PIID from "../../data-type/PIID.js";
import type {IGetRequest} from "./IGetRequest.js";
import type OAD from "../../data-type/OAD.js";
import {Buffer} from "node:buffer";
import {GetRequestType} from "../../../constant/InProtocol.js";

export default class GetRequestNormal implements IGetRequest {
    readonly piid: PIID;
    readonly oad: OAD;
    private readonly buf: Buffer;
    constructor(piid: PIID, oad: OAD) {
        this.piid = piid;
        this.oad = oad;
        this.buf = Buffer.alloc(6)
        let offset = 0;
        this.buf.writeUint8(GetRequestType.NORMAL.value, offset ++);
        this.buf.writeUint8(piid.value, offset ++);
        oad.frameBytes().copy(this.buf, offset);
    }

    frameBytes(): Buffer {
        return this.buf;
    }

}