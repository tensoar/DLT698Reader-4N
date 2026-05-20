import { FrameType } from "../constant/InProtocol.js";
import type { ByteBuf } from "../domain/ByteBuf.js";
export default class FramedInfo {
    frameType: FrameType;
    frameNumber: number;
    readonly value: number;
    constructor(frameType: FrameType, frameNumber: number);
    static of(v: number): FramedInfo;
    static parse(buf: ByteBuf): FramedInfo;
}
//# sourceMappingURL=FramedInfo.d.ts.map