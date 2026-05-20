import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type { AbsBaseDataType } from "../../data-type/base/AbsBaseDataType.js";
import PIID from "../../data-type/PIID.js";
import ResultNormal from "./domain/ResultNormal.js";
import type IGetResponse from "./IGetResponse.js";
import type OAD from "../../data-type/base/OAD.js";
export default class GetResponseNormalList implements IGetResponse {
    readonly piid: PIID;
    readonly resultNormals: ResultNormal<AbsBaseDataType<any>>[];
    constructor(piid: PIID, resultNormals?: ResultNormal<AbsBaseDataType<any>>[]);
    static parse(apduBuf: ByteBuf): GetResponseNormalList;
    getResultByOad(oad: OAD): ResultNormal<AbsBaseDataType<any>> | undefined;
}
//# sourceMappingURL=GetResponseNormalList.d.ts.map