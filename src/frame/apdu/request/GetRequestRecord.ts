import type OAD from "../../data-type/OAD.js";
import type RecordSelectionDesc from "../../data-type/RecordSelectionDesc.js";
import type { IRecordSelector } from "../../data-type/RecordSelectionDesc.js";
import type RecordColumnSelectionDesc from "../../data-type/RecordColumnSelectionDesc.js";
import type IFragment from "../../IFragment.js";
import { ByteBuf } from "../../../domain/ByteBuf.js";
import type PIID from "../../data-type/PIID.js";
import {GetRequestType} from "../../../constant/InProtocol.js";
import type GetRecord from "./GetRecord.js";

export default class GetRequestRecord implements IFragment {
    private readonly buf: ByteBuf;

    constructor(readonly piid: PIID, readonly getRecord: GetRecord) {
        this.buf = ByteBuf.allocate(2 + getRecord.frameBuf.wIndex);
        this.buf.writeUInt8(GetRequestType.RECORD.value);
        this.buf.writeBytesBE(piid.frameBuf)
        this.buf.writeBytesBE(getRecord.frameBuf);
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }
}