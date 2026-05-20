import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtInteger extends AbsBaseDataType<number> {
    readonly mark: number;
    value: number;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtInteger.d.ts.map