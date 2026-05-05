import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class Long64Unsigned implements IBaseDataType {
    readonly mark: number = 18;
    value: bigint = BigInt(0);
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt64BE();
    }

}