export declare enum TimeUnit {
    YEAR = 0,
    MONTH = 1,
    WEEK = 2,
    DAY = 3,
    HOUR = 4,
    MINUTE = 5,
    SECOND = 6,
    MILLISECOND = 7
}
export default class DateUtil {
    static ISO2Date(iso: string): Date;
    static date2TimeStr(date: Date): string;
    static date2DateStr(date: Date): string;
    /**
     * 将ts类型时间字符(yyyy-LL-dd HH:mm:ss)串转为Date对象
     * @param ts 时间字符串
     * @returns {Date} Date对象
     */
    static tsStr2Date(ts: string): Date;
    /**
     *  根据指定的日期格式形式将日期对象格式化为字符串
     *  年: y 月: L 日: d 时: H 分: m 秒: s
     *
     * @param {Date} date 日期对象
     * @param {string} format 格式表达式
     * @returns {string} 格式化后的字符串
     */
    static date2Format(date: Date, format: string): string;
    /**
     * 将Date对象格式化为ts格式(yyyy-LL-dd HH:mm:ss)的字符串
     *
     * @param date Date对象
     * @returns {string} ts字符串
     */
    static date2TsStr(date: Date, withMills?: boolean): string;
    /**
     * 将时间戳ts转化为格式(yyyy年LL月dd日HH时mm分ss秒)的字符串
     *
     * @param ts Date对象
     * @returns {string} ts字符串
     */
    static mills2ChReadableStr(ts: number): string;
    /**
     * 将毫秒时间戳转为Date对象
     *
     * @param {number} mills 毫秒时间戳
     * @returns {Date} 日期
     */
    static mills2Date(mills: number): Date;
    /**
     * 将日期对象转为毫秒时间戳
     *
     * @param {Date} date Date对象
     * @returns {number} 毫秒时间戳
     */
    static date2Mills(date: Date): number;
    /**
     * 获取当前日期
     *
     * @returns {Date} 当前日期
     */
    static now(): Date;
    /**
     * 获取当前毫秒时间戳
     *
     * @returns {number} 当前毫秒时间戳
     */
    static currentMills(): number;
    /**
     * 执行日期加法,不改变原始日期,返回新的日期
     * @param date 原始日期
     * @param value 要加的日期值
     * @param unit 日期值的单位
     * @returns 新日期
     */
    static plus(date: Date, value: number, unit: TimeUnit): Date;
    static startOfDay(date: Date): Date;
    static isAfter(preTime: Date, nextDate: Date): boolean;
    static generateLoadDataTimeIterators(startTime: Date, endTime: Date, loadDataStartMinute: number, loadDataInterval: number): Generator<Date, void, unknown>;
    static nearestLoadDataTime(date: Date, loadDataStartMinute: number, loadDataInterval: number): Date;
    static getFullTimeValueStr(value: number): string;
    /**
     * 指定时间内的所有冻结点
     */
    static generateFreezeDataIteratorByTimeRange(startTime: Date, endTime: Date): Generator<Date, void, unknown>;
    /**
     * 计算离日期最近的下一个冻结点
     * @param date 日期
     * @returns 离日期最近的下一个冻结点
     */
    static nextNearestFreezeDate(date: Date): Date;
    static date2BcdBytesBE(date: Date, schema: 'DATE_TIME' | 'DATE' | 'TIME' | 'DATE_TIME_S'): number[];
    static bcdBytes2DateBE(bytes: number[], schema: 'DATE_TIME' | 'DATE' | 'TIME' | 'DATE_TIME_S'): Date | null;
    static bcdBytes2DateStrBE(bytes: number[], schema: 'DATE_TIME' | 'DATE' | 'TIME' | 'DATE_TIME_S'): string;
}
//# sourceMappingURL=DateUtil.d.ts.map