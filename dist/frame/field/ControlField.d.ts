import { FunctionCode, MessageRole } from "../../constant/InProtocol.js";
import type IFragment from "../IFragment.js";
import { ByteBuf } from "../../domain/ByteBuf.js";
export default class ControlField implements IFragment {
    readonly messageRole: MessageRole;
    readonly isFramed: 0 | 1;
    readonly sc: 0 | 1;
    readonly functionCode: FunctionCode;
    readonly buf: ByteBuf;
    constructor(messageRole: MessageRole, isFramed: 0 | 1, sc: 0 | 1, functionCode: FunctionCode);
    static parse(buffer: ByteBuf): ControlField;
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=ControlField.d.ts.map