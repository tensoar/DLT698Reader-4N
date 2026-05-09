import type {IBaseDataType} from "../base/IBaseDataType.js";
import {ByteBuf} from "../../../domain/ByteBuf.js";
import DtArray from "../base/DtArray.js";
import DtNull from "../base/DtNull.js";
import DtBool from "../base/DtBool.js";
import type {Class} from "../../../types/index.js";
import DtStruct from "../base/DtStruct.js";
import DtBitString from "../base/DtBitString.js";
import DtDoubleLong from "../base/DtDoubleLong.js";
import DtDoubleLongUnsigned from "../base/DtDoubleLongUnsigned.js";
import DtOctetString from "../base/DtOctetString.js";
import DtVisibleString from "../base/DtVisibleString.js";
import DtUTF8String from "../base/DtUTF8String.js";
import DtInteger from "../base/DtInteger.js";
import DtLong from "../base/DtLong.js";
import DtUnsigned from "../base/DtUnsigned.js";
import DtLongUnsigned from "../base/DtLongUnsigned.js";
import DtLong64 from "../base/DtLong64.js";
import DtLong64Unsigned from "../base/DtLong64Unsigned.js";
import DtEnum from "../base/DtEnum.js";
import DtFloat32 from "../base/DtFloat32.js";
import DtFloat64 from "../base/DtFloat64.js";

export default class BaseTypeHelper {


    static decodeOneType<T extends IBaseDataType<any>>(buf: ByteBuf): T {
        const type = buf.readUInt8();
        const matchedType = this.matchedType(type);
        const typeObj = new matchedType();
        typeObj.parse(buf);
        return typeObj as T;
    }

    static matchedType(mark: number): Class<IBaseDataType<any>> {
        switch (mark) {
            case 0: return DtNull;
            case 1: return DtArray;
            case 2: return DtStruct;
            case 3: return DtBool;
            case 4: return DtBitString;
            case 5: return DtDoubleLong;
            case 6: return DtDoubleLongUnsigned;
            case 9: return DtOctetString;
            case 10: return DtVisibleString;
            case 12: return DtUTF8String;
            case 15: return DtInteger;
            case 16: return DtLong;
            case 17: return DtUnsigned;
            case 18: return DtLongUnsigned;
            case 20: return DtLong64;
            case 21: return DtLong64Unsigned;
            case 22: return DtEnum;
            case 23: return DtFloat32;
            case 24: return DtFloat64;
            default: throw new TypeError("Unknown type: " + mark);
        }
    }
}

// const buf = ByteBuf.from([0x01, 0x02, 0x05, 0x01, 0x02, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00])
// const result = BaseTypeHelper.decodeOneType(buf);
// console.log(result);