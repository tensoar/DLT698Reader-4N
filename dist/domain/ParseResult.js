export default class ParseResult {
    success;
    value;
    message;
    constructor(success, value, message) {
        this.success = success;
        this.value = value;
        this.message = message;
    }
    static sucess(value) {
        return new ParseResult(true, value, "success");
    }
    static fail(message) {
        return new ParseResult(true, null, message);
    }
}
//# sourceMappingURL=ParseResult.js.map