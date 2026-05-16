import { ByteBuf } from "../../../domain/ByteBuf.js";
import PIID from "../../data-type/PIID.js";
import AddressField from "../../field/AddressField.js";
import {FrameCheckResult} from "../../../constant/InProtocol.js";
import FrameCodec from "../../codec/FrameCodec.js";
import ControlField from "../../field/ControlField.js";

export default interface IGetResponse {
    piid: PIID;
}