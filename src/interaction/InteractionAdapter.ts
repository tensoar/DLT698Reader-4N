import type { ByteBuf } from "../domain/ByteBuf.js";

export default interface InteractionAdapter {

    sendAndReceive(buf: ByteBuf): Promise<ByteBuf>;
}