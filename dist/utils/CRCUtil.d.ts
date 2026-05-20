import { ByteBuf } from "../domain/ByteBuf.js";
export default class CRCUtil {
    private static readonly CRC_TABLE;
    private static readonly CRC_INITIAL;
    static crc16(data: number[] | Buffer | ByteBuf, preSkipped?: number, tailSkipped?: number): number;
}
//# sourceMappingURL=CRCUtil.d.ts.map