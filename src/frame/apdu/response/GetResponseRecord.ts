import type IGetResponse from "./IGetResponse.js";
import PIID from "../../data-type/PIID.js";
import ResultRecord from "./domain/ResultRecord.js";
import type {ByteBuf} from "../../../domain/ByteBuf.js";

export default class GetResponseRecord implements IGetResponse{
    constructor(
        readonly piid: PIID,
        readonly resultRecord: ResultRecord,
    ) {}

    static parse(apduBuf: ByteBuf) {
        const piid = PIID.parse(apduBuf);
        const resultRecord = ResultRecord.parse(apduBuf);
        return new GetResponseRecord(piid, resultRecord);
    }
}