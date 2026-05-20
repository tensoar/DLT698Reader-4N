import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtDoubleLong extends AbsBaseDataType<number> {
    readonly mark: number;
    value: number;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtDoubleLong.d.ts.map