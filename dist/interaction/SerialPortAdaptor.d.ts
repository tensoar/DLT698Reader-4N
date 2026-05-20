import { type SerialPortOpenOptions } from "serialport";
import type InteractionAdapter from "./InteractionAdapter.js";
export default class SerialPortAdaprot implements InteractionAdapter {
    private readonly port;
    constructor(options: SerialPortOpenOptions<any>);
    open(): Promise<boolean>;
    close(): Promise<boolean>;
    send(data: Buffer): Promise<boolean>;
    onData(cb: (data: Buffer) => void): void;
    isOpen(): boolean;
}
//# sourceMappingURL=SerialPortAdaptor.d.ts.map