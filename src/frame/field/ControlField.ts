import {FunctionCode, MessageRole} from "../../constant/InProtocol.js";
import type IFragment from "../IFragment.js";
import {ByteBuf} from "../../domain/ByteBuf.js";
import EnumUtil from "../../utils/EnumUtil.js";

export default class ControlField implements IFragment{
    readonly buf: ByteBuf;
    constructor(
        readonly messageRole: MessageRole,
        readonly isFragment: 0 | 1,
        readonly sc: 0 | 1,
        readonly functionCode: FunctionCode,
    ) {
        const prm = messageRole.value & 0b01;
        const dir = (messageRole.value >> 1) & 0b01;

        let ctrl = 0;

        ctrl |= functionCode.value & 0b111;         // bit0~bit2
        ctrl |= (sc & 1) << 3;                 // bit3
        ctrl |= 0 << 4;                       // bit4 保留位固定0
        ctrl |= (isFragment & 1) << 5;         // bit5
        ctrl |= prm << 6;                     // bit6
        ctrl |= dir << 7;                     // bit7
        this.buf = ByteBuf.of(ctrl);
    }

    static parse(buffer: ByteBuf): ControlField {
        const ctrl = buffer.readUInt8();
        const functionCodeValue = ctrl & 0b00000111;
        const sc = ((ctrl >> 3) & 0b1) as 0 | 1;
        const isFragment = ((ctrl >> 5) & 0b1) as 0 | 1;
        const prm = (ctrl >> 6) & 0b1;
        const dir  = (ctrl >> 7) & 0b1;
        const messageRoleValue = (dir << 1) | prm;

        return new ControlField(
            EnumUtil.fromValue(MessageRole, messageRoleValue),
            isFragment,
            sc,
            EnumUtil.fromValue(FunctionCode, functionCodeValue)
        );
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }
}