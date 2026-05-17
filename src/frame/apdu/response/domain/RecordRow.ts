import type { ByteBuf } from "../../../../domain/ByteBuf.js";
import FrameCodec from "../../../codec/FrameCodec.js";
import type { AbsBaseDataType } from "../../../data-type/base/AbsBaseDataType.js";
import type OAD from "../../../data-type/base/OAD.js";
import BaseTypeHelper from "../../../data-type/helper/BaseTypeHelper.js";
import type RecordColumnSelectionDesc from "../../../data-type/RecordColumnSelectionDesc.js";

export default class RecordRow {
    constructor(
        readonly dataList: AbsBaseDataType<any>[] = []
    ) {}

    static parse(apduBuf: ByteBuf, rowLen: number) {
        // const seqLen = FrameCodec.extralContentLength(apduBuf);
        const list: AbsBaseDataType<any>[] = [];
        for (let i = 0; i < rowLen; i ++) {
            list.push(BaseTypeHelper.decodeOneType(apduBuf));
        }
        return new RecordRow(list);
    }
}