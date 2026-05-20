import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtOctetString extends AbsBaseDataType<string> {
    readonly mark: number;
    value: string;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtOctetString.d.ts.map