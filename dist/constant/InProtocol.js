export class DIR {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static FROM_CLIENT = new DIR(0, "客户机发出");
    static FROM_SERVER = new DIR(1, "服务器发出");
}
export class PRM {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static SERVER_INITIATED = new PRM(0, "服务器发起");
    static CLIENT_INITIATED = new PRM(1, "客户机发起");
}
export class AddressType {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static SINGLE = new AddressType(0, "单地址");
    static WILDCARD = new AddressType(1, "通配地址");
    static GROUP = new AddressType(2, "组地址");
    static BROADCAST = new AddressType(3, "广播地址");
}
export class MessageRole {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static CLIENT_RESPONSE = new MessageRole(0, "客户机对服务器上报的响应");
    static CLIENT_REQUEST = new MessageRole(1, "客户机发起的请求");
    static SERVER_REPORT = new MessageRole(2, "服务器发起的上报");
    static SERVER_RESPONSE = new MessageRole(3, "服务器对客户机请求的响应");
}
export class FunctionCode {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static LINK_DATA = new FunctionCode(1, "链路数据");
    static USER_DATA = new FunctionCode(3, "用户数据");
}
export class ClientAPDUType {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static CONNECT_REQUEST = new ClientAPDUType(2, "建立应用连接请求");
    static RELEASE_REQUEST = new ClientAPDUType(3, "断开应用连接请求");
    static GET_REQUEST = new ClientAPDUType(5, "读取请求");
}
export class ServerAPDUType {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static CONNECT_RESPONSE = new ServerAPDUType(2, "建立应用连接响应");
    static RELEASE_RESPONSE = new ServerAPDUType(3, "断开应用连接响应");
    static GET_RESPONSE = new ServerAPDUType(5, "读取响应");
}
export class GetRequestType {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static NORMAL = new GetRequestType(1, "请求读取一个对象属性");
    static NORMAL_LIST = new GetRequestType(2, "请求读取若干个对象属性");
    static RECORD = new GetRequestType(3, "请求读取一个记录型对象属性");
    static RECORD_LIST = new GetRequestType(4, "请求读取若干个记录型对象属性");
    static NEXT = new GetRequestType(5, "请求读取分帧传输的下一帧");
}
export class GetResponseType {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static GET_RESPONSE_NORMAL = new GetResponseType(1, "读取一个对象属性的响应");
    static GET_RESPONSE_NORMAL_LIST = new GetResponseType(2, "读取若干个对象属性的响应");
    static GET_RESPONSE_RECORD = new GetResponseType(3, "读取一个记录型对象属性的响应");
    static GET_RESPONSE_RECORD_LIST = new GetResponseType(4, "读取若干个记录型对象属性的响应");
    static GET_RESPONSE_NEXT = new GetResponseType(5, "读取分帧传输的下一帧的响应");
}
export class FrameCheckResult {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static OK = new FrameCheckResult(0, "ok");
    static HEADER_CRC_ERROR = new FrameCheckResult(1, "帧头校验错误");
    static FRAME_CRC_ERROR = new FrameCheckResult(2, "帧校验错误");
    static FRAME_LENGTH_ERROR = new FrameCheckResult(3, "帧长度错误");
    static START_MARK_ERROR = new FrameCheckResult(4, "起始符错误");
    static END_MARK_ERROR = new FrameCheckResult(5, "结束符错误");
}
export class FrameType {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static START = new FrameType(0b00, "起始帧");
    static ACK = new FrameType(0b10, "确认帧");
    static END = new FrameType(0b01, "最后帧");
    static MID = new FrameType(0b11, "中间帧");
}
//# sourceMappingURL=InProtocol.js.map