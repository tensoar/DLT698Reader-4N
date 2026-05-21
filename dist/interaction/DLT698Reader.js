import { FrameCheckResult, FunctionCode, MessageRole } from "../constant/InProtocol.js";
import GetRequestNormal from "../frame/apdu/request/GetRequestNormal.js";
import GetRequestNormalList from "../frame/apdu/request/GetRequestNormalList.js";
import GetRequestRecord from "../frame/apdu/request/GetRequestRecord.js";
import GetRequestRecordList from "../frame/apdu/request/GetRequestRecordList.js";
import GetResponseNormal from "../frame/apdu/response/GetResponseNormal.js";
import GetResponseNormalList from "../frame/apdu/response/GetResponseNormalList.js";
import GetResponseRecord from "../frame/apdu/response/GetResponseRecord.js";
import GetResponseRecordList from "../frame/apdu/response/GetResponseRecordList.js";
import ApduParser from "../frame/codec/ApduParser.js";
import { PIID } from "../frame/data-type/index.js";
import AddressField from "../frame/field/AddressField.js";
import ControlField from "../frame/field/ControlField.js";
import GetRequestFrame from "../frame/GetRequestFrame.js";
import GetResponseFrame from "../frame/GetResponseFrame.js";
import DLT698Client from "./DLT698Client.js";
export default class DLT698Reader {
    client;
    constructor(client) {
        this.client = client;
    }
    async openConnection() {
        return this.client.adaptor.open();
    }
    async closeConnection() {
        return this.client.adaptor.close();
    }
    async readFullFrames(requestFrame) {
        if (!this.client.adaptor.isOpen()) {
            throw new Error(`Reader is not open, call openConnection() first before read`);
        }
        const buf = await this.client.sendAndReceive(requestFrame.frameBuf);
        const frames = [];
        let frame = new GetResponseFrame(buf);
        frames.push(frame);
        while (frame.frameCheckResult == FrameCheckResult.OK && frame.hasNextFrame()) {
            const fb = await this.client.sendAndReceive(frame.genRequestNextFrameBuf());
            frame = new GetResponseFrame(fb);
            frames.push(frame);
        }
        return frames;
    }
    async getRequestNormal(frame) {
        const frames = await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames);
    }
    async getRequestNormalList(frame) {
        const frames = await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames);
    }
    async getRequestRecord(frame) {
        const frames = await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames);
    }
    async getRequestRecordList(frame) {
        const frames = await this.readFullFrames(frame);
        return ApduParser.parseResponseApdu(frames);
    }
    async getRequestNormalSimple(addressField, oad, isSecurity) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestNormal(new PIID(0, 0), oad);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestNormal(frame);
    }
    async getRequestNormalListSimple(addressField, oadList, isSecurity) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestNormalList(new PIID(0, 0), oadList);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestNormalList(frame);
    }
    async getRequestRecordSimple(addressField, getRecord, isSecurity) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestRecord(new PIID(0, 0), getRecord);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestRecord(frame);
    }
    async getRequestRecordListSimple(addressField, getRecordList, isSecurity) {
        const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
        const apdu = new GetRequestRecordList(new PIID(0, 0), getRecordList);
        const frame = new GetRequestFrame(addressField, controlField, apdu, isSecurity);
        return this.getRequestRecordList(frame);
    }
}
//# sourceMappingURL=DLT698Reader.js.map