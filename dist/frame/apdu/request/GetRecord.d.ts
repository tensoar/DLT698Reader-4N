import { ByteBuf } from "../../../domain/ByteBuf.js";
import RecordSelectionDesc, { type IRecordSelector } from "../../data-type/RecordSelectionDesc.js";
import type OAD from "../../data-type/base/OAD.js";
import type RecordColumnSelectionDesc from "../../data-type/RecordColumnSelectionDesc.js";
import type IFragment from "../../IFragment.js";
export default class GetRecord implements IFragment {
    readonly oad: OAD;
    readonly rsd: RecordSelectionDesc<IRecordSelector>;
    readonly rcsd: RecordColumnSelectionDesc;
    private readonly buf;
    constructor(oad: OAD, rsd: RecordSelectionDesc<IRecordSelector>, rcsd: RecordColumnSelectionDesc);
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=GetRecord.d.ts.map