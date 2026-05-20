import { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";
export default class DtDateTime extends AbsBaseDataType {
    mark = 25;
    value = "";
    date = null;
    valid = false;
    parse(byteBuf) {
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
//# sourceMappingURL=DtDateTime.js.map