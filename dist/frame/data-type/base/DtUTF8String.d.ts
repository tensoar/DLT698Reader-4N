import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtUTF8String extends AbsBaseDataType<string> {
    readonly mark: number;
    value: string;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtUTF8String.d.ts.map