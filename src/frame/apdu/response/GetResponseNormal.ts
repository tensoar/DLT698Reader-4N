import type { ByteBuf } from "../../../domain/ByteBuf.js";
import PIID from "../../data-type/PIID.js";
import type AddressField from "../../field/AddressField.js";
import type IGetResponse from "./IGetResponse.js";
import FrameCodec from "../../codec/FrameCodec.js";
import {FrameCheckResult} from "../../../constant/InProtocol.js";
import ResultNormal from "./domain/ResultNormal.js";
import type { AbsBaseDataType } from "../../data-type/base/AbsBaseDataType.js";

export default class GetResponseNormal<T extends AbsBaseDataType<any>> implements IGetResponse {
    private constructor(
        readonly piid: PIID,
        readonly resultNormal: ResultNormal<T>
    ) {
    }

    static parse<T extends AbsBaseDataType<any>>(frameBuf: ByteBuf) {
        const piid = PIID.parse(frameBuf);
        const result = ResultNormal.parse(frameBuf);
        return new GetResponseNormal(piid, result) as GetResponseNormal<T>;
    }
}