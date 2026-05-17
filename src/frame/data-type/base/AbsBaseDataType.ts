import type IFragment from "../../IFragment.js";
import type {ByteBuf} from "../../../domain/ByteBuf.js";

export abstract class AbsBaseDataType<T> {
    abstract readonly mark: number;
    abstract value: T

    abstract parse(byteBuf: ByteBuf): void;

    toReadableString () {
        // @ts-ignore
        return `Mark: ${this.mark}, value: ${this.value}`;
    }
    // match: (mark: number) => boolean;
}