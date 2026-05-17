import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtBool extends AbsBaseDataType<0|1> {
    readonly mark: number = 3;
    value: 0 | 1 = 0;
    // buf: ByteBuf;
    parse(byteBuf: ByteBuf) {
        this.value = byteBuf.readUInt8() as 0 | 1;
    }
    // get frameBuf(): ByteBuf {
    //     throw new Error("Method not implemented.");
    // }
}