import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtLong64Unsigned extends AbsBaseDataType<bigint> {
    readonly mark: number = 18;
    value: bigint = BigInt(0);
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt64BE();
    }

}