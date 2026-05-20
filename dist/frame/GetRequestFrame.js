import ControlField from "./field/ControlField.js";
import AddressField from "./field/AddressField.js";
import { ByteBuf } from "../domain/ByteBuf.js";
import CRCUtil from "../utils/CRCUtil.js";
import RandomUtil from "../utils/RandomUtil.js";
export default class GetRequestFrame {
    controlField;
    addressField;
    hcs;
    apdu;
    frameLen;
    fcs;
    isSecurity;
    buf;
    constructor(addressField, controlField, apdu, isSecurity) {
        this.controlField = controlField;
        this.addressField = addressField;
        this.apdu = apdu;
        this.isSecurity = isSecurity;
        const bufLen = 4 + 1 + 2 + controlField.frameBuf.wIndex
            + addressField.frameBuf.wIndex
            + 2 + 1
            + apdu.frameBuf.wIndex
            + 1 + 2 + 1 + (isSecurity ? (apdu.frameBuf.wIndex < 0x80 ? 21 : 23) : 0);
        const buf = ByteBuf.allocate(bufLen);
        buf.writeBytesBE([0xFE, 0xFE, 0xFE, 0xFE, 0x68]);
        // 长度域
        this.frameLen = bufLen - 6;
        buf.writeUInt16LE(this.frameLen);
        buf.writeBytesBE(controlField.frameBuf);
        buf.writeBytesBE(addressField.frameBuf);
        // 帧头校验
        this.hcs = CRCUtil.crc16(buf, 5);
        buf.writeUInt16LE(this.hcs);
        if (isSecurity) {
            buf.writeUInt8(0x10);
            buf.writeUInt8(0);
            const dataLen = apdu.frameBuf.wIndex + 2;
            if (apdu.frameBuf.wIndex < 0x80) {
                buf.writeUInt8(dataLen);
            }
            else {
                buf.writeUInt8(0x82);
                buf.writeUInt16BE(dataLen);
            }
        }
        if (controlField.sc == 1) {
            buf.writeUInt8(5 + 0x33);
            for (let i = 0; i < apdu.frameBuf.wIndex; i++) {
                buf.writeUInt8((apdu.frameBuf.at(i) + 0x33) & 0xFF);
            }
        }
        else {
            buf.writeUInt8(5);
            buf.writeBytesBE(apdu.frameBuf);
        }
        // TODO 时间标签
        buf.writeUInt8(0);
        if (isSecurity) {
            buf.writeUInt8(0x01);
            buf.writeUInt8(0x10);
            buf.writeBytesBE(RandomUtil.randomSN(0x10));
        }
        // 帧校验
        this.fcs = CRCUtil.crc16(buf, 5);
        buf.writeUInt16LE(this.fcs);
        buf.writeUInt8(0x16);
        this.buf = buf;
    }
    get frameBuf() {
        return this.buf;
    }
}
//# sourceMappingURL=GetRequestFrame.js.map