import { FrameCheckResult, FrameType } from "../constant/InProtocol.js";
import { ByteBuf } from "../domain/ByteBuf.js";
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
    readonly isFramed: boolean = false;
    readonly framedInfo: FramedInfo = FramedInfo.of(0);
    readonly frameType: number = 0;

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

        if (this.controlField.isFramed) {
            this.framedInfo = FramedInfo.of(frameBuf.readUInt16BE());
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