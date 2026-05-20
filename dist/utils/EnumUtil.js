export default class EnumUtil {
    static fromValue(e, v) {
        const values = Object.values(e);
        for (const item of values) {
            if (item.value === v) {
                return item;
            }
        }
        throw new Error(`Invalid value ${v} for enum`);
    }
}
//# sourceMappingURL=EnumUtil.js.map