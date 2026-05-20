import { ByteBuf } from "../../../domain/ByteBuf.js";
import { AbsBaseDataType } from "./AbsBaseDataType.js";
export default class DtDateTime extends AbsBaseDataType<string> {
    readonly mark: number;
    value: string;
    private date;
    private valid;
    parse(byteBuf: ByteBuf): void;
    getDate(): Date | null;
    isValid(): boolean;
}
//# sourceMappingURL=DtDateTime.d.ts.map