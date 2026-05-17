import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import type { AbsBaseDataType } from "../../../data-type/base/AbsBaseDataType.js";
import OAD from "../../../data-type/base/OAD.js";
import GetResult from "./GetResult.js";

export default class ResultNormal<T extends AbsBaseDataType<any>> {
    constructor(
        readonly oad: OAD,
        readonly result: GetResult<T>
    ) {}

    static parse(apduBuf: ByteBuf) {
        const oad = OAD.parse(apduBuf);
        const result = GetResult.parse(apduBuf);
        return new ResultNormal(oad, result);
    }
}