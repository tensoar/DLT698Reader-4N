import { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";

export default class DtDateTimeS extends AbsBaseDataType<string> {
    readonly mark: number = 28;
    value: string = "";
    private date: Date | null = null;
    private valid: boolean = false;
    parse(byteBuf: ByteBuf): void {
        const bytes = byteBuf.readBytesBE(7);
        this.date = DateUtil.bcdBytes2DateBE(bytes, "DATE_TIME_S");
        this.valid = this.date != null;
        this.value = DateUtil.bcdBytes2DateStrBE(bytes, "DATE_TIME_S");
    }

    getDate() {
        return this.date;
    }
    isValid() {
        return this.valid;
    }
}