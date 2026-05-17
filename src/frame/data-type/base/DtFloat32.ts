import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtFloat32 extends AbsBaseDataType<number> {
    readonly mark: number = 23;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readFloatBE();
    }

}