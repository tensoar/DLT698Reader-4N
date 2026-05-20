import type IBaseEnum from "../constant/IBaseEnum.js";
import type { EnumClass, EnumValue } from "../types/index.js";
export default class EnumUtil {
    static fromValue<E extends IBaseEnum<EnumValue>>(e: EnumClass<E>, v: EnumValue): E;
}
//# sourceMappingURL=EnumUtil.d.ts.map