// Example - 读取一个普通对象属性(GetRequestNormal)
import {AddressField, OAD, SerialPortAdaptor, DLT698Client, DLT698Reader, AddressType} from "DLT698Reader-4N"

const adaptor = new SerialPortAdaptor({
    path: "com1",
    baudRate: 2400,
    autoOpen: false,
});
const client = new DLT698Client(adaptor, true, 3000);
const reader = new DLT698Reader(client);
if (!await reader.openConnection()) {
    throw new Error(`Open connection failed ...`);
}
console.log(`Connection opened ...`);

/** 读取地址 */
const oad = OAD.BasicParam.Address;
const addressFiledWild = AddressField.WILDCARD_ADDRESS;
let address = "";
try {
    const addressResult = await reader.getRequestNormalSimple(addressFiledWild, oad, false);
    address = addressResult.resultNormal.result.data?.value;
    console.log(`Ammeter address: `, address);
} catch (e) {
    await reader.closeConnection();
    throw e;
}


/** 读取电压 */
const addressField = AddressField.of(AddressType.SINGLE, 0, address, 0);
try {
    const oad = OAD.of(0x20, 0x00, 0x02, 0x00);
    const result = await reader.getRequestNormalSimple(addressField, oad, true);
    console.log(`Ammeter V: `, result.resultNormal.result.data?.value);
} catch (e) {
    throw e;
} finally {
    await reader.closeConnection();
}