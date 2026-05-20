import type PIID from "../../data-type/PIID.js";
import type { IGetRequest } from "./IGetRequest.js";
import type OAD from "../../data-type/base/OAD.js";
import { ByteBuf } from "../../../domain/ByteBuf.js";
export default class GetRequestNormal implements IGetRequest {
    readonly piid: PIID;
    readonly oad: OAD;
    private readonly buf;
    constructor(piid: PIID, oad: OAD);
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=GetRequestNormal.d.ts.map