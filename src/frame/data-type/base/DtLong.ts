import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DtLong implements IBaseDataType<number> {
    readonly mark: number = 16;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readInt16BE();
    }

}