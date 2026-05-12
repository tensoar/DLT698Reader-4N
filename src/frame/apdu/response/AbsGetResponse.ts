import { ByteBuf } from "../../../domain/ByteBuf.js";
import PIID from "../../data-type/PIID.js";
import AddressField from "../../field/AddressField.js";
import {FrameCheckResult} from "../../../constant/InProtocol.js";
import FrameCodec from "../../codec/FrameCodec.js";
import ControlField from "../../field/ControlField.js";

export default abstract class AbsGetResponse {
    abstract readonly piid: PIID | null;
    readonly addressField: AddressField | null = null;
    readonly frameLength: number = 0;
    readonly frameCheckResult: FrameCheckResult;
    readonly controlField: ControlField | null = null;

    protected constructor(frameBuf: ByteBuf) {
        this.frameCheckResult = FrameCodec.checkFrame(frameBuf);
        if (this.frameCheckResult == FrameCheckResult.OK) {
            this.consumePrefixBytes(frameBuf);
            this.frameLength = frameBuf.readUInt16LE();
            this.controlField = ControlField.parse(frameBuf);
            this.addressField = AddressField.parse(frameBuf);
        }
    }

    abstract get fullFrameBuf(): ByteBuf;
    protected consumePrefixBytes(buf: ByteBuf) {
        let b = buf.readableBytes();
        while (b != 0x68) {
            b = buf.readUInt8();
        }
    }
}