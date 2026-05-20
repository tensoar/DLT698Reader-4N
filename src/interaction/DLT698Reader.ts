import { FrameCheckResult } from "../constant/InProtocol.js";
import type GetRequestNormal from "../frame/apdu/request/GetRequestNormal.js";
import type GetRequestNormalList from "../frame/apdu/request/GetRequestNormalList.js";
import type GetRequestRecord from "../frame/apdu/request/GetRequestRecord.js";
import type GetRequestRecordList from "../frame/apdu/request/GetRequestRecordList.js";
import type { IGetRequest } from "../frame/apdu/request/IGetRequest.js";
import type GetResponseNormal from "../frame/apdu/response/GetResponseNormal.js";
import type GetResponseNormalList from "../frame/apdu/response/GetResponseNormalList.js";
import type GetResponseRecord from "../frame/apdu/response/GetResponseRecord.js";
import type GetResponseRecordList from "../frame/apdu/response/GetResponseRecordList.js";
import ApduParser from "../frame/codec/ApduParser.js";
import type GetRequestFrame from "../frame/GetRequestFrame.js";
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
        return ApduParser.parseResponseApdu(frames) as GetResponseNormal<any>;
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
}