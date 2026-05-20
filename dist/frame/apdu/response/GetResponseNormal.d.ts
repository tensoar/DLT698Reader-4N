import type { ByteBuf } from "../../../domain/ByteBuf.js";
import PIID from "../../data-type/PIID.js";
import type IGetResponse from "./IGetResponse.js";
import ResultNormal from "./domain/ResultNormal.js";
import type { AbsBaseDataType } from "../../data-type/base/AbsBaseDataType.js";
export default class GetResponseNormal<T extends AbsBaseDataType<any>> implements IGetResponse {
    readonly piid: PIID;
    readonly resultNormal: ResultNormal<T>;
    private constructor();
    static parse<T extends AbsBaseDataType<any>>(frameBuf: ByteBuf): GetResponseNormal<T>;
}
//# sourceMappingURL=GetResponseNormal.d.ts.map