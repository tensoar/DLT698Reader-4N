import {FunctionCode, type MessageRole} from "../../constant/InProtocol.js";
import type IFragment from "../IFragment.js";
import {Buffer} from "node:buffer";

export default class ControlField implements IFragment{
    readonly buf: Buffer;
    constructor(
        readonly messageRole: MessageRole,
        readonly isFragment: 0 | 1,
        readonly sc: 0 | 1,
        readonly functionCode: FunctionCode,
    ) {
        const prm = messageRole.value & 0b01;        // bit6
        const dir = (messageRole.value >> 1) & 0b01; // bit7

        let ctrl = 0;

        ctrl |= functionCode.value & 0b111;         // bit0~bit2
        ctrl |= (sc & 1) << 3;                 // bit3
        ctrl |= 0 << 4;                       // bit4 保留位固定0
        ctrl |= (isFragment & 1) << 5;         // bit5
        ctrl |= prm << 6;                     // bit6
        ctrl |= dir << 7;                     // bit7
        this.buf = Buffer.from([ctrl]);
    }

    frameBytes(): Buffer {
        return this.buf;
    }
}