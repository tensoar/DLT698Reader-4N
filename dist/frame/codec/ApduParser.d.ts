import ParseResult from "../../domain/ParseResult.js";
import GetResponseFrame from "../GetResponseFrame.js";
import GetResponseNormal from "../apdu/response/GetResponseNormal.js";
import GetResponseNormalList from "../apdu/response/GetResponseNormalList.js";
import GetResponseRecord from "../apdu/response/GetResponseRecord.js";
import GetResponseRecordList from "../apdu/response/GetResponseRecordList.js";
export default class ApduParser {
    static parseResponseApdu(frames: GetResponseFrame[]): ParseResult<null> | GetResponseNormal<import("../data-type/base/AbsBaseDataType.js").AbsBaseDataType<any>> | GetResponseNormalList | GetResponseRecord | GetResponseRecordList;
}
//# sourceMappingURL=ApduParser.d.ts.map