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
import DtDateTime from "../base/DtDateTime.js";
import DtDate from "../base/DtDate.js";
import DtTime from "../base/DtTime.js";
import DtDateTimeS from "../base/DtDateTimeS.js";

export const Type_Mapper = {
    0: DtNull,
    1: DtArray,
    2: DtStruct,
    3: DtBool,
    4: DtBitString,
    5: DtDoubleLong,
    6: DtDoubleLongUnsigned,
    9: DtOctetString,
    10: DtVisibleString,
    12: DtUTF8String,
    15: DtInteger,
    16: DtLong,
    17: DtUnsigned,
    18: DtLongUnsigned,
    20: DtLong64,
    21: DtLong64Unsigned,
    22: DtEnum,
    23: DtFloat32,
    24: DtFloat64,
    25: DtDateTime,
    26: DtDate,
    27: DtTime,
    28: DtDateTimeS,
}

type TypeMark = keyof typeof Type_Mapper

const TYPE_MARK_LIST = Object.keys(Type_Mapper).map(k => parseInt(k));

export default class BaseTypeHelper {

    static decodeOneType<T extends IBaseDataType<any>>(buf: ByteBuf): T {
        const type = buf.readUInt8();
        if(!TYPE_MARK_LIST.includes(type)) {
            throw new TypeError(`Invalid base type mark: ${type}`);
        }
        const matchedType = this.matchedType(type as TypeMark);
        const typeObj = new matchedType();
        typeObj.parse(buf);
        return typeObj as T;
    }

    static matchedType(mark: TypeMark) {
        return Type_Mapper[mark]
    }
}

// const buf = ByteBuf.from([0x01, 0x02, 0x05, 0x01, 0x02, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00])
// const result = BaseTypeHelper.decodeOneType(buf),
// console.log(result),