import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import type { IBaseDataType } from "../../../data-type/base/IBaseDataType.js";
import OAD from "../../../data-type/base/OAD.js";
import GetResult from "./GetResult.js";

export default class AResultNormal<T extends IBaseDataType<any>> {
    constructor(
        readonly oad: OAD,
        readonly result: GetResult<T>
    ) {}

    static parse(apduBuf: ByteBuf) {
        const oad = OAD.parse(apduBuf);
        const result = GetResult.parse(apduBuf);
        return new AResultNormal(oad, result);
    }
}