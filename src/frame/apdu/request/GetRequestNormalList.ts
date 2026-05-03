import { ByteBuf } from "../../../domain/ByteBuf.js";
import type IFragment from "../../IFragment.js";
import type PIID from "../../data-type/PIID.js";
import type OAD from "../../data-type/OAD.js";
import {GetRequestType} from "../../../constant/InProtocol.js";

export default class GetRequestNormalList implements IFragment {
    private readonly buf: ByteBuf;

    readonly piid: PIID;
    readonly oadList: OAD[];

    constructor(piid: PIID, oadList: OAD[]) {
        this.piid = piid;
        this.oadList = oadList;
        this.buf = ByteBuf.allocate(3 + oadList.length * 4);
        this.buf.writeUInt8(GetRequestType.NORMAL_LIST.value)
        this.buf.writeUInt8(piid.value);
        this.buf.writeUInt8(oadList.length);
        oadList.forEach(oda => this.buf.writeBytes(oda.frameBuf))
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }

}