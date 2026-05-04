import AddressField, {AddressFeature} from "../field/AddressField.js";
import ControlField from "../field/ControlField.js";
import type {IGetRequest} from "../apdu/request/IGetRequest.js";

export default class FrameCodec {
    static buildRequestFrameBuf(controlField: ControlField, addressField: AddressField, apdu: IGetRequest) {

    }
}