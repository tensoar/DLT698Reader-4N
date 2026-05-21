import { FrameCheckResult, FunctionCode, MessageRole } from "../constant/InProtocol.js";
import type GetRecord from "../frame/apdu/request/GetRecord.js";
import GetRequestNormal from "../frame/apdu/request/GetRequestNormal.js";
import GetRequestNormalList from "../frame/apdu/request/GetRequestNormalList.js";
import GetRequestRecord from "../frame/apdu/request/GetRequestRecord.js";
import GetRequestRecordList from "../frame/apdu/request/GetRequestRecordList.js";
import type { IGetRequest } from "../frame/apdu/request/IGetRequest.js";
import GetResponseNormal from "../frame/apdu/response/GetResponseNormal.js";
import GetResponseNormalList from "../frame/apdu/response/GetResponseNormalList.js";
import GetResponseRecord from "../frame/apdu/response/GetResponseRecord.js";
import GetResponseRecordList from "../frame/apdu/response/GetResponseRecordList.js";
import ApduParser from "../frame/codec/ApduParser.js";
import type { AbsBaseDataType } from "../frame/data-type/base/AbsBaseDataType.js";
import { PIID, type OAD } from "../frame/data-type/index.js";
import AddressField from "../frame/field/AddressField.js";
import ControlField from "../frame/field/ControlField.js";
import GetRequestFrame from "../frame/GetRequestFrame.js";
import GetResponseFrame from "../frame/GetResponseFrame.js";
import DLT698Client from "./DLT698Client.js";

export default class DLT698Reader {
    constructor(private readonly client: DLT698Client) {}

    async openConnection() {
        return this.client.adaptor.open();
    }

    async closeConnection() {
        return this.client.adaptor.close();
    }

    private async readFullFrames<T extends IGetRequest>(requestFrame: GetRequestFrame<T>) {
        if (!this.client.adaptor.isOpen()) {
            throw new Error(`Reader is not open, call openConnection() first before read`);
        }
        const buf = await this.client.sendAndReceive(requestFrame.frameBuf);
        const frames: GetResponseFrame[] = [];
        let frame = new GetResponseFrame(buf);
        frames.push(frame);
        while (frame.frameCheckResult == FrameCheckResult.OK && frame.hasNextFrame()) {
            const fb = await this.client.sendAndReceive(frame.genRequestNextFrameBuf());
            frame = new GetResponseFrame(fb);
            frames.push(frame);
        }
        return frames;
    }

    async getRequestNormal(frame: GetRequestFrame<GetRequestNormal>) {
        const frames =  await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames) as GetResponseNormal<AbsBaseDataType<any>>;
    }

    async getRequestNormalList(frame: GetRequestFrame<GetRequestNormalList>) {
        const frames =  await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames) as GetResponseNormalList;
    }

    async getRequestRecord(frame: GetRequestFrame<GetRequestRecord>) {
        const frames =  await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames) as GetResponseRecord;
    }

    async getRequestRecordList(frame: GetRequestFrame<GetRequestRecordList>) {
        const frames =  await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames) as GetResponseRecordList;
    }

    async getRequestNormalSimple(addressField: AddressField, oad: OAD, isSecurity: boolean) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestNormal(new PIID(0, 0), oad);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestNormal(frame);
    }

    async getRequestNormalListSimple(addressField: AddressField, oadList: OAD[], isSecurity: boolean) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestNormalList(new PIID(0, 0), oadList);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestNormalList(frame);
    }

    async getRequestRecordSimple(addressField: AddressField, getRecord: GetRecord, isSecurity: boolean) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestRecord(new PIID(0, 0), getRecord);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestRecord(frame); 
    }

    async getRequestRecordListSimple(addressField: AddressField, getRecordList: GetRecord[], isSecurity: boolean) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestRecordList(new PIID(0, 0), getRecordList);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestRecordList(frame); 
    }
}