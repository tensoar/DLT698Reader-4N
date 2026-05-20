import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtUnsigned extends AbsBaseDataType<number> {
    readonly mark: number;
    value: number;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtUnsigned.d.ts.map