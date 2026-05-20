import type IFragment from "../../IFragment.js";
import { ByteBuf } from "../../../domain/ByteBuf.js";
import type PIID from "../../data-type/PIID.js";
import type GetRecord from "./GetRecord.js";
export default class GetRequestRecord implements IFragment {
    readonly piid: PIID;
    readonly getRecord: GetRecord;
    private readonly buf;
    constructor(piid: PIID, getRecord: GetRecord);
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=GetRequestRecord.d.ts.map