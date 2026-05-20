import { SerialPort } from "serialport";
export default class SerialPortAdaprot {
    port;
    constructor(options) {
        this.port = new SerialPort(options);
    }
    open() {
        return new Promise((resolve, reject) => {
            this.port.open(err => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.port.close(err => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    send(data) {
        return new Promise((resolve, reject) => {
            this.port.write(data, err => {
                if (err) {
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    onData(cb) {
        this.port.on('data', cb);
    }
    isOpen() {
        return this.port.isOpen;
    }
}
//# sourceMappingURL=SerialPortAdaptor.js.map