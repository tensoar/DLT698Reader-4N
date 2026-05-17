import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtFloat64 extends AbsBaseDataType<number> {
    readonly mark: number = 24;
    value: number = 0;

    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readDoubleBE();
    }

}