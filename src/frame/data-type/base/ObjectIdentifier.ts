import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";

export default class ObjectIdentifier extends AbsBaseDataType<number> {
    readonly mark = 80;
    value: number = 0;

    parse(byteBuf: ByteBuf): void {
        this.value = byteBuf.readUInt16BE();
    }


    static parse(byteBuf: ByteBuf) {
        const oi = new ObjectIdentifier();
        oi.parse(byteBuf);
        return oi;
    }
}