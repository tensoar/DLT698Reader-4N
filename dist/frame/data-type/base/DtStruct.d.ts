import type { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtStruct<T extends AbsBaseDataType<any>> extends AbsBaseDataType<T[]> {
    readonly mark = 2;
    readonly value: T[];
    match(mark: number): mark is 2;
    parse(byteBuf: ByteBuf): void;
    get seqOf(): number;
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=DtStruct.d.ts.map