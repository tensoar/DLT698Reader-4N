import { ByteBuf } from "../../../domain/ByteBuf.js";
import type IFragment from "../../IFragment.js";
import type PIID from "../../data-type/PIID.js";
import type OAD from "../../data-type/base/OAD.js";
export default class GetRequestNormalList implements IFragment {
    private readonly buf;
    readonly piid: PIID;
    readonly oadList: OAD[];
    constructor(piid: PIID, oadList: OAD[]);
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=GetRequestNormalList.d.ts.map