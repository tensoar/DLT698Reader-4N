import { FrameType } from "../constant/InProtocol.js";
import EnumUtil from "../utils/EnumUtil.js";

export default class FramedInfo {

    readonly value: number;

    constructor(
        public frameType: FrameType,
        public frameNumber: number,
    ) {
        let v = 0;
        v |= this.frameNumber & 0xFFF;
        v |= (this.frameType.value & 0b11) << 14;
        this.value = v;
    }

    static of(v: number) {
        const frameNumber = v & 0xFFF;
        const typeValue = (v >> 14) & 0b11;

        const frameType = EnumUtil.fromValue(FrameType, typeValue);
        return new FramedInfo(frameType, frameNumber);
    }
}