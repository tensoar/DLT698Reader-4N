import { FrameCheckResult, FrameType, FunctionCode, MessageRole } from "../constant/InProtocol.js";
import { ByteBuf } from "../domain/ByteBuf.js";
import CRCUtil from "../utils/CRCUtil.js";
import FrameCodec from "./codec/FrameCodec.js";
import AddressField from "./field/AddressField.js";
import ControlField from "./field/ControlField.js";
import FramedInfo from "./FramedInfo.js";
import type IFragment from "./IFragment.js";

export default class GetResponseFrame implements IFragment {
    readonly addressField: AddressField | null = null;
    readonly frameLength: number = 0;
    readonly frameCheckResult: FrameCheckResult;
    readonly controlField: ControlField | null = null;
    readonly buf: ByteBuf;
    readonly pureApduBuf: ByteBuf | null = null;
    readonly framedInfo: FramedInfo = FramedInfo.of(0);

    constructor(frameBuf: ByteBuf) {
        this.buf = frameBuf;
        this.frameCheckResult = FrameCodec.checkFrame(frameBuf);
        if (this.frameCheckResult != FrameCheckResult.OK) {
            return this;
        }
        this.consumePrefixBytes(frameBuf);
        this.frameLength = frameBuf.readUInt16LE();
        this.controlField = ControlField.parse(frameBuf);
        this.addressField = AddressField.parse(frameBuf);
        this.buf.readUInt16BE();
        console.log(this.buf.toString('hex', false))
        if (this.controlField.isFramed) {
            this.framedInfo = FramedInfo.parse(frameBuf);
        }
        // const apudStartIndex = frameBuf.rIndex;
        const apduArr = frameBuf.sliceArray(frameBuf.rIndex + 1, frameBuf.wIndex - 3);
        if (this.controlField.sc == 1) {
            for (let i = 0; i < apduArr.length; i ++) {
                apduArr[i] = (apduArr[i]! - 0x33 + 0x100) & 0xFF;
            }
        }
        this.pureApduBuf = ByteBuf.from(apduArr);
    }

    hasNextFrame() {
        return this.framedInfo.frameType == FrameType.MID;
    }

    genRequestNextFrameBuf() {
        if (this.frameCheckResult != FrameCheckResult.OK) {
            throw new Error(`Frame check result is invalid`);
        }
        const buf = ByteBuf.allocate(3 + this.controlField!.buf.wIndex + this.addressField!.frameBuf.length + 7);
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 1, 0, FunctionCode.USER_DATA);
        buf.writeUInt8(0x68);
        const len = 2 + controlField.frameBuf.length + this.addressField!.frameBuf.length + 6;
        buf.writeUInt16LE(len);
        buf.writeBytesBE(controlField.frameBuf);
        buf.writeBytesBE(this.addressField!.frameBuf);
        const hcs = CRCUtil.crc16(buf, 1);
        buf.writeUInt16LE(hcs);
        console.log(this.framedInfo)
        const framedInfo = new FramedInfo(FrameType.ACK, this.framedInfo.frameNumber);
        buf.writeUInt16LE(framedInfo.value);
        const fcs = CRCUtil.crc16(buf, 1);
        buf.writeUInt16LE(fcs);
        buf.writeUInt8(0x16);
        return buf;
    }

    private consumePrefixBytes(buf: ByteBuf) {
        let b = buf.readableBytes();
        while (b != 0x68) {
            b = buf.readUInt8();
        }
    }

     get frameBuf(): ByteBuf {
        return this.buf;
     }
}
