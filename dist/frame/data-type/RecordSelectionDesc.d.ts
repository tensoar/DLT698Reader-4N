import type IFragment from "../IFragment.js";
import { ByteBuf } from "../../domain/ByteBuf.js";
import type OAD from "./base/OAD.js";
export interface IRecordSelector extends IFragment {
}
export declare class RecordSelectorOfValue implements IRecordSelector {
    private readonly buf;
    readonly oad: OAD;
    readonly value: IFragment;
    constructor(oad: OAD, value: IFragment);
    get frameBuf(): ByteBuf;
    static parse(buf: ByteBuf): void;
}
export declare class RecordSelectorOfLatestNumber implements IRecordSelector {
    private readonly buf;
    readonly value: number;
    constructor(latest: number);
    get frameBuf(): ByteBuf;
}
export default class RecordSelectionDesc<Selector extends IRecordSelector> implements IFragment {
    readonly selector: Selector;
    readonly type: number;
    private readonly buf;
    private constructor();
    get frameBuf(): ByteBuf;
    static selectValue(oad: OAD, value: IFragment): RecordSelectionDesc<RecordSelectorOfValue>;
    static selectLatestNumber(latest: number): RecordSelectionDesc<RecordSelectorOfLatestNumber>;
}
//# sourceMappingURL=RecordSelectionDesc.d.ts.map