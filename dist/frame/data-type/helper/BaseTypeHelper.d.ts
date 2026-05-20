import type { AbsBaseDataType } from "../base/AbsBaseDataType.js";
import { ByteBuf } from "../../../domain/ByteBuf.js";
import type { Class } from "../../../types/index.js";
export default class BaseTypeHelper {
    static decodeOneType<T extends AbsBaseDataType<any>>(buf: ByteBuf): T;
    static matchedType(mark: number): Class<AbsBaseDataType<any>>;
}
//# sourceMappingURL=BaseTypeHelper.d.ts.map