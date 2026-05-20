import { FrameCheckResult } from "../constant/InProtocol.js";
import { ByteBuf } from "../domain/ByteBuf.js";
import FrameCodec from "../frame/codec/FrameCodec.js";
export default class DLT698Client {
    adaptor;
    readTimeoutMills;
    recvBuf = Buffer.alloc(0);
    resolve = undefined;
    reject = undefined;
    outTimer;
    constructor(adaptor, readTimeoutMills = 3000) {
        this.adaptor = adaptor;
        this.readTimeoutMills = readTimeoutMills;
        this.adaptor.onData(this.onData);
    }
    async sendAndReceive(data) {
        if (!this.adaptor.isOpen()) {
            throw new Error("Adpator port is not open");
        }
        return new Promise(async (resolve, reject) => {
            this.recvBuf = Buffer.alloc(0);
            this.resolve = resolve;
            this.reject = reject;
            try {
                const res = await this.adaptor.send(data.getBuffer());
                if (!res) {
                    reject('Send data failed ...');
                    return;
                }
            }
            catch (e) {
                reject(e);
                return;
            }
            this.outTimer = setTimeout(() => {
                reject(new Error("Read Time Out ..."));
                this.clean();
            }, this.readTimeoutMills);
        });
    }
    onData(data) {
        this.recvBuf = Buffer.concat([this.recvBuf, data]);
        try {
            const byteBuf = ByteBuf.wrap(this.recvBuf);
            if (FrameCodec.checkFrame(byteBuf) == FrameCheckResult.OK) {
                this.resolve?.(byteBuf);
                this.clean();
            }
        }
        catch (e) {
            this.reject?.(e);
        }
    }
    clean() {
        clearTimeout(this.outTimer);
        this.resolve = undefined;
        this.reject = undefined;
    }
}
//# sourceMappingURL=DLT698Client.js.map