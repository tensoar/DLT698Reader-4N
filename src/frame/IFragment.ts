import type {ByteBuf} from "../domain/ByteBuf.js";

export default interface IFragment {
    frameBuf(): ByteBuf;
}