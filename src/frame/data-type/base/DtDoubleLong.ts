import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class DtDoubleLong extends AbsBaseDataType<number> {
    readonly mark: number = 5;
    value: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readInt32BE();
    }
}