import { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
import DateUtil from "../../../utils/DateUtil.js";
export default class DtTime extends AbsBaseDataType {
    mark = 27;
    value = "";
    date = null;
    valid = false;
    parse(byteBuf) {
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
//# sourceMappingURL=DtTime.js.map