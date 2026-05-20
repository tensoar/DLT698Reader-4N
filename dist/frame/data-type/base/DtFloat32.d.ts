import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtFloat32 extends AbsBaseDataType<number> {
    readonly mark: number;
    value: number;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtFloat32.d.ts.map