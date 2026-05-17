import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtBitString extends AbsBaseDataType<number[]> {
    readonly mark: number = 4;
    bitLen: number = 0;
    value: number[] = [];
    parse(byteBuf: ByteBuf): void {
        this.bitLen = byteBuf.readUInt8();
        const byteLen = Math.ceil(this.bitLen / 8);
        this.value = byteBuf.readBytesBE(byteLen);
    }

}