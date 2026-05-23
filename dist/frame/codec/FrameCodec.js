import { ByteBuf } from "../../domain/ByteBuf.js";
import { FrameCheckResult } from "../../constant/InProtocol.js";
import CRCUtil from "../../utils/CRCUtil.js";
export default class FrameCodec {
    static checkFrame(buf) {
        buf.resetReadIndex();
        let markIndex = 0;
        let b = buf.readUInt8();
        while (b === 0xFE) {
            b = buf.readUInt8();
            markIndex++;
        }
        if (b !== 0x68) {
            buf.resetReadIndex();
            return FrameCheckResult.START_MARK_ERROR;
        }
        if (buf.at(buf.wIndex - 1) !== 0x16) {
            buf.resetReadIndex();
            return FrameCheckResult.END_MARK_ERROR;
        }
        if (buf.readableBytes() < 10) {
            buf.resetReadIndex();
            return FrameCheckResult.FRAME_LENGTH_ERROR;
        }
        const frameLen = buf.readUInt16LE();
        if (frameLen !== buf.readableBytes() + 1) {
            buf.resetReadIndex();
            return FrameCheckResult.FRAME_LENGTH_ERROR;
        }
        const headerBytes = [buf.at(markIndex + 1), buf.at(markIndex + 2), buf.readUInt8(), buf.readUInt8()];
        const addressLen = (headerBytes[3] & 0x0F) + 1;
        headerBytes.push(...buf.readBytesBE(addressLen + 1));
        if (buf.readUInt16LE() !== CRCUtil.crc16(headerBytes)) {
            buf.resetReadIndex();
            return FrameCheckResult.HEADER_CRC_ERROR;
        }
        while (buf.wIndex - buf.rIndex > 3) {
            buf.readUInt8();
        }
        const frameCrc = buf.readUInt16LE();
        const realCrc = CRCUtil.crc16(buf, markIndex + 1, 3);
        if (frameCrc !== realCrc) {
            buf.resetReadIndex();
            return FrameCheckResult.FRAME_CRC_ERROR;
        }
        buf.resetReadIndex();
        return FrameCheckResult.OK;
    }
    static extraContentLength(buf) {
        const len = buf.readUInt8();
        if (len < 0x80) {
            return len;
        }
        return buf.readUInt16BE();
    }
}
// const buf = ByteBuf.from([0x68, 0x55, 0x00, 0xC3, 0x05, 0x32, 0x16, 0x16, 0x38, 0x20, 0x90, 0x00, 0xAD, 0x5C, 0x90, 0x00, 0x3C, 0x85, 0x01, 0x00, 0x30, 0x07, 0x0A, 0x00, 0x01, 0x01, 0x04, 0x02, 0x02, 0x06, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x02, 0x02, 0x06, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x02, 0x02, 0x06, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x02, 0x02, 0x06, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x04, 0x32, 0xF9, 0x56, 0x34, 0xF7, 0xA8, 0x16]);
// console.log(FrameCodec.checkFrame(buf))
//# sourceMappingURL=FrameCodec.js.map