import { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";
export default class DtDate extends AbsBaseDataType {
    mark = 26;
    value = "";
    date = null;
    valid = false;
    parse(byteBuf) {
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
//# sourceMappingURL=DtDate.js.map