# DLT698Reader-4N

DLT698协议读取解析实现，自动处理分帧，支持的读取类型：
* 读取一个对象属性(`GetRequestNormal`)
* 读取若干个对象属性(`GetRequestNormalList`)
* 读取一个记录型对象属性(`GetRequestRecord`)
* 读取若干个记录型对象属性(`GetRequestRecordList`)

# 读取一个对象属性(`GetRequestNormal`)

```typescript
import {AddressField, OAD, SerialPortAdaptor, DLT698Client, DLT698Reader, AddressType} from "DLT698Reader-4N"

// 内置串口适配器，可以自定义实现InteractionAdapter接口来支持其他协议通信
const adaptor = new SerialPortAdaptor({
    path: "COM1",
    baudRate: 9600,
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
```

## 读取若干个对象属性(`GetRequestNormalList`)

```typescript
import {AddressField, OAD, SerialPortAdaptor, DLT698Client, DLT698Reader, AddressType} from "DLT698Reader-4N"

const adaptor = new SerialPortAdaptor({
    path: "/dev/ttyS1",
    baudRate: 9600,
    autoOpen: false,
});
const client = new DLT698Client(adaptor, true, 3000);
const reader = new DLT698Reader(client);
if (!await reader.openConnection()) {
    throw new Error(`Open connection failed ...`);
}
console.log(`Connection opened ...`);

const oadList = [
    OAD.of(0x20, 0x01, 0x02, 0x00),
    OAD.of(0x20, 0x04, 0x02, 0x00),
    OAD.of(0x20, 0x05, 0x02, 0x00),
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
```

## 读取一个记录型对象属性(`GetRequestRecord`)

```typescript
import {AddressField, OAD, SerialPortAdaptor, DLT698Client, DLT698Reader, GetRecord, RecordSelectionDesc, RecordColumnSelectionDesc} from "DLT698Reader-4N"

const adaptor = new SerialPortAdaptor({
    path: "COM1",
    baudRate: 9600,
    autoOpen: false,
});
const client = new DLT698Client(adaptor, true, 3000);
const reader = new DLT698Reader(client);
if (!await reader.openConnection()) {
    throw new Error(`Open connection failed ...`);
}
console.log(`Connection opened ...`);

/** 读取失压事件(30 00 02 00) */
const oad = OAD.of(0x30, 0x00, 0x02, 0x00); //

try {
    const rsd = RecordSelectionDesc.selectLatestNumber(5); // 最新的5条
    const rcsd = new RecordColumnSelectionDesc([]); // 全部属性
    const getRecord = new GetRecord(oad, rsd, rcsd);
    const result = await reader.getRequestRecordSimple(AddressField.WILDCARD_ADDRESS, getRecord, true);
    // 属性表
    const relatedOadList = result.resultRecord.rcsd.relatedColumOadList;
    // 属性值列表
    const dataList = result.resultRecord.recordRow?.dataList;
    if (!dataList || dataList.length == 0) {
        console.log(`Event is empty ...`);
    } else {
        for (let i = 0; i < relatedOadList.length; i ++) {
            console.log(`Colum OAD: { ${relatedOadList[i]?.toString() } }, data: { Type Mark: ${dataList[i]?.mark}, Value: ${dataList[i]?.value} }`)
        }
    }
} catch (e) {
    throw e;
} finally {
    await reader.closeConnection();
}
```

## 读取若干个记录型对象属性(`GetRequestRecordList`)

```typescript
import {AddressField, OAD, SerialPortAdaptor, DLT698Client, DLT698Reader, GetRecord, RecordSelectionDesc, RecordColumnSelectionDesc} from "DLT698Reader-4N"

const adaptor = new SerialPortAdaptor({
    path: "COM1",
    baudRate: 9600,
    autoOpen: false,
});
const client = new DLT698Client(adaptor, true, 3000);
const reader = new DLT698Reader(client);
if (!await reader.openConnection()) {
    throw new Error(`Open connection failed ...`);
}
console.log(`Connection opened ...`);

/** 读取失压事件*/
const oadList = [
     OAD.of(0x30, 0x00, 0x02, 0x00), // 失压事件
     OAD.of(0x30, 0x13, 0x02, 0x00)  // 清零事件
]

try {
    const rsd = RecordSelectionDesc.selectLatestNumber(5); // 最新的5条
    const rcsd = new RecordColumnSelectionDesc([]); // 全部属性
    const getRecordList = oadList.map(oad => new GetRecord(oad, rsd, rcsd));
    const result = await reader.getRequestRecordListSimple(AddressField.WILDCARD_ADDRESS, getRecordList, true);
    const recordList = result.resultRecordList;
    for (const record of recordList) {
        console.log(`------< Event OAD: ${record.oad.toReadableString()} >-----`);
        // 关联属性表
        const relatedOadList = record.rcsd.relatedColumOadList;
        // 属性值列表
        const dataList = record.recordRow?.dataList;
        if (!dataList || dataList.length == 0) {
            console.log(`Event is empty ...`);
        } else {
            for (let i = 0; i < relatedOadList.length; i ++) {
                console.log(`Colum OAD: { ${relatedOadList[i]?.toString() } }, data: { Type Mark: ${dataList[i]?.mark}, Value: ${dataList[i]?.value} }`)
            }
        }
    }
} catch (e) {
    throw e;
} finally {
    await reader.closeConnection();
}
```