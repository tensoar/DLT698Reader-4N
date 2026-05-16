import { ByteBuf } from "../../domain/ByteBuf.js";
import type IFragment from "../IFragment.js";
import OAD from "./base/OAD.js";

export default class RecordColumnSelectionDesc implements IFragment {

    private readonly buf: ByteBuf;
    constructor(readonly relatedColumOadList: OAD[]) {
        this.buf = ByteBuf.allocate(relatedColumOadList.length + 1);
        this.buf.writeUInt8(relatedColumOadList.length);
        for (const related of relatedColumOadList) {
            this.buf.writeUInt8(0);
            this.buf.writeBytesBE(related.frameBuf!);
        }
    }

    static parse(buf: ByteBuf) : RecordColumnSelectionDesc {
        const seqOf = buf.readUInt8();
        if (seqOf < 1) {
            return new RecordColumnSelectionDesc([])
        }
        const oadList: OAD[] = [];
        for (let i = 0; i < seqOf; i++) {
            buf.readUInt8();
            oadList.push(OAD.parse(buf))
        }
        return new RecordColumnSelectionDesc(oadList);
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }

    get seqOf() {
        return this.relatedColumOadList.length;
    }

}