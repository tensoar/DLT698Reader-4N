import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DtLong64 implements IBaseDataType<bigint> {
    readonly mark: number = 20;
    value: bigint = BigInt(0);
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readInt64BE();
    }

}