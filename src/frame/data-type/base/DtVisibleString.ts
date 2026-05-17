import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtVisibleString extends AbsBaseDataType<string> {
    readonly mark: number = 10;
    value: string = "";
    parse(byteBuf: ByteBuf): void {
        const len = byteBuf.readUInt8();
        if (len < 1) {
            return;
        }
        this.value = byteBuf.readAsciiBE(len);
    }

}