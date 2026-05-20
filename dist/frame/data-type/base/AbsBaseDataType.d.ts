import type { ByteBuf } from "../../../domain/ByteBuf.js";
export declare abstract class AbsBaseDataType<T> {
    abstract readonly mark: number;
    abstract value: T;
    abstract parse(byteBuf: ByteBuf): void;
    toReadableString(): string;
}
//# sourceMappingURL=AbsBaseDataType.d.ts.map