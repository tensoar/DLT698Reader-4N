import { ByteBuf } from "../../domain/ByteBuf.js";
import ValueError from "../../domain/error/ValueError.js";
export class RecordSelectorOfValue {
    buf;
    oad;
    value;
    constructor(oad, value) {
        this.oad = oad;
        this.value = value;
        this.buf = ByteBuf.allocate(oad.frameBuf.wIndex + value.frameBuf.wIndex);
        this.buf.writeBytesBE(oad.frameBuf);
        this.buf.writeBytesBE(value.frameBuf);
    }
    get frameBuf() {
        return this.buf;
    }
    static parse(buf) {
        // TODO
    }
}
export class RecordSelectorOfLatestNumber {
    buf;
    value;
    constructor(latest) {
        if (latest > 0xFF) {
            throw new ValueError(latest, "value must be Uint8, need in range (0, 0xff)");
        }
        this.value = latest;
        this.buf = ByteBuf.of(latest);
    }
    get frameBuf() {
        return this.buf;
    }
}
export default class RecordSelectionDesc {
    selector;
    type;
    buf;
    constructor(type, selector) {
        this.type = type;
        this.selector = selector;
        this.buf = ByteBuf.allocate(1 + selector.frameBuf.wIndex);
        this.buf.writeUInt8(type);
        this.buf.writeBytesBE(selector.frameBuf);
    }
    get frameBuf() {
        return this.buf;
    }
    static selectValue(oad, value) {
        return new RecordSelectionDesc(1, new RecordSelectorOfValue(oad, value));
    }
    static selectLatestNumber(latest) {
        return new RecordSelectionDesc(9, new RecordSelectorOfLatestNumber(latest));
    }
}
//# sourceMappingURL=RecordSelectionDesc.js.map