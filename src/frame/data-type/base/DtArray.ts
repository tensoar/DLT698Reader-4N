import type { ByteBuf } from "../../../domain/ByteBuf.js";
import {AbsBaseDataType} from "./AbsBaseDataType.js";
import BaseTypeHelper from "../helper/BaseTypeHelper.js";

export default class DtArray<T extends AbsBaseDataType<any>> extends AbsBaseDataType<T[]> {
    readonly mark = 1;
    readonly value: T[] = [];

    match(mark: number){
        return this.mark === mark;
    }

    parse(byteBuf: ByteBuf){
        const seqOf = byteBuf.readUInt8();
        for (let i = 0; i < seqOf; i++) {
            this.value.push(BaseTypeHelper.decodeOneType(byteBuf));
        }
    }

    get seqOf(): number {
        return this.value.length;
    }

    get frameBuf(): ByteBuf {
        throw new Error("Method not implemented.");
    }

}