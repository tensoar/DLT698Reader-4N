import { ByteBuf } from "../../../domain/ByteBuf.js";
import type IFragment from "../../IFragment.js";
import type PIID from "../../data-type/PIID.js";
import type GetRecord from "./GetRecord.js";
import {GetRequestType} from "../../../constant/InProtocol.js";

export default class GetRequestRecordList implements IFragment {
    private readonly buf: ByteBuf;

    constructor(readonly piid: PIID, getRecordList: GetRecord[]) {
        this.buf = ByteBuf.allocate(3 + getRecordList.reduce((sum, item) => sum + item.frameBuf.wIndex, 0));
        this.buf.writeUInt8(GetRequestType.RECORD_LIST.value);
        this.buf.writeBytesBE(piid.frameBuf);
        this.buf.writeUInt8(getRecordList.length);
        for (const getRecord of getRecordList) {
            this.buf.writeBytesBE(getRecord.frameBuf);
        }
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }

}