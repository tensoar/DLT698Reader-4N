import type IFragment from "../IFragment.js";
import {Buffer} from "node:buffer";

export default class PIID implements IFragment{

    readonly value: number;
    private readonly buf: Buffer;
    constructor(readonly priority: number, readonly index: number) {
        this.value = 0;

        this.value |= index & 0x3F;
        this.value |= (priority & 1) << 7;

        this.buf = Buffer.from([this.value])
    }

    frameBytes(): Buffer {
        return this.buf;
    }


    static parse(piid: number) {
        return new PIID((piid >> 7) & 1, piid & 0x3F,)
    }

    static readonly DEFAULT = new PIID(0, 0);
}