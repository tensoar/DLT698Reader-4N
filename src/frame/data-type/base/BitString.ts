import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class BitString implements IBaseDataType {
    readonly mark: number = 4;
    bitLen: number = 0;
    value: number[] = [];
    parse(byteBuf: ByteBuf): void {
        this.bitLen = byteBuf.readUInt8();
        const byteLen = Math.ceil(this.bitLen / 8);
        this.value = byteBuf.readBytesBE(byteLen);
    }

}