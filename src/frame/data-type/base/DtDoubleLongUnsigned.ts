import type {IBaseDataType} from "./IBaseDataType.js";
import type {ByteBuf} from "../../../domain/ByteBuf.js";

export default class DtDoubleLongUnsigned implements IBaseDataType<number> {
    readonly mark: number = 6;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt32BE();
    }
}