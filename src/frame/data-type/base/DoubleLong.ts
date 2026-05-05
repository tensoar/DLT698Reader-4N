import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DoubleLong implements IBaseDataType {
    readonly mark: number = 5;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readInt32BE();
    }
}