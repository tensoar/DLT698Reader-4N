import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtLong64 extends AbsBaseDataType<bigint> {
    readonly mark: number;
    value: bigint;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtLong64.d.ts.map