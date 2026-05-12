import ControlField from "./field/ControlField.js";
import AddressField from "./field/AddressField.js";
import type IFragment from "./IFragment.js";
import type {IGetRequest} from "./apdu/request/IGetRequest.js";
import {ByteBuf} from "../domain/ByteBuf.js";
import CRCUtil from "../utils/CRCUtil.js";
import RandomUtil from "../utils/RandomUtil.js";
import {AddressType, FunctionCode, MessageRole} from "../constant/InProtocol.js";
import GetRequestNormalList from "./apdu/request/GetRequestNormalList.js";
import PIID from "./data-type/PIID.js";
import OAD from "./data-type/OAD.js";
import RecordSelectionDesc from "./data-type/RecordSelectionDesc.js";
import RecordColumnSelectionDesc from "./data-type/RecordColumnSelectionDesc.js";
import GetRequestRecord from "./apdu/request/GetRequestRecord.js";
import GetRecord from "./apdu/request/GetRecord.js";
import GetRequestRecordList from "./apdu/request/GetRequestRecordList.js";

export default class GetRequestFrame<GetRequest extends IGetRequest> implements IFragment{
    readonly controlField: ControlField;
    readonly addressField: AddressField;
    readonly hcs: number;
    readonly apdu: GetRequest;
    readonly frameLen: number;
    readonly fcs: number;
    readonly isSecurity: boolean;
    private readonly buf: ByteBuf;
    constructor(addressField: AddressField, controlField: ControlField, apdu: GetRequest, isSecurity: boolean) {
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
        this.hcs = CRCUtil.crc16(buf, 5)
        buf.writeUInt16LE(this.hcs);

        if (isSecurity) {
            buf.writeUInt8(0x10);
            buf.writeUInt8(0);

            const dataLen = apdu.frameBuf.wIndex + 2
            if (apdu.frameBuf.wIndex < 0x80) {
                buf.writeUInt8(dataLen);
            } else {
                buf.writeUInt8(0x82);
                buf.writeUInt16BE(dataLen);
            }
        }

        buf.writeUInt8(5);
        buf.writeBytesBE(apdu.frameBuf);

        // TODO 时间标签
        buf.writeUInt8(0);

        if (isSecurity) {
            buf.writeUInt8(0x01);
            buf.writeUInt8(0x10);
            buf.writeBytesBE(RandomUtil.randomSN(0x10));
        }

        // 帧校验
        this.fcs = CRCUtil.crc16(buf, 5);
        buf.writeUInt16LE(this.fcs)
        buf.writeUInt8(0x16)
        this.buf = buf
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }
}

// const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
// const addressField =AddressField.of(AddressType.SINGLE, 0, [0, 0, 0, 0, 0, 1], 0)

// const oadList: OAD[] = []
// for (let i = 0; i < 20; i ++) {
//     oadList.push(OAD.BasicParam.Address)
//     oadList.push(OAD.BasicParam.AmmeterNo)
// }
// const apdu = new GetRequestNormalList(new PIID(0, 1), oadList)
// const getRequestFrame = new GetRequestFrame(addressField, controlField, apdu, true)
// console.log(getRequestFrame.frameBuf.toReadableHexString());

// const oad = OAD.of(0x30, 0x1d, 0x02, 0x00);
// const rsd = RecordSelectionDesc.selectLatestNumber(2);
// const rcsd = new RecordColumnSelectionDesc([OAD.of(0x20, 0x22, 0x02, 0x00), OAD.of(0x20, 0x1e, 0x02, 0x00)])
// const getRecord = new GetRecord(oad, rsd, rcsd)
// const apdu = new GetRequestRecordList(new PIID(0, 1), [getRecord, getRecord]);
// const getRequestFrame = new GetRequestFrame(addressField, controlField, apdu, false)
// console.log(getRequestFrame.frameBuf.toReadableHexString());