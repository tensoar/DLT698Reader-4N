import AddressField, {AddressFeature} from "../field/AddressField.js";
import ControlField from "../field/ControlField.js";
import type {IGetRequest} from "../apdu/request/IGetRequest.js";
import {Buffer} from "node:buffer";
import CRCUtil from "../../utils/CRCUtil.js";
import {AddressType, FunctionCode, MessageRole} from "../../constant/InProtocol.js";
import GetRequestNormal from "../apdu/request/GetRequestNormal.js";
import PIID from "../data-type/PIID.js";
import OAD from "../data-type/OAD.js";

export default class FrameCodec {
    static buildRequestFrameBuf(controlField: ControlField, addressField: AddressField, apdu: IGetRequest) {
        // 前导 + 起始 + 长度域 + 控制域 + 地址域 + 帧头校验 + 读取标志 + apdu + timeFlag + 帧校验 + 结束
        const bufLen = 4 + 1 + 2 + controlField.frameBytes().length
            + addressField.frameBytes().length
            + 2 + 1
            + apdu.frameBytes().length
            + 1 + 2 + 1;
        const buf = Buffer.alloc(bufLen);

        let offset = 0;
        buf.writeUint8(0xFE, offset ++);
        buf.writeUint8(0xFE, offset ++);
        buf.writeUint8(0xFE, offset ++);
        buf.writeUint8(0xFE, offset ++);
        buf.writeUint8(0x68, offset ++);

        // 长度域
        buf.writeUint16LE(bufLen - 6, offset);
        offset += 2;

        offset += controlField.frameBytes().copy(buf, offset);
        offset += addressField.frameBytes().copy(buf, offset);

        // 帧头校验
        buf.writeUint16LE(CRCUtil.crc16(buf, 5, buf.length - offset), offset)
        offset += 2

        buf.writeUint8(5, offset ++)
        offset += apdu.frameBytes().copy(buf, offset);
        buf.writeUint8(0, offset ++)
        // 帧校验
        buf.writeUint16LE(CRCUtil.crc16(buf, 5, buf.length - offset), offset)
        offset += 2
        buf.writeUint8(0x16, offset ++)
        return buf
    }
}

const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
const addressField =AddressField.of(AddressType.SINGLE, 0, [0, 0, 0, 0, 0, 1], 0)
const apdu = new GetRequestNormal(new PIID(0, 1), OAD.of(0, 0, 2, 0))
console.log(FrameCodec.buildRequestFrameBuf(controlField, addressField, apdu).toString("hex"));