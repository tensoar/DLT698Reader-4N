import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtBool extends AbsBaseDataType<0 | 1> {
    readonly mark: number;
    value: 0 | 1;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtBool.d.ts.map