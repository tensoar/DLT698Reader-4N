import StrUtil from "./StrUtil.js";

export enum TimeUnit {
    YEAR,
    MONTH,
    WEEK,
    DAY,
    HOUR,
    MINUTE,
    SECOND,
    MILLISECOND,
}

export default class DateUtil {

    static ISO2Date(iso: string): Date {
        return new Date(iso);
    }

    static date2TimeStr(date: Date): string {
        return this.date2Format(date, "HH:mm:ss");
    }


    static date2DateStr(date: Date): string {
        return this.date2Format(date, "yyyy-LL-dd");
    }

    /**
     * 将ts类型时间字符(yyyy-LL-dd HH:mm:ss)串转为Date对象
     * @param ts 时间字符串
     * @returns {Date} Date对象
     */
    static tsStr2Date(ts: string): Date {
        const year = parseInt(ts.substring(0, 4), 10);
        const month = parseInt(ts.substring(5, 7), 10);
        const day = parseInt(ts.substring(8, 10), 10);
        const hour = parseInt(ts.substring(11, 13), 10);
        const minute = parseInt(ts.substring(14, 16), 10);
        const second = parseInt(ts.substring(17, 19), 10);
        return new Date(year, month - 1, day, hour, minute, second);
    }

    /**
     *  根据指定的日期格式形式将日期对象格式化为字符串
     *  年: y 月: L 日: d 时: H 分: m 秒: s
     *
     * @param {Date} date 日期对象
     * @param {string} format 格式表达式
     * @returns {string} 格式化后的字符串
     */
    static date2Format(date: Date, format: string): string {
        if (!date) {
            return "";
        }
        let ret;
        const opt = {
            "y+": date.getFullYear().toString(),
            "L+": (date.getMonth() + 1).toString(),
            "e+": date.getDay().toString(),
            "d+": date.getDate().toString(),
            "H+": date.getHours().toString(),
            "m+": date.getMinutes().toString(),
            "s+": date.getSeconds().toString(),
            "S+": date.getMilliseconds().toString(),
        };
        for (const k in opt) {
            ret = new RegExp("(" + k + ")").exec(format);
            if (ret) {
                format = format.replace(ret[1]!, (ret[1]!.length === 1) ? (opt as any)[k] : ((opt as any)[k].padStart(ret[1]!.length, "0")));
            }
        }
        return format;
    }

    /**
     * 将Date对象格式化为ts格式(yyyy-LL-dd HH:mm:ss)的字符串
     *
     * @param date Date对象
     * @returns {string} ts字符串
     */
    static date2TsStr(date: Date, withMills = false): string {
        return this.date2Format(date, withMills ? 'yyyy-LL-dd HH:mm:ss.SSS' : 'yyyy-LL-dd HH:mm:ss');
    }

    /**
     * 将时间戳ts转化为格式(yyyy年LL月dd日HH时mm分ss秒)的字符串
     *
     * @param ts Date对象
     * @returns {string} ts字符串
     */
    static mills2ChReadableStr(ts: number): string {
        const date = new Date(ts);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        return `${year}年${month}月${day}日${hour}时${minute}分${second}秒`;
    }

    /**
     * 将毫秒时间戳转为Date对象
     *
     * @param {number} mills 毫秒时间戳
     * @returns {Date} 日期
     */
    static mills2Date(mills: number): Date {
        return new Date(mills);
    }

    /**
     * 将日期对象转为毫秒时间戳
     *
     * @param {Date} date Date对象
     * @returns {number} 毫秒时间戳
     */
    static date2Mills(date: Date): number {
        return date.getTime();
    }

    /**
     * 获取当前日期
     *
     * @returns {Date} 当前日期
     */
    static now(): Date {
        return new Date();
    }

    /**
     * 获取当前毫秒时间戳
     *
     * @returns {number} 当前毫秒时间戳
     */
    static currentMills(): number {
        return new Date().getTime();
    }

    /**
     * 执行日期加法,不改变原始日期,返回新的日期
     * @param date 原始日期
     * @param value 要加的日期值
     * @param unit 日期值的单位
     * @returns 新日期
     */
    static plus(date: Date, value: number, unit: TimeUnit) {
        const mills = this.date2Mills(date);
        const newDate = new Date(mills);
        switch (unit) {
            case TimeUnit.YEAR:
                newDate.setFullYear(date.getFullYear() + value);
                break;
            case TimeUnit.MONTH:
                newDate.setMonth(date.getMonth() + value);
                break;
            case TimeUnit.WEEK:
                newDate.setTime(date.getTime() + value * 7 * 24 * 3600 * 1000);
                break;
            case TimeUnit.DAY:
                newDate.setDate(date.getDate() + value);
                break;
            case TimeUnit.HOUR:
                newDate.setHours(date.getHours() + value);
                break;
            case TimeUnit.MINUTE:
                newDate.setMinutes(date.getMinutes() + value);
                break;
            case TimeUnit.SECOND:
                newDate.setSeconds(date.getSeconds() + value);
                break;
            case TimeUnit.MILLISECOND:
                newDate.setMilliseconds(date.getMilliseconds() + value);
                break;
        }
        return newDate;
    }

    static startOfDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }

    static isAfter(preTime: Date, nextDate: Date) {
        return preTime.getTime() > nextDate.getTime();
    }

    static* generateLoadDataTimeIterators(startTime: Date, endTime: Date, loadDataStartMinute: number, loadDataInterval: number) {
        let loadTime = this.nearestLoadDataTime(startTime, loadDataStartMinute, loadDataInterval);
        if (this.isAfter(loadTime, endTime)) {
            throw new Error(`There is no load data time in the time range ...`);
        }
        while (!this.isAfter(loadTime, endTime)) {
            yield loadTime;
            loadTime = this.plus(loadTime, loadDataInterval, TimeUnit.MINUTE);
        }
    }

    static nearestLoadDataTime(date: Date, loadDataStartMinute: number, loadDataInterval: number) {
        let nearestDate = date;
        if (nearestDate.getMinutes() === loadDataStartMinute) {
            return nearestDate;
        }
        while (true) {
            if (nearestDate.getMinutes() === loadDataStartMinute || (nearestDate.getMinutes() % loadDataInterval) === loadDataStartMinute) {
                return new Date(nearestDate.getFullYear(), nearestDate.getMonth(), nearestDate.getDate(), nearestDate.getHours(), nearestDate.getMinutes());
            }
            nearestDate = this.plus(nearestDate, 1, TimeUnit.MINUTE);
        }
    }


    static getFullTimeValueStr(value: number) {
        return value < 10 ? '0' + value : value.toString();
    }

    /**
     * 指定时间内的所有冻结点
     */
    static* generateFreezeDataIteratorByTimeRange(startTime: Date, endTime: Date) {
        let nearestStartFreezeDate = this.nextNearestFreezeDate(startTime);
        while (nearestStartFreezeDate.getTime() <= endTime.getTime()) {
            yield nearestStartFreezeDate;
            nearestStartFreezeDate = this.plus(nearestStartFreezeDate, 15, TimeUnit.MINUTE);
        }
    }

    /**
     * 计算离日期最近的下一个冻结点
     * @param date 日期
     * @returns 离日期最近的下一个冻结点
     */
    static nextNearestFreezeDate(date: Date) {
        let freezeMinute: number;
        let toNextHour = false;
        const stuckOnMinute = date.getSeconds() === 0 && date.getMilliseconds() === 0;
        const minute = date.getMinutes();
        if (stuckOnMinute && minute === 0) {
            freezeMinute = 0;
        } else if ((stuckOnMinute && minute === 15) || minute < 15) {
            freezeMinute = 15;
        } else if ((stuckOnMinute && minute === 30) || minute < 30) {
            freezeMinute = 30;
        } else if ((stuckOnMinute && minute === 45) || minute < 45) {
            freezeMinute = 45;
        } else {
            freezeMinute = 0;
            toNextHour = true;
        }
        const freezeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), freezeMinute, 0, 0);
        return toNextHour ? this.plus(freezeDate, 1, TimeUnit.HOUR) : freezeDate;
    }

    static date2BcdBytesBE(date: Date, schema: 'DATE_TIME' | 'DATE'| 'TIME' | 'DATE_TIME_S') {
        const year = date.getFullYear();
        if (schema === 'DATE_TIME') {
            const milliseconds = date.getMilliseconds();
            return [
               ( year >> 8) & 0xFF,
                year & 0xFF,
                (date.getMonth() + 1),
                date.getDate(),
                date.getDay(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                milliseconds >> 8 & 0xFF,
                milliseconds & 0xFF,
            ];
        } else if (schema === 'DATE') {
            return [
                ( year >> 8) & 0xFF,
                year & 0xFF,
                (date.getMonth() + 1),
                date.getDate(),
                date.getDay(),
            ];
        } else if (schema === 'TIME') {
            return [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            ]
        } else {
            return [
                (year >> 8) & 0xFF,
                year & 0xFF,
                (date.getMonth() + 1),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            ]
        }
    }

    static bcdBytes2DateBE(bytes: number[], schema: 'DATE_TIME' | 'DATE'| 'TIME' | 'DATE_TIME_S') {
        if (schema === 'TIME' && bytes.includes(0xFF)) {
            return null;
        } else {
            if (bytes[0] == 0xFF && bytes[1] == 0xFF) {
                return null;
            }
            for (let i = 2; i < bytes.length; i++) {
                if (bytes[i] == 0xFF) {
                    return null;
                }
            }
        }
        if (!bytes.find(b => b != 0)) {
            return null;
        }
        if (schema === 'DATE_TIME') {
            const year = (bytes[0]! << 8) | bytes[1]!;
            const mills = (bytes[8]! << 8) | bytes[9]!;
            return new Date(year, bytes[2]! - 1, bytes[3], bytes[5]!, bytes[6], bytes[7]!, mills);
        } else if (schema === 'DATE') {
            const year = (bytes[0]! << 8) | bytes[1]!;
            return new Date(year, bytes[2]! - 1, bytes[3]);
        } else if (schema === 'TIME') {
            const now = DateUtil.now();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), bytes[0], bytes[1], bytes[2]);
        } else {
            const year = (bytes[0]! << 8) | bytes[1]!;
            return new Date(year, bytes[2]! - 1, bytes[3], bytes[4], bytes[5], bytes[6]);
        }
    }

    static bcdBytes2DateStrBE(bytes: number[], schema: 'DATE_TIME' | 'DATE'| 'TIME' | 'DATE_TIME_S') {
        if (schema === 'DATE_TIME') {
            const year = (bytes[0]! << 8) | bytes[1]!;
            const mills = (bytes[8]! << 8) | bytes[9]!;
            return `${year == 0 ? "0000" : year}-${StrUtil.padStart(bytes[2]! - 1, 2, '0')}-${StrUtil.padStart(bytes[3]!, 2, '0')}`
                + ` ${StrUtil.padStart(bytes[5]!, 2, '0')}:${StrUtil.padStart(bytes[6]!, 2, '0')}:${StrUtil.padStart(bytes[7]!, 2, '0')}`
                + `.${mills}`
                + ` Week ${bytes[4]}`
        } else if (schema === 'DATE') {
            const year = (bytes[0]! << 8) | bytes[1]!;
            return `${year == 0 ? "0000" : year}-${StrUtil.padStart(bytes[2]! - 1, 2, '0')}-${StrUtil.padStart(bytes[3]!, 2, '0')}`
        } else if (schema === 'TIME') {
            return `${StrUtil.padStart(bytes[0]!, 2, '0')}:${StrUtil.padStart(bytes[1]!, 2, '0')}:${StrUtil.padStart(bytes[2]!, 2, '0')}`
        } else {
            const year = (bytes[0]! << 8) | bytes[1]!;
            return `${year == 0 ? "0000" : year}-${StrUtil.padStart(bytes[2]!, 2, '0')}-${StrUtil.padStart(bytes[3]!, 2, '0')} ${StrUtil.padStart(bytes[4]!, 2, '0')}:${StrUtil.padStart(bytes[5]!, 2, '0')}:${StrUtil.padStart(bytes[6]!, 2, '0')}`

        }
    }
}