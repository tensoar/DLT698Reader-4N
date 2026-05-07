import { ByteBuf } from "../../../domain/ByteBuf.js";
import RecordSelectionDesc, {type IRecordSelector } from "../../data-type/RecordSelectionDesc.js";
import type OAD from "../../data-type/OAD.js";
import type RecordColumnSelectionDesc from "../../data-type/RecordColumnSelectionDesc.js";
import type IFragment from "../../IFragment.js";

export default class GetRecord implements IFragment {
    private readonly buf: ByteBuf;
    constructor(readonly oad: OAD, readonly rsd: RecordSelectionDesc<IRecordSelector>, readonly rcsd: RecordColumnSelectionDesc) {
        this.buf = ByteBuf.allocate(4 + rsd.frameBuf.wIndex + rcsd.frameBuf.wIndex);
        this.buf.writeBytesBE(oad.frameBuf);
        this.buf.writeBytesBE(rsd.frameBuf);
        this.buf.writeBytesBE(rcsd.frameBuf);
    }
    get frameBuf(): ByteBuf {
        return this.buf;
    }

}