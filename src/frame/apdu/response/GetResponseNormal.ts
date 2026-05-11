import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type AbsGetResponse from "./AbsGetResponse.js";

export default class GetResponseNormal extends AbsGetResponse {
    private readonly frameBuf: ByteBuf;

    private constructor(frameBuf: ByteBuf) {
        super();
        this.frameBuf = frameBuf;

        let b = frameBuf.readUInt8();
        while (b == 0xfe) {
            b = frameBuf.readUInt8();
        }
        if (b !== 0x68) {
            console.error(`Invalid start mark: ${b}, expect 0x68`);
            return;
        }
        
    }

    static parse(frameBuf: ByteBuf) {
        return new GetResponseNormal(frameBuf);
    }

    get fullFrameBuf() {
        return this.frameBuf;
    }
}