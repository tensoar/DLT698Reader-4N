import { ByteBuf } from "../../../domain/ByteBuf.js";
import type IFragment from "../../IFragment.js";
import type PIID from "../../data-type/PIID.js";
import type GetRecord from "./GetRecord.js";
export default class GetRequestRecordList implements IFragment {
    readonly piid: PIID;
    private readonly buf;
    constructor(piid: PIID, getRecordList: GetRecord[]);
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=GetRequestRecordList.d.ts.map