import { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";
import ObjectIdentifier from "./ObjectIdentifier.js";

export default class ObjectMethodDesc extends AbsBaseDataType<string> {
    readonly mark: number = 83;
    value: string = "";
    oi: ObjectIdentifier = new ObjectIdentifier();
    methodMark: number = 0;
    operateMode: number = 0;
    parse(byteBuf: ByteBuf): void {
        this.oi = ObjectIdentifier.parse(byteBuf);
        this.methodMark = byteBuf.readUInt8();
        this.operateMode = byteBuf.readUInt8();
        const buf = ByteBuf.allocate(4);
        buf.writeUInt16BE(this.oi.value);
        buf.writeUInt8(this.methodMark);
        buf.writeUInt8(this.operateMode);
        this.value = buf.toString("hex")
    }
}