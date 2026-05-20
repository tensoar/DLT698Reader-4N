import ControlField from "./field/ControlField.js";
import AddressField from "./field/AddressField.js";
import type IFragment from "./IFragment.js";
import type { IGetRequest } from "./apdu/request/IGetRequest.js";
import { ByteBuf } from "../domain/ByteBuf.js";
export default class GetRequestFrame<GetRequest extends IGetRequest> implements IFragment {
    readonly controlField: ControlField;
    readonly addressField: AddressField;
    readonly hcs: number;
    readonly apdu: GetRequest;
    readonly frameLen: number;
    readonly fcs: number;
    readonly isSecurity: boolean;
    private readonly buf;
    constructor(addressField: AddressField, controlField: ControlField, apdu: GetRequest, isSecurity: boolean);
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=GetRequestFrame.d.ts.map