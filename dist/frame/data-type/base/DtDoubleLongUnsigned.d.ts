import { AbsBaseDataType } from "./AbsBaseDataType.js";
import type { ByteBuf } from "../../../domain/ByteBuf.js";
export default class DtDoubleLongUnsigned extends AbsBaseDataType<number> {
    readonly mark: number;
    value: number;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtDoubleLongUnsigned.d.ts.map