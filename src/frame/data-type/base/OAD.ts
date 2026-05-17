import type IFragment from "../../IFragment.js";
import {ByteBuf} from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
import {inspect} from "node:util";

export default class OAD extends AbsBaseDataType<number[]> implements IFragment {
    value: number[] = [];
    readonly mark = 81;
    buf: ByteBuf | null = null;

    get frameBuf(): ByteBuf | null {
        return this.buf;
    }

    match(target: OAD | number[] | string): boolean {
        if (this.buf == null || !target) {
            return false;
        }
        if (typeof target === "string") {
            if (!target || target.length < 1) {
                return false
            }
            return this.buf!.toString('hex', true) === target.toLowerCase();
        } else {
            const tagetVale = target instanceof Array ? target : target.value;
            if (tagetVale.length != 4) {
                return false;
            }
            for (let i = 0; i < tagetVale.length; i++) {
                if (tagetVale[i] !== this.value[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    parse (buf: ByteBuf) {
        return OAD.parse(buf);
    }

    toString() {
        if (this.buf == null) {
            return "";
        }
        return this.buf.toReadableHexString(true, false);
    }

    [inspect.custom]() {
        return this.toString();
    }

    static of(b3: number, b2: number, b1: number, b0: number) {
        const oad = new OAD();
        oad.value = [b3, b2, b1, b0];
        oad.buf = ByteBuf.from(oad.value);
        return oad;
    }

    static parse(buf: ByteBuf) {
        return this.of(buf.readUInt8(), buf.readUInt8(), buf.readUInt8(), buf.readUInt8());
    }

    // 基本参数
    static BasicParam = {
        Address: OAD.of(0x40, 0x01, 0x02, 0x00), // 通信地址
        DateTime: OAD.of(0x40, 0x00, 0x02, 0x00), // 日期时间
        AmmeterNo: OAD.of(0x40, 0x02, 0x02, 0x00), // 表号
        CTRatio: OAD.of(0x40, 0x1C, 0x02, 0x00), // 电流互感器变比
        PTRatio: OAD.of(0x40, 0x1D, 0x02, 0x00), // 电压互感器变比
    }
}