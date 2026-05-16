import type { ByteBuf } from "../../../domain/ByteBuf.js";
import PIID from "../../data-type/PIID.js";
import type AddressField from "../../field/AddressField.js";
import type IGetResponse from "./IGetResponse.js";
import FrameCodec from "../../codec/FrameCodec.js";
import {FrameCheckResult} from "../../../constant/InProtocol.js";
import AResultNormal from "./domain/AResultNormal.js";
import type { IBaseDataType } from "../../data-type/base/IBaseDataType.js";

export default class GetResponseNormal<T extends IBaseDataType<any>> implements IGetResponse {
    private constructor(
        readonly piid: PIID,
        readonly result: AResultNormal<T>
    ) {
    }

    static parse<T extends IBaseDataType<any>>(frameBuf: ByteBuf) {
        const piid = PIID.parse(frameBuf);
        const result = AResultNormal.parse(frameBuf);
        return new GetResponseNormal(piid, result) as GetResponseNormal<T>;
    }

}