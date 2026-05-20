import type IFragment from "../../IFragment.js";
import { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
import { inspect } from "node:util";
export default class OAD extends AbsBaseDataType<number[]> implements IFragment {
    value: number[];
    readonly mark = 81;
    buf: ByteBuf | null;
    get frameBuf(): ByteBuf | null;
    match(target: OAD | number[] | string): boolean;
    parse(buf: ByteBuf): OAD;
    toString(): string;
    [inspect.custom](): string;
    static of(b3: number, b2: number, b1: number, b0: number): OAD;
    static parse(buf: ByteBuf): OAD;
    static BasicParam: {
        Address: OAD;
        DateTime: OAD;
        AmmeterNo: OAD;
        CTRatio: OAD;
        PTRatio: OAD;
    };
}
//# sourceMappingURL=OAD.d.ts.map