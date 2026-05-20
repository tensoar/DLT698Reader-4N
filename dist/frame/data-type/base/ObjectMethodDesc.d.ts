import { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
import ObjectIdentifier from "./ObjectIdentifier.js";
export default class ObjectMethodDesc extends AbsBaseDataType<string> {
    readonly mark: number;
    value: string;
    oi: ObjectIdentifier;
    methodMark: number;
    operateMode: number;
    parse(byteBuf: ByteBuf): void;
}
//# sourceMappingURL=ObjectMethodDesc.d.ts.map