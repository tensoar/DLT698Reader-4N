import type IGetResponse from "./IGetResponse.js";
import PIID from "../../data-type/PIID.js";
import ResultRecord from "./domain/ResultRecord.js";
import type { ByteBuf } from "../../../domain/ByteBuf.js";
export default class GetResponseRecord implements IGetResponse {
    readonly piid: PIID;
    readonly resultRecord: ResultRecord;
    constructor(piid: PIID, resultRecord: ResultRecord);
    static parse(apduBuf: ByteBuf): GetResponseRecord;
}
//# sourceMappingURL=GetResponseRecord.d.ts.map