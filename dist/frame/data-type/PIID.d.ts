import { ByteBuf } from "../../domain/ByteBuf.js";
import type IFragment from "../IFragment.js";
export default class PIID implements IFragment {
    readonly priority: number;
    readonly index: number;
    readonly value: number;
    private readonly buf;
    constructor(priority: number, index: number);
    get frameBuf(): ByteBuf;
    static of(piid: number): PIID;
    static parse(buf: ByteBuf): PIID;
    static readonly DEFAULT: PIID;
    toReadableString(): string;
}
//# sourceMappingURL=PIID.d.ts.map