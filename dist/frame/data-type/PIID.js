import { ByteBuf } from "../../domain/ByteBuf.js";
export default class PIID {
    priority;
    index;
    value;
    buf;
    constructor(priority, index) {
        this.priority = priority;
        this.index = index;
        this.value = 0;
        this.value |= index & 0x3F;
        this.value |= (priority & 1) << 7;
        this.buf = ByteBuf.from([this.value]);
    }
    get frameBuf() {
        return this.buf;
    }
    static of(piid) {
        return new PIID((piid >> 7) & 1, piid & 0x3F);
    }
    static parse(buf) {
        return this.of(buf.readUInt8());
    }
    static DEFAULT = new PIID(0, 0);
    toReadableString() {
        return `${this.value}(priority: ${this.priority}, index: ${this.index})`;
    }
}
//# sourceMappingURL=PIID.js.map