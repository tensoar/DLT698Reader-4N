import { ByteBuf } from "../domain/ByteBuf.js";
import type InteractionAdapter from "./InteractionAdapter.js";
export default class DLT698Client {
    readonly adaptor: InteractionAdapter;
    private readonly printData;
    private readonly readTimeoutMills;
    private recvBuf;
    private resolve;
    private reject;
    private outTimer?;
    constructor(adaptor: InteractionAdapter, printData?: boolean, readTimeoutMills?: number);
    sendAndReceive(data: ByteBuf): Promise<ByteBuf>;
    private onData;
    private clean;
}
//# sourceMappingURL=DLT698Client.d.ts.map