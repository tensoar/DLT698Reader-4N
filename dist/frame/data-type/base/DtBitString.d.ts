import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtBitString extends AbsBaseDataType<number[]> {
    readonly mark: number;
    bitLen: number;
    value: number[];
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtBitString.d.ts.map