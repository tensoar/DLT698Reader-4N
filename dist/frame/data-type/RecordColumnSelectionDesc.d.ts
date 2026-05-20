import { ByteBuf } from "../../domain/ByteBuf.js";
import type IFragment from "../IFragment.js";
import OAD from "./base/OAD.js";
export default class RecordColumnSelectionDesc implements IFragment {
    readonly relatedColumOadList: OAD[];
    private readonly buf;
    constructor(relatedColumOadList: OAD[]);
    static parse(buf: ByteBuf): RecordColumnSelectionDesc;
    get frameBuf(): ByteBuf;
    get length(): number;
}
//# sourceMappingURL=RecordColumnSelectionDesc.d.ts.map