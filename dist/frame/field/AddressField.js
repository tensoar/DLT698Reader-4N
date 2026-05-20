import { AddressType } from "../../constant/InProtocol.js";
import { ByteBuf } from "../../domain/ByteBuf.js";
import EnumUtil from "../../utils/EnumUtil.js";
// 地址特征
export class AddressFeature {
    addressType;
    logicalAddress;
    addressBytesLength;
    buf;
    constructor(addressType, logicalAddress, addressBytesLength) {
        this.addressType = addressType;
        this.logicalAddress = logicalAddress;
        this.addressBytesLength = addressBytesLength;
        this.buf = ByteBuf.of((addressType.value << 6) | (logicalAddress << 4) | (addressBytesLength - 1));
    }
    get frameBuf() {
        return this.buf;
    }
    static parse(buf) {
        const feature = buf.readUInt8();
        const addressBytesLength = (feature & 0x0F) + 1;
        const logicalAddress = (feature >> 4) & 0x03;
        const addressTypeValue = (feature >> 6) & 0x03;
        const addressType = EnumUtil.fromValue(AddressType, addressTypeValue);
        return new AddressFeature(addressType, logicalAddress, addressBytesLength);
    }
}
// 地址域
export default class AddressField {
    feature;
    addressBytes;
    clientAddress;
    buf;
    len;
    serverAddressStr;
    constructor(feature, addressBytes, clientAddress) {
        this.feature = feature;
        this.addressBytes = addressBytes;
        this.clientAddress = clientAddress;
        this.feature = feature;
        this.buf = ByteBuf.allocate(addressBytes.length + 2);
        this.buf.writeBytesBE(feature.frameBuf);
        this.buf.writeBytesBE(addressBytes.reverse());
        this.buf.writeBytesBE([clientAddress]);
        this.len = addressBytes.length + 1;
        this.serverAddressStr = ByteBuf.from(addressBytes).readHexLE(addressBytes.length);
    }
    static WILDCARD_ADDRESS = AddressField.of(AddressType.WILDCARD, 0, [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa], 0);
    static of(addressType, logicAddress, addressBytes, clientAddress) {
        return new AddressField(new AddressFeature(addressType, logicAddress, addressBytes.length), addressBytes, clientAddress);
    }
    static parse(buf) {
        const feature = AddressFeature.parse(buf);
        const addressBytes = buf.readBytesBE(feature.addressBytesLength);
        const clientAddress = buf.readUInt8();
        return new AddressField(feature, addressBytes, clientAddress);
    }
    get frameBuf() {
        return this.buf;
    }
}
//# sourceMappingURL=AddressField.js.map