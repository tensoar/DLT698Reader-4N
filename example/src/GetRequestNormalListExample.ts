// Example - 读取多个普通对象属性(GetRequestNormalList)
import {AddressField, OAD, SerialPortAdaptor, DLT698Client, DLT698Reader, AddressType} from "DLT698Reader-4N"

const adaptor = new SerialPortAdaptor({
    path: "/dev/ttyS1",
    baudRate: 9600,
    autoOpen: false,
});
const client = new DLT698Client(adaptor);
const reader = new DLT698Reader(client);
if (!await reader.openConnection()) {
    throw new Error(`Open connection failed ...`);
}
console.log(`Connection opened ...`);

/** 读取地址 */
const oadList = [
    OAD.of(0x20, 0x01, 0x02, 0x00), // 电流
    OAD.of(0x20, 0x04, 0x02, 0x00), // 有功功率
    OAD.of(0x20, 0x05, 0x02, 0x00), // 有功功率
];
const addressFiledWild = AddressField.WILDCARD_ADDRESS;

try {
    const result = await reader.getRequestNormalListSimple(addressFiledWild, oadList, true);
    console.log(`Ammeter C: `, result.getResultByOad(oadList[0]!)?.result.data);
    console.log(`Ammeter P: `, result.getResultByOad(oadList[1]!)?.result.data);
    console.log(`Ammeter Q: `, result.getResultByOad(oadList[2]!)?.result.data);
} catch (e) {
    throw e;
} finally {
    await reader.closeConnection();
}