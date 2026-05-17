import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtOctetString extends AbsBaseDataType<string> {
    readonly mark: number = 8;
    value: string = "";
    parse(byteBuf: ByteBuf): void {
        const len = byteBuf.readUInt8();
        if (len < 1) {
            return;
        }
        this.value = byteBuf.readHexBE(len);
    }

}