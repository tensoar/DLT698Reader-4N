import type IBaseEnum from "../constant/IBaseEnum.js";
import type {Class, EnumClass, EnumValue} from "../types/index.js";

export default class EnumUtil {
    static fromValue<E extends IBaseEnum<EnumValue>>(e: EnumClass<E>, v: EnumValue) {
        const values = Object.values(e) as E[];
        for (const item of values) {
            if (item.value === v) {
                return item;
            }
        }
        throw new Error(`Invalid value ${v} for enum`);
    }
}