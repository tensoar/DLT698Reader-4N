
export default class ValueError extends Error {
    readonly value: any;
    readonly exposed: string;
    constructor(value: any, exposed: string) {
        super(`Value is invalid, value: ${value}, exposed: ${exposed}`);
        this.value = value;
        this.exposed = exposed;
    }
}