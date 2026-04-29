import type IBaseEnum from "./IBaseEnum.js"

export class DIR implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly FROM_CLIENT = new DIR(0, "客户机发出");
    static readonly FROM_SERVER = new DIR(1, "服务器发出");
}

export class PRM implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly SERVER_INITIATED = new PRM(0, "服务器发起");
    static readonly CLIENT_INITIATED = new PRM(1, "客户机发起");
}

export class AddressType implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly SINGLE = new AddressType(0, "单地址");
    static readonly WILDCARD = new AddressType(1, "通配地址");
    static readonly GROUP = new AddressType(2, "组地址");
    static readonly BROADCAST = new AddressType(3, "广播地址");
}

export class MessageRole implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly CLIENT_RESPONSE = new MessageRole(0, "客户机对服务器上报的响应");
    static readonly CLIENT_REQUEST = new MessageRole(1, "客户机发起的请求");
    static readonly SERVER_REPORT = new MessageRole(2, "服务器发起的上报");
    static readonly SERVER_RESPONSE = new MessageRole(3, "服务器对客户机请求的响应");
}

export class FunctionCode implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly LINK_DATA = new FunctionCode(1, "链路数据");
    static readonly USER_DATA = new FunctionCode(3, "用户数据");
}

export class ClientAPDUType implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly CONNECT_REQUEST = new ClientAPDUType(2, "建立应用连接请求");
    static readonly RELEASE_REQUEST = new ClientAPDUType(3, "断开应用连接请求")
    static readonly GET_REQUEST = new ClientAPDUType(5, "读取请求");
}

export class ServerAPDUType implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly CONNECT_RESPONSE = new ServerAPDUType(2, "建立应用连接响应");
    static readonly RELEASE_RESPONSE = new ServerAPDUType(3, "断开应用连接响应")
    static readonly GET_RESPONSE = new ServerAPDUType(5, "读取响应");
}

export class GetRequestType implements IBaseEnum<number> {
    private constructor(
        public readonly value: number,
        public readonly description: string
    ) {}

    static readonly NORMAL = new GetRequestType(1, "请求读取一个对象属性");
    static readonly NORMAL_LIST = new GetRequestType(2, "请求读取若干个对象属性");
    static readonly RECORD = new GetRequestType(3, "请求读取一个记录型对象属性");
    static readonly RECORD_LIST = new GetRequestType(4, "请求读取若干个记录型对象属性");
    static readonly NEXT = new GetRequestType(5, "请求读取分帧传输的下一帧");
}
