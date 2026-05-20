import { FrameCheckResult } from "../constant/InProtocol.js";
import ApduParser from "../frame/codec/ApduParser.js";
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
}
//# sourceMappingURL=DLT698Reader.js.map