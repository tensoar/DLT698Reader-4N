import { AddressType } from "../../constant/InProtocol.js";
import type IFragment from "../IFragment.js";
import { ByteBuf } from "../../domain/ByteBuf.js";
export declare class AddressFeature implements IFragment {
    readonly addressType: AddressType;
    readonly logicalAddress: number;
    readonly addressBytesLength: number;
    private readonly buf;
    constructor(addressType: AddressType, logicalAddress: number, addressBytesLength: number);
    get frameBuf(): ByteBuf;
    static parse(buf: ByteBuf): AddressFeature;
}
export default class AddressField implements IFragment {
    readonly feature: AddressFeature;
    readonly addressBytes: number[];
    readonly clientAddress: number;
    private readonly buf;
    readonly len: number;
    readonly serverAddressStr: string;
    constructor(feature: AddressFeature, addressBytes: number[], clientAddress: number);
    static readonly WILDCARD_ADDRESS: AddressField;
    static of(addressType: AddressType, logicAddress: number, addressBytes: number[], clientAddress: number): AddressField;
    static parse(buf: ByteBuf): AddressField;
    get frameBuf(): ByteBuf;
}
//# sourceMappingURL=AddressField.d.ts.map