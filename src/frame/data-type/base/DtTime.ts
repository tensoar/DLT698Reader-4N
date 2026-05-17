import { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";

export default class DtTime extends AbsBaseDataType<string> {
    readonly mark: number = 27;
    value: string = "";
    private date: Date | null = null;
    private valid: boolean = false;
    parse(byteBuf: ByteBuf): void {
        const bytes = byteBuf.readBytesBE(3);
        this.date = DateUtil.bcdBytes2DateBE(bytes, "TIME");
        this.valid = this.date != null;
        this.value = DateUtil.bcdBytes2DateStrBE(bytes, "TIME");
    }

    getDate() {
        return this.date;
    }
    isValid() {
        return this.valid;
    }
}