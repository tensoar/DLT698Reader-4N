import type IFragment from "../IFragment.js";
import {Buffer} from "node:buffer";
import {ByteBuf} from "../../domain/ByteBuf.js";

export default class OAD implements IFragment {
    readonly value: number[];
    private readonly buf: ByteBuf;
    constructor(
        readonly oi: number[],
        readonly property: number[],
    ) {
        if (!oi || !property || oi.length != 2 || property.length !=2) {
            throw new Error(`Invalid value for OAD, oi and property must be byte array of length 2.`);
        }
        this.value = [...oi, ...property];
        this.buf = ByteBuf.from(this.value);
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }

    match(target: OAD | number[] | string): boolean {
        if (typeof target === "string") {
            if (!target || target.length < 1) {
                return false
            }
            return this.buf.toString('hex', true) === target.toLowerCase();
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

    static of(b3: number, b2: number, b1: number, b0: number) {
        return new OAD([b3, b2], [b1, b0]);
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