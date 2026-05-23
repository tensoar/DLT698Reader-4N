import { FrameCheckResult } from "../constant/index.js";
import { ByteBuf } from "../domain/ByteBuf.js";
import FrameCodec from "../frame/codec/FrameCodec.js";
import DateUtil from "../utils/DateUtil.js";
export default class DLT698Client {
    adaptor;
    printData;
    readTimeoutMills;
    recvBuf = Buffer.alloc(0);
    resolve = undefined;
    reject = undefined;
    outTimer;
    constructor(adaptor, printData = false, readTimeoutMills = 3000) {
        this.adaptor = adaptor;
        this.printData = printData;
        this.readTimeoutMills = readTimeoutMills;
        this.adaptor.onData((data) => this.onData(data));
    }
    async sendAndReceive(data) {
        if (!this.adaptor.isOpen()) {
            throw new Error("Adpator port is not open");
        }
        if (this.printData) {
            console.log(`${DateUtil.date2Format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS")} Send: `, data.toReadableHexString());
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
                if (this.printData) {
                    console.log(`${DateUtil.date2Format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS")} Recv: `, ByteBuf.wrap(this.recvBuf).toReadableHexString());
                }
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
                if (this.printData) {
                    console.log(`${DateUtil.date2Format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS")} Recv: `, byteBuf.toReadableHexString());
                }
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