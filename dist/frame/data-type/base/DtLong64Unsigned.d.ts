import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtLong64Unsigned extends AbsBaseDataType<bigint> {
    readonly mark: number;
    value: bigint;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtLong64Unsigned.d.ts.map