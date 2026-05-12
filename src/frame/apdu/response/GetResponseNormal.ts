import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type PIID from "../../data-type/PIID.js";
import type AddressField from "../../field/AddressField.js";
import AbsGetResponse from "./AbsGetResponse.js";
import FrameCodec from "../../codec/FrameCodec.js";
import {FrameCheckResult} from "../../../constant/InProtocol.js";

export default class GetResponseNormal extends AbsGetResponse {
    piid: PIID | null = null;
    addressField: AddressField | null = null;
    private readonly frameBuf: ByteBuf;
    readonly frameCheckResult: FrameCheckResult;

    private constructor(frameBuf: ByteBuf) {
        super(frameBuf);
        this.frameBuf = frameBuf;
        this.frameCheckResult = FrameCodec.checkFrame(frameBuf);
        if (this.frameCheckResult == FrameCheckResult.OK) {
            this.consumePrefixBytes(frameBuf);
        }
    }

    static parse(frameBuf: ByteBuf) {
        return new GetResponseNormal(frameBuf);
    }

    get fullFrameBuf() {
        return this.frameBuf;
    }
}