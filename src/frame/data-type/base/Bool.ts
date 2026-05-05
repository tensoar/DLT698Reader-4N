import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class Bool implements IBaseDataType {
    readonly mark: number = 3;
    value: number = 0;
    // buf: ByteBuf;
    parse(byteBuf: ByteBuf) {
        this.value = byteBuf.readUInt8();
    }
    // get frameBuf(): ByteBuf {
    //     throw new Error("Method not implemented.");
    // }
}