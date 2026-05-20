import { SerialPort, type SerialPortOpenOptions } from "serialport";
import type InteractionAdapter from "./InteractionAdapter.js";

export default class SerialPortAdaprot implements InteractionAdapter {

    private readonly port: SerialPort;

    constructor(options: SerialPortOpenOptions<any>) {
        this.port = new SerialPort(options);
    }

    open(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.port.open(err => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    close(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.port.close(err => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    send(data: Buffer): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.port.write(data, err => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    onData(cb: (data: Buffer) => void): void {
        this.port.on('data', cb);
    }

    isOpen(): boolean {
        return this.port.isOpen;
    }

}