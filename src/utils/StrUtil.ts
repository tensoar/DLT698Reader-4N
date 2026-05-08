
export default class StrUtil {
    static padStart(value: any, maxLen: number, fill: string) {
        return String(value).padStart(maxLen, fill);
    }
}