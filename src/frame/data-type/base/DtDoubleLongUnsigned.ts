import {AbsBaseDataType} from "./AbsBaseDataType.js";
import type {ByteBuf} from "../../../domain/ByteBuf.js";

export default class DtDoubleLongUnsigned extends AbsBaseDataType<number> {
    readonly mark: number = 6;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt32BE();
    }
}