import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class OctetString implements IBaseDataType {
    readonly mark: number = 8;
    value: string = "";
    parse(byteBuf: ByteBuf): void {
        const len = byteBuf.readUInt8();
        if (len < 1) {
            return;
        }
        this.value = byteBuf.readHex(len);
    }

}