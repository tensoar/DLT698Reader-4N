import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class Null implements IBaseDataType {
    readonly mark: number = 0;
    parse(byteBuf: ByteBuf): void {

    }

}