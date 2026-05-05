import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class Float32 implements IBaseDataType {
    readonly mark: number = 23;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readFloatBE();
    }

}