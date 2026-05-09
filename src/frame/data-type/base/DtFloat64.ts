import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DtFloat64 implements IBaseDataType<number> {
    readonly mark: number = 24;
    value: number = 0;

    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readDoubleBE();
    }

}