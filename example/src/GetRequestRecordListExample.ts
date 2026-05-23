// Example - 读取多个记录型对象(GetRequestRecordList)
import {AddressField, OAD, SerialPortAdaptor, DLT698Client, DLT698Reader, GetRecord, RecordSelectionDesc, RecordColumnSelectionDesc} from "DLT698Reader-4N"

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