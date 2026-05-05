import type {IBaseDataType} from "../base/IBaseDataType.js";
import {ByteBuf} from "../../../domain/ByteBuf.js";
import ArraySeq from "../base/ArraySeq.js";
import Null from "../base/Null.js";
import Bool from "../base/Bool.js";
import type {Class} from "../../../types/index.js";
import Struct from "../base/Struct.js";
import BitString from "../base/BitString.js";
import DoubleLong from "../base/DoubleLong.js";
import DoubleLongUnsigned from "../base/DoubleLongUnsigned.js";
import OctetString from "../base/OctetString.js";
import VisibleString from "../base/VisibleString.js";
import UTF8String from "../base/UTF8String.js";
import Integer from "../base/Integer.js";
import Long from "../base/Long.js";
import Unsigned from "../base/Unsigned.js";
import LongUnsigned from "../base/LongUnsigned.js";
import Long64 from "../base/Long64.js";
import Long64Unsigned from "../base/Long64Unsigned.js";
import Enum from "../base/Enum.js";
import Float32 from "../base/Float32.js";
import Float64 from "../base/Float64.js";

export default class BaseTypeHelper {


    static decodeOneType<T extends IBaseDataType>(buf: ByteBuf): T {
        const type = buf.readUInt8();
        const matchedType = this.matchedType(type);
        const typeObj = new matchedType();
        typeObj.parse(buf);
        return typeObj as T;
    }

    static matchedType(mark: number): Class<IBaseDataType> {
        switch (mark) {
            case 0: return Null;
            case 1: return ArraySeq;
            case 2: return Struct;
            case 3: return Bool;
            case 4: return BitString;
            case 5: return DoubleLong;
            case 6: return DoubleLongUnsigned;
            case 9: return OctetString;
            case 10: return VisibleString;
            case 12: return UTF8String;
            case 15: return Integer;
            case 16: return Long;
            case 17: return Unsigned;
            case 18: return LongUnsigned;
            case 20: return Long64;
            case 21: return Long64Unsigned;
            case 22: return Enum;
            case 23: return Float32;
            case 24: return Float64;
            default: throw new TypeError("Unknown type: " + mark);
        }
    }
}

// const buf = ByteBuf.from([0x01, 0x02, 0x05, 0x01, 0x02, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00])
// const result = BaseTypeHelper.decodeOneType(buf);
// console.log(result);