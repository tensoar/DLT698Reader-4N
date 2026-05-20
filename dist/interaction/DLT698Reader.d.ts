import type GetRequestNormal from "../frame/apdu/request/GetRequestNormal.js";
import type GetRequestNormalList from "../frame/apdu/request/GetRequestNormalList.js";
import type GetRequestRecord from "../frame/apdu/request/GetRequestRecord.js";
import type GetRequestRecordList from "../frame/apdu/request/GetRequestRecordList.js";
import type GetResponseNormal from "../frame/apdu/response/GetResponseNormal.js";
import type GetResponseNormalList from "../frame/apdu/response/GetResponseNormalList.js";
import type GetResponseRecord from "../frame/apdu/response/GetResponseRecord.js";
import type GetResponseRecordList from "../frame/apdu/response/GetResponseRecordList.js";
import type GetRequestFrame from "../frame/GetRequestFrame.js";
import DLT698Client from "./DLT698Client.js";
export default class DLT698Reader {
    private readonly client;
    constructor(client: DLT698Client);
    openConnection(): Promise<boolean>;
    closeConnection(): Promise<boolean>;
    private readFullFrames;
    getRequestNormal(frame: GetRequestFrame<GetRequestNormal>): Promise<GetResponseNormal<any>>;
    getRequestNormalList(frame: GetRequestFrame<GetRequestNormalList>): Promise<GetResponseNormalList>;
    getRequestRecord(frame: GetRequestFrame<GetRequestRecord>): Promise<GetResponseRecord>;
    getRequestRecordList(frame: GetRequestFrame<GetRequestRecordList>): Promise<GetResponseRecordList>;
}
//# sourceMappingURL=DLT698Reader.d.ts.map