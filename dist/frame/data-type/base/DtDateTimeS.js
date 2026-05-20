import { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";
export default class DtDateTimeS extends AbsBaseDataType {
    mark = 28;
    value = "";
    date = null;
    valid = false;
    parse(byteBuf) {
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
//# sourceMappingURL=DtDateTimeS.js.map