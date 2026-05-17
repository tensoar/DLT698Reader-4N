import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtLong64 extends AbsBaseDataType<bigint> {
    readonly mark: number = 20;
    value: bigint = BigInt(0);
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readInt64BE();
    }

}