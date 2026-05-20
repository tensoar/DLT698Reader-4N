import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtNull extends AbsBaseDataType<null> {
    readonly mark: number;
    value: null;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=DtNull.d.ts.map