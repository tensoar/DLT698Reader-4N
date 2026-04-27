import  { AddressType } from "../../constant/InProtocol.js";
import type IFragment from "../IFragment.js";
import {Buffer} from "node:buffer";

// 地址特征
export class AddressFeature implements IFragment {
    private readonly buf : Buffer;
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
export default class AddressField implements IFragment {
    private readonly buf : Buffer;
    readonly len: number;
    constructor(
        readonly feature : AddressFeature,
        readonly addressBytes : number[],
        readonly clientAddress: number
    ) {
        this.feature = feature;
        this.buf = Buffer.from([feature.frameBytes().at(0)!, ...addressBytes, clientAddress]);
        this.len = addressBytes.length + 1;
    }

    static readonly WILDCARD_ADDRESS = AddressField.of(AddressType.WILDCARD, 0, [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa], 0);

    static of(addressType: AddressType, logicAddress: number, addressBytes: number[], clientAddress: number): AddressField {
        return new AddressField(new AddressFeature(addressType, logicAddress, addressBytes.length), addressBytes, clientAddress)
    }

    frameBytes(): Buffer {
        return this.buf;
    }
}

console.log(AddressField.WILDCARD_ADDRESS.frameBytes().toString("hex"));