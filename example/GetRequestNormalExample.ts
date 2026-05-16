
// const controlField = new ControlField(MessageRole.CLIENT_REQUEST, 0, 0, FunctionCode.USER_DATA);
// const addressField =AddressField.of(AddressType.SINGLE, 0, [0, 0, 0, 0, 0, 1], 0)

// const oadList: OAD[] = []
// for (let i = 0; i < 20; i ++) {
//     oadList.push(OAD.BasicParam.Address)
//     oadList.push(OAD.BasicParam.AmmeterNo)
// }
// const apdu = new GetRequestNormalList(new PIID(0, 1), oadList)
// const getRequestFrame = new GetRequestFrame(addressField, controlField, apdu, true)
// console.log(getRequestFrame.frameBuf.toReadableHexString());

// const oad = OAD.of(0x30, 0x1d, 0x02, 0x00);
// const rsd = RecordSelectionDesc.selectLatestNumber(2);
// const rcsd = new RecordColumnSelectionDesc([OAD.of(0x20, 0x22, 0x02, 0x00), OAD.of(0x20, 0x1e, 0x02, 0x00)])
// const getRecord = new GetRecord(oad, rsd, rcsd)
// const apdu = new GetRequestRecordList(new PIID(0, 1), [getRecord, getRecord]);
// const getRequestFrame = new GetRequestFrame(addressField, controlField, apdu, false)
// console.log(getRequestFrame.frameBuf.toReadableHexString());