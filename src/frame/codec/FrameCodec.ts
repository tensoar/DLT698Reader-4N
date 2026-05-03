import AddressField, {AddressFeature} from "../field/AddressField.js";
import ControlField from "../field/ControlField.js";
import type {IGetRequest} from "../apdu/request/IGetRequest.js";
import {Buffer} from "node:buffer";
import CRCUtil from "../../utils/CRCUtil.js";
import {AddressType, FunctionCode, MessageRole} from "../../constant/InProtocol.js";
import GetRequestNormal from "../apdu/request/GetRequestNormal.js";
import PIID from "../data-type/PIID.js";
import OAD from "../data-type/OAD.js";
import {ByteBuf} from "../../domain/ByteBuf.js";
import GetRequestNormalList from "../apdu/request/GetRequestNormalList.js";

export default class FrameCodec {
    static buildRequestFrameBuf(controlField: ControlField, addressField: AddressField, apdu: IGetRequest) {
        // 前导 + 起始 + 长度域 + 控制域 + 地址域 + 帧头校验 + 读取标志 + apdu + timeFlag + 帧校验 + 结束
        const bufLen = 4 + 1 + 2 + controlField.frameBuf.wIndex
            + addressField.frameBuf.wIndex
            + 2 + 1
            + apdu.frameBuf.wIndex
            + 1 + 2 + 1;
        const buf = ByteBuf.allocate(bufLen);

        buf.writeBytes([0xFE, 0xFE, 0xFE, 0xFE, 0x68]);
        // 长度域
        buf.writeUInt16LE(bufLen - 6);
        buf.writeBytes(controlField.frameBuf);
        buf.writeBytes(addressField.frameBuf);

        // 帧头校验
        buf.writeUInt16LE(CRCUtil.crc16(buf, 5));

        buf.writeUInt8(5)
        buf.writeBytes(apdu.frameBuf);
        buf.writeUInt8(0)
        // 帧校验
        buf.writeUInt16LE(CRCUtil.crc16(buf, 5))
        buf.writeUInt8(0x16)
        return buf
    }
}

// const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
// const addressField =AddressField.of(AddressType.SINGLE, 0, [0, 0, 0, 0, 0, 1], 0)
// const apdu = new GetRequestNormalList(new PIID(0, 1), [OAD.BasicParam.Address, OAD.BasicParam.AmmeterNo])
// console.log(FrameCodec.buildRequestFrameBuf(controlField, addressField, apdu).toReadableHexString());