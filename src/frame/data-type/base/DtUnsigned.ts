import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DtUnsigned implements IBaseDataType<number> {
    readonly mark: number = 17;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt8();
    }

}