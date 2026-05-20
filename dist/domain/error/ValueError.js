export default class ValueError extends Error {
    value;
    exposed;
    constructor(value, exposed) {
        super(`Value is invalid, value: ${value}, exposed: ${exposed}`);
        this.value = value;
        this.exposed = exposed;
    }
}
//# sourceMappingURL=ValueError.js.map