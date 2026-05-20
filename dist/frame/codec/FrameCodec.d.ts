import { ByteBuf } from "../../domain/ByteBuf.js";
import { FrameCheckResult } from "../../constant/InProtocol.js";
export default class FrameCodec {
    static checkFrame(buf: ByteBuf): FrameCheckResult;
    static extralContentLength(buf: ByteBuf): number;
}
//# sourceMappingURL=FrameCodec.d.ts.map