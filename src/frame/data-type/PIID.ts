import {ByteBuf} from "../../domain/ByteBuf.js";
import type IFragment from "../IFragment.js";

export default class PIID implements IFragment{

    readonly value: number;
    private readonly buf: ByteBuf;
    constructor(readonly priority: number, readonly index: number) {
        this.value = 0;

        this.value |= index & 0x3F;
        this.value |= (priority & 1) << 7;

        this.buf = ByteBuf.from([this.value])
    }

    frameBuf(): ByteBuf {
        return this.buf;
    }


    static parse(piid: number) {
        return new PIID((piid >> 7) & 1, piid & 0x3F,)
    }

    static readonly DEFAULT = new PIID(0, 0);
}