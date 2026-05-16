import {FrameCheckResult, GetResponseType} from "../../constant/InProtocol.js";
import { ByteBuf } from "../../domain/ByteBuf.js";
import ParseResult from "../../domain/ParseResult.js";
import GetResponseFrame from "../GetResponseFrame.js";
import FrameCodec from "./FrameCodec.js";
import EnumUtil from "../../utils/EnumUtil.js";
import GetResponseNormal from "../apdu/response/GetResponseNormal.js";

export default class ApduParser {
    static parseResponseApdu(frames: GetResponseFrame[]) {
        const sortedFrames = frames.sort((a, b) => b.framedInfo.frameNumber - a.framedInfo.frameNumber);
        if (sortedFrames.find(f => f.frameCheckResult != FrameCheckResult.OK)) {
            return ParseResult.fail(`Has invalid frame check result`);
        }
        const buf = ByteBuf.allocate(sortedFrames.reduce((count, frame) => count + frame.pureApduBuf!.wIndex, 0));
        sortedFrames.forEach(f => buf.writeBytesBE(f.pureApduBuf!));
        let getType = buf.readUInt8();
        if (getType == 0x90) {
            const securityType = buf.readUInt8();
            if (securityType == 1) {
                return ParseResult.fail(`Unsupported Encrypted APDU`);
            } else if (securityType == 2) {
                return ParseResult.fail(`Error code: ${securityType}`)
            } else if (securityType != 0) {
                return ParseResult.fail(`Unsupported APDU Encrypt type: ${securityType}`);
            }
            const len = FrameCodec.extralContentLength(buf);
            if (buf.readableBytes() < len) {
                return ParseResult.fail(`Security len error, except: ${len}, real: ${len}`);
            }
            getType = buf.readUInt8();
        }

        if (getType !== 0x85) {
            return ParseResult.fail(`Invalid get type ${getType}`);
        }
        const respType = EnumUtil.fromValue(GetResponseType, buf.readUInt8());
        switch (respType) {
            case GetResponseType.GET_RESPONSE_NORMAL: return GetResponseNormal.parse(buf);
            default: return ParseResult.fail(`Unknown response type ${respType}`);
        }
    }
}

// const frameBuf = ByteBuf.from([0x68, 0x21, 0x00, 0xc3, 0x05, 0x32, 0x16, 0x16, 0x38, 0x20, 0x90, 0xa0, 0x38, 0xf9, 0x85, 0x01, 0x00, 0x40, 0x00, 0x02,
//  0x00, 0x01, 0x1c, 0x07, 0xe6, 0x0c, 0x0b, 0x13, 0x33, 0x20, 0x00, 0x00, 0xc1, 0x00, 0x16]);
// const frame = new GetResponseFrame(frameBuf);
// const result = ApduParser.parseResponseApdu([frame]) as GetResponseNormal<any>
// console.log(result.result.result.data)