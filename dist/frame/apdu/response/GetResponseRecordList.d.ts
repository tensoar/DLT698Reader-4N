import PIID from "../../data-type/PIID.js";
import type IGetResponse from "./IGetResponse.js";
import ResultRecord from "./domain/ResultRecord.js";
import type { ByteBuf } from "../../../domain/ByteBuf.js";
export default class GetResponseRecordList implements IGetResponse {
    readonly piid: PIID;
    readonly resultRecordList: ResultRecord[];
    constructor(piid: PIID, resultRecordList: ResultRecord[]);
    static parse(apduBuf: ByteBuf): GetResponseRecordList;
}
//# sourceMappingURL=GetResponseRecordList.d.ts.map