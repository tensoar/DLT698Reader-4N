import type { ByteBuf } from "../../../domain/ByteBuf.js";
import type PIID from "../../data-type/PIID.js";
import type AddressField from "../../field/AddressField.js";

export default abstract class AbsGetResponse {
    abstract readonly piid: PIID;
    abstract readonly addressField: AddressField;

    abstract get fullFrameBuf(): ByteBuf;

    protected 
}