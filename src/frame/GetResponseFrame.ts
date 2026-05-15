import { FrameCheckResult, FrameType } from "../constant/InProtocol.js";
import type { ByteBuf } from "../domain/ByteBuf.js";
import type AbsGetResponse from "./apdu/response/AbsGetResponse.js";
import FrameCodec from "./codec/FrameCodec.js";
import type PIID from "./data-type/PIID.js";
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
    readonly apduBuf: ByteBuf | null = null;
    readonly isFramed: boolean = false;
    readonly framedInfo: FramedInfo | null = null;
    readonly frameIndex: number = 0;
    readonly frameType: number = 0;
    readonly isMixed: boolean = false;
    readonly isErrored: boolean = false;

    protected constructor(frameBuf: ByteBuf) {
        this.buf = frameBuf;
        this.frameCheckResult = FrameCodec.checkFrame(frameBuf);
        if (this.frameCheckResult != FrameCheckResult.OK) {
            return this;
        }
        this.consumePrefixBytes(frameBuf);
        this.frameLength = frameBuf.readUInt16LE();
        this.controlField = ControlField.parse(frameBuf);
        this.addressField = AddressField.parse(frameBuf);

        const apudStartIndex = frameBuf.rIndex;

        // todo 分帧

        if (this.isFramed) {
            this.framedInfo = FramedInfo.of(frameBuf.readUInt16BE());
        }
        // TODO check and remove 0x33
        this.apduBuf = frameBuf.slice(apudStartIndex, frameBuf.wIndex - 3);
        // if (frameBuf.readUInt8() == 0x10) {
        //     const securityType = frameBuf.readUInt8();
        //     if (securityType == 1) {
        //         this.isErrored = true;
        //         console.warn(`Unsupport Encrypted APDU`);
        //         return this;
        //     } else if (securityType == 2) {
        //         this.isErrored = true;
        //         return this;
        //     } else if (securityType != 0) {
        //         console.warn(`Unsupport APDU Encrypt type: ${securityType}`);
        //         return this;
        //     }
        //     this.isSecurity = true;
        //     const len = FrameCodec.extralContentLength(this.buf);
        //     this.pureApduBuf = frameBuf.slice(frameBuf.rIndex, frameBuf.rIndex + len);
        // } else {
        //     this.pureApduBuf = frameBuf.slice(apudStartIndex, frameBuf.wIndex - 3);
        // }
    }

    hasNextFrame() {
        return this.framedInfo != null && this.framedInfo.frameType == FrameType.MID;
    }

    // TODO 下一帧

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