import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtArray<T extends AbsBaseDataType<any>> extends AbsBaseDataType<T[]> {
    readonly mark = 1;
    readonly value: T[];
    match(mark: number): mark is 1;
    parse(byteBuf: ByteBuf): void;
    get seqOf(): number;
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=DtArray.d.ts.map