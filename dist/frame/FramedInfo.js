import { FrameType } from "../constant/InProtocol.js";
import EnumUtil from "../utils/EnumUtil.js";
export default class FramedInfo {
    frameType;
    frameNumber;
    value;
    constructor(frameType, frameNumber) {
        this.frameType = frameType;
        this.frameNumber = frameNumber;
        let v = 0;
        v |= this.frameNumber & 0x0FFF;
        v |= (this.frameType.value & 0b11) << 14;
        this.value = v;
    }
    static of(v) {
        const frameNumber = v & 0x0FFF;
        const typeValue = (v >> 14) & 0b11;
        const frameType = EnumUtil.fromValue(FrameType, typeValue);
        return new FramedInfo(frameType, frameNumber);
    }
    static parse(buf) {
        return this.of(buf.readUInt16LE());
    }
}
//# sourceMappingURL=FramedInfo.js.map