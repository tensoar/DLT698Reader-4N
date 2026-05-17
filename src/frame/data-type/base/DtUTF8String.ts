import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtUTF8String extends AbsBaseDataType<string> {
    readonly mark: number = 12;
    value: string = "";
    parse(byteBuf: ByteBuf): void {
        const len = byteBuf.readUInt8();
        if (len < 1) {
            return;
        }
        this.value = byteBuf.readBufferBE(len).toString("utf-8");
    }

}