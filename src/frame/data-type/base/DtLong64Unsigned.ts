import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DtLong64Unsigned implements IBaseDataType<bigint> {
    readonly mark: number = 18;
    value: bigint = BigInt(0);
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt64BE();
    }

}