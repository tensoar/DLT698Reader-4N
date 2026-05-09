import { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";

export default class DtDate implements IBaseDataType<string> {
    readonly mark: number = 26;
    value: string = "";
    private date: Date | null = null;
    private valid: boolean = false;
    parse(byteBuf: ByteBuf): void {
        const bytes = byteBuf.readBytesBE(5);
        this.date = DateUtil.bcdBytes2DateBE(bytes, "DATE");
        this.valid = this.date != null;
        this.value = DateUtil.bcdBytes2DateStrBE(bytes, "DATE");
    }

    getDate() {
        return this.date;
    }
    isValid() {
        return this.valid;
    }
}