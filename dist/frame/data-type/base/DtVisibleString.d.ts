import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtVisibleString extends AbsBaseDataType<string> {
    readonly mark: number;
    value: string;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtVisibleString.d.ts.map