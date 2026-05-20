import { FrameCheckResult, GetResponseType } from "../../constant/InProtocol.js";
import { ByteBuf } from "../../domain/ByteBuf.js";
import ParseResult from "../../domain/ParseResult.js";
import GetResponseFrame from "../GetResponseFrame.js";
import FrameCodec from "./FrameCodec.js";
import EnumUtil from "../../utils/EnumUtil.js";
import GetResponseNormal from "../apdu/response/GetResponseNormal.js";
import GetResponseNormalList from "../apdu/response/GetResponseNormalList.js";
import GetResponseRecord from "../apdu/response/GetResponseRecord.js";
import OAD from "../data-type/base/OAD.js";
import GetResponseRecordList from "../apdu/response/GetResponseRecordList.js";
export default class ApduParser {
    static parseResponseApdu(frames) {
        const sortedFrames = frames.sort((a, b) => a.framedInfo.frameNumber - b.framedInfo.frameNumber);
        if (sortedFrames.find(f => f.frameCheckResult != FrameCheckResult.OK)) {
            return ParseResult.fail(`Has invalid frame check result`);
        }
        const buf = ByteBuf.allocate(sortedFrames.reduce((count, frame) => count + frame.pureApduBuf.wIndex, 0));
        sortedFrames.forEach(f => buf.writeBytesBE(f.pureApduBuf));
        // console.log(buf.toReadableHexString())
        let getType = buf.readUInt8();
        if (getType == 0x90) {
            const securityType = buf.readUInt8();
            if (securityType == 1) {
                return ParseResult.fail(`Unsupported Encrypted APDU`);
            }
            else if (securityType == 2) {
                return ParseResult.fail(`Error code: ${securityType}`);
            }
            else if (securityType != 0) {
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
            case GetResponseType.GET_RESPONSE_NORMAL_LIST: return GetResponseNormalList.parse(buf);
            case GetResponseType.GET_RESPONSE_RECORD: return GetResponseRecord.parse(buf);
            case GetResponseType.GET_RESPONSE_RECORD_LIST: return GetResponseRecordList.parse(buf);
            default: return ParseResult.fail(`Unknown response type ${respType}`);
        }
    }
}
//# sourceMappingURL=ApduParser.js.map