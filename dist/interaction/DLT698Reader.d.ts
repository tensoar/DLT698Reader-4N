import type GetRecord from "../frame/apdu/request/GetRecord.js";
import GetRequestNormal from "../frame/apdu/request/GetRequestNormal.js";
import GetRequestNormalList from "../frame/apdu/request/GetRequestNormalList.js";
import GetRequestRecord from "../frame/apdu/request/GetRequestRecord.js";
import GetRequestRecordList from "../frame/apdu/request/GetRequestRecordList.js";
import GetResponseNormal from "../frame/apdu/response/GetResponseNormal.js";
import GetResponseNormalList from "../frame/apdu/response/GetResponseNormalList.js";
import GetResponseRecord from "../frame/apdu/response/GetResponseRecord.js";
import GetResponseRecordList from "../frame/apdu/response/GetResponseRecordList.js";
import type { AbsBaseDataType } from "../frame/data-type/base/AbsBaseDataType.js";
import { type OAD } from "../frame/data-type/index.js";
import AddressField from "../frame/field/AddressField.js";
import GetRequestFrame from "../frame/GetRequestFrame.js";
import DLT698Client from "./DLT698Client.js";
export default class DLT698Reader {
    private readonly client;
    constructor(client: DLT698Client);
    openConnection(): Promise<boolean>;
    closeConnection(): Promise<boolean>;
    private readFullFrames;
    getRequestNormal(frame: GetRequestFrame<GetRequestNormal>): Promise<GetResponseNormal<AbsBaseDataType<any>>>;
    getRequestNormalList(frame: GetRequestFrame<GetRequestNormalList>): Promise<GetResponseNormalList>;
    getRequestRecord(frame: GetRequestFrame<GetRequestRecord>): Promise<GetResponseRecord>;
    getRequestRecordList(frame: GetRequestFrame<GetRequestRecordList>): Promise<GetResponseRecordList>;
    getRequestNormalSimple(addressField: AddressField, oad: OAD, isSecurity: boolean): Promise<GetResponseNormal<AbsBaseDataType<any>>>;
    getRequestNormalListSimple(addressField: AddressField, oadList: OAD[], isSecurity: boolean): Promise<GetResponseNormalList>;
    getRequestRecordSimple(addressField: AddressField, getRecord: GetRecord, isSecurity: boolean): Promise<GetResponseRecord>;
    getRequestRecordListSimple(addressField: AddressField, getRecordList: GetRecord[], isSecurity: boolean): Promise<GetResponseRecordList>;
}
//# sourceMappingURL=DLT698Reader.d.ts.map