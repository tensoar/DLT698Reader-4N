import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DtLongUnsigned implements IBaseDataType<number> {
    readonly mark: number = 18;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt16BE();
    }

}