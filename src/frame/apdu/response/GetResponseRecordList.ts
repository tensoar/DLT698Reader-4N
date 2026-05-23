import PIID from "../../data-type/PIID.js";
import type IGetResponse from "./IGetResponse.js";
import ResultRecord from "./domain/ResultRecord.js";
import type {ByteBuf} from "../../../domain/ByteBuf.js";
import FrameCodec from "../../codec/FrameCodec.js";

export default class GetResponseRecordList implements IGetResponse {
    constructor(
        readonly piid: PIID,
        readonly resultRecordList: ResultRecord[]
    ) {}

    static parse(apduBuf: ByteBuf) {
        const piid = PIID.parse(apduBuf);
        const len = FrameCodec.extraContentLength(apduBuf);
        const results: ResultRecord[] = [];
        for (let i = 0; i < len; i++) {
            results.push(ResultRecord.parse(apduBuf));
        }
        return new GetResponseRecordList(piid, results);
    }
}