import type IFragment from "../IFragment.js";
import {ByteBuf} from "../../domain/ByteBuf.js";
import type OAD from "./OAD.js";
import ValueError from "../../domain/error/ValueError.js";


export interface IRecordSelector extends IFragment {}

export class RecordSelectorOfValue implements IRecordSelector {
    private readonly buf: ByteBuf;
    readonly oad: OAD;
    readonly value: IFragment;

    constructor(oad: OAD, value: IFragment) {
        this.oad = oad;
        this.value = value;
        this.buf = ByteBuf.allocate(oad.frameBuf.wIndex + value.frameBuf.wIndex)
        this.buf.writeBytesBE(oad.frameBuf)
        this.buf.writeBytesBE(value.frameBuf)
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }

    static parse(buf: ByteBuf) {
        // TODO
    }
}

export class RecordSelectorOfLatestNumber implements IRecordSelector {
    private readonly buf: ByteBuf;
    readonly value: number;

    constructor(latest: number) {
        if (latest > 0xFF) {
            throw new ValueError(latest, "value must be Uint8, need in range (0, 0xff)");
        }
        this.value = latest;
        this.buf = ByteBuf.of(latest);
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }
}

export default class RecordSelectionDesc<Selector extends IRecordSelector> implements IFragment {
    readonly selector: Selector;
    readonly type: number;
    private readonly buf: ByteBuf;
    private constructor(type: number, selector: Selector) {
        this.type = type;
        this.selector = selector;
        this.buf = ByteBuf.allocate(1 + selector.frameBuf.wIndex);
        this.buf.writeUInt8(type);
        this.buf.writeBytesBE(selector.frameBuf);
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }

    static selectValue(oad: OAD, value: IFragment): RecordSelectionDesc<RecordSelectorOfValue> {
        return new RecordSelectionDesc(1, new RecordSelectorOfValue(oad, value));
    }

    static selectLatestNumber(latest: number): RecordSelectionDesc<RecordSelectorOfLatestNumber> {
        return new RecordSelectionDesc(9, new RecordSelectorOfLatestNumber(latest));
    }
}