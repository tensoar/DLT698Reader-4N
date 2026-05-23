import type { ByteBuf } from "../../../domain/ByteBuf.js";
import FrameCodec from "../../codec/FrameCodec.js";
import type { AbsBaseDataType } from "../../data-type/base/AbsBaseDataType.js";
import PIID from "../../data-type/PIID.js";
import ResultNormal from "./domain/ResultNormal.js";
import type IGetResponse from "./IGetResponse.js";
import type OAD from "../../data-type/base/OAD.js";

export default class GetResponseNormalList implements IGetResponse {
    constructor(
        readonly piid: PIID,
        readonly resultNormals: ResultNormal<AbsBaseDataType<any>>[] = []
    ) {}

    static parse(apduBuf: ByteBuf) {
        const piid = PIID.parse(apduBuf);
        const seqLen = FrameCodec.extraContentLength(apduBuf);
        const results: ResultNormal<AbsBaseDataType<any>>[] = [];
        if (seqLen > 0) {
            for (let i = 0; i < seqLen; i ++) {
                results.push(ResultNormal.parse(apduBuf));
            }
        }
        return new GetResponseNormalList(piid, results);
    }

    getResultByOad(oad: OAD) {
        return this.resultNormals.find(it => oad.match(it.oad))
    }
}