import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type {IBaseDataType} from "./IBaseDataType.js";

export default class DtNull implements IBaseDataType<null> {
    readonly mark: number = 0;
    value = null;
    parse(byteBuf: ByteBuf): void {

    }

}