import type IFragment from "../../IFragment.js";
import type {ByteBuf} from "../../../domain/ByteBuf.js";

export interface IBaseDataType<T> {
    readonly mark: number;
    value: T

    parse(byteBuf: ByteBuf): void;
    // match: (mark: number) => boolean;
}