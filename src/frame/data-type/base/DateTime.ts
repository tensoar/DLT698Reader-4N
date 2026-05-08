import { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";

export default class DateTime implements IBaseDataType {
    readonly mark: number = 25;
    value: string = "";
    private date: Date | null = null;
    private valid: boolean = false;
    parse(byteBuf: ByteBuf): void {
        const bytes = byteBuf.readBytesBE(10);
        this.date = DateUtil.bcdBytes2DateBE(bytes, "DATE_TIME");
        this.valid = this.date != null;
        this.value = DateUtil.bcdBytes2DateStrBE(bytes, "DATE_TIME");
    }

    getDate() {
        return this.date;
    }
    isValid() {
        return this.valid;
    }
}