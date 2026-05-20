import type IBaseEnum from "./IBaseEnum.js";
export declare class DIR implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly FROM_CLIENT: DIR;
    static readonly FROM_SERVER: DIR;
}
export declare class PRM implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly SERVER_INITIATED: PRM;
    static readonly CLIENT_INITIATED: PRM;
}
export declare class AddressType implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly SINGLE: AddressType;
    static readonly WILDCARD: AddressType;
    static readonly GROUP: AddressType;
    static readonly BROADCAST: AddressType;
}
export declare class MessageRole implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly CLIENT_RESPONSE: MessageRole;
    static readonly CLIENT_REQUEST: MessageRole;
    static readonly SERVER_REPORT: MessageRole;
    static readonly SERVER_RESPONSE: MessageRole;
}
export declare class FunctionCode implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly LINK_DATA: FunctionCode;
    static readonly USER_DATA: FunctionCode;
}
export declare class ClientAPDUType implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly CONNECT_REQUEST: ClientAPDUType;
    static readonly RELEASE_REQUEST: ClientAPDUType;
    static readonly GET_REQUEST: ClientAPDUType;
}
export declare class ServerAPDUType implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly CONNECT_RESPONSE: ServerAPDUType;
    static readonly RELEASE_RESPONSE: ServerAPDUType;
    static readonly GET_RESPONSE: ServerAPDUType;
}
export declare class GetRequestType implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly NORMAL: GetRequestType;
    static readonly NORMAL_LIST: GetRequestType;
    static readonly RECORD: GetRequestType;
    static readonly RECORD_LIST: GetRequestType;
    static readonly NEXT: GetRequestType;
}
export declare class GetResponseType implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly GET_RESPONSE_NORMAL: GetResponseType;
    static readonly GET_RESPONSE_NORMAL_LIST: GetResponseType;
    static readonly GET_RESPONSE_RECORD: GetResponseType;
    static readonly GET_RESPONSE_RECORD_LIST: GetResponseType;
    static readonly GET_RESPONSE_NEXT: GetResponseType;
}
export declare class FrameCheckResult implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly OK: FrameCheckResult;
    static readonly HEADER_CRC_ERROR: FrameCheckResult;
    static readonly FRAME_CRC_ERROR: FrameCheckResult;
    static readonly FRAME_LENGTH_ERROR: FrameCheckResult;
    static readonly START_MARK_ERROR: FrameCheckResult;
    static readonly END_MARK_ERROR: FrameCheckResult;
}
export declare class FrameType implements IBaseEnum<number> {
    readonly value: number;
    readonly description: string;
    private constructor();
    static readonly START: FrameType;
    static readonly ACK: FrameType;
    static readonly END: FrameType;
    static readonly MID: FrameType;
}
//# sourceMappingURL=InProtocol.d.ts.map