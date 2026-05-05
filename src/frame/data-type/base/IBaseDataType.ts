import type IFragment from "../../IFragment.js";
import type {ByteBuf} from "../../../domain/ByteBuf.js";

export interface IBaseDataType {
    readonly mark: number;

    parse(byteBuf: ByteBuf): void;
    // match: (mark: number) => boolean;
}