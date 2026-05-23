import { FrameCheckResult } from "../constant/InProtocol.js";
import { ByteBuf } from "../domain/ByteBuf.js";
import AddressField from "./field/AddressField.js";
import ControlField from "./field/ControlField.js";
import FramedInfo from "./FramedInfo.js";
import type IFragment from "./IFragment.js";
export default class GetResponseFrame implements IFragment {
    readonly addressField: AddressField | null;
    readonly frameLength: number;
    readonly frameCheckResult: FrameCheckResult;
    readonly controlField: ControlField | null;
    readonly buf: ByteBuf;
    readonly pureApduBuf: ByteBuf | null;
    readonly framedInfo: FramedInfo;
    constructor(frameBuf: ByteBuf);
    hasNextFrame(): boolean | 0 | undefined;
    genRequestNextFrameBuf(): ByteBuf;
    private consumePrefixBytes;
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=GetResponseFrame.d.ts.map