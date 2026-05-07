import  { AddressType } from "../../constant/InProtocol.js";
import type IFragment from "../IFragment.js";
import {ByteBuf} from "../../domain/ByteBuf.js";

// 地址特征
export class AddressFeature implements IFragment {
    private readonly buf : ByteBuf;
    constructor(
        readonly addressType: AddressType,
        readonly logicalAddress: number,
        readonly addressBytesLength: number
    ) {
        this.buf = ByteBuf.of((addressType.value << 6) | (logicalAddress << 4) | (addressBytesLength - 1));
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }
}

// 地址域
export default class AddressField implements IFragment {
    private readonly buf : ByteBuf;
    readonly len: number;
    constructor(
        readonly feature : AddressFeature,
        readonly addressBytes : number[],
        readonly clientAddress: number
    ) {
        this.feature = feature;
        this.buf = ByteBuf.allocate(addressBytes.length + 2)
        this.buf.writeBytesBE(feature.frameBuf)
        this.buf.writeBytesBE(addressBytes.reverse())
        this.buf.writeBytesBE([clientAddress])
        this.len = addressBytes.length + 1;
    }

    static readonly WILDCARD_ADDRESS = AddressField.of(AddressType.WILDCARD, 0, [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa], 0);

    static of(addressType: AddressType, logicAddress: number, addressBytes: number[], clientAddress: number): AddressField {
        return new AddressField(new AddressFeature(addressType, logicAddress, addressBytes.length), addressBytes, clientAddress)
    }

    get frameBuf(): ByteBuf {
        return this.buf;
    }
}