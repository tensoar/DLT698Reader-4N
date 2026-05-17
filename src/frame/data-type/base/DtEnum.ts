import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtEnum extends AbsBaseDataType<number> {
    readonly mark: number = 22;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt8();
    }

}