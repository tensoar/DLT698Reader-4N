import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class ObjectIdentifier extends AbsBaseDataType<number> {
    readonly mark = 80;
    value: number;
    parse(byteBuf: ByteBuf): void;
    static parse(byteBuf: ByteBuf): ObjectIdentifier;
}
//# sourceMappingURL=ObjectIdentifier.d.ts.map