import  { AddressType } from "../../constant/InProtocol.js";
import type IFragment from "../IFragment.js";
import {Buffer} from "node:buffer";

// 地址特征
export class AddressFeature implements IFragment{
    readonly buf : Buffer;
    constructor(
        readonly addressType: AddressType,
        readonly logicalAddress: number,
        readonly addressBytesLength: number
    ) {
        this.buf = Buffer.from([(addressType.value << 6) | (logicalAddress << 4) | (addressBytesLength)]);
    }

    frameBytes(): Buffer {
        return this.buf;
    }
}

// 地址域
export default class AddressField {
    readonly buf : Buffer;
    readonly len: number;
    constructor(
        readonly feature : AddressFeature,
        readonly addressBytes : number[],
    ) {
        this.feature = feature;
        this.buf = Buffer.from([feature.buf.at(0)!, ...addressBytes])
        this.len = addressBytes.length + 1;
    }

    static of(addressType: AddressType, logicAddress: number, addressBytes: number[]) {
        return new AddressField(new AddressFeature(addressType, logicAddress, addressBytes.length), addressBytes)
    }
}