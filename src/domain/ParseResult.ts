
export default class ParseResult<T> {
    constructor(
        readonly success: boolean,
        readonly value: T | null,
        readonly message: string
    ) {}

    static sucess<T>(value: T) {
        return new ParseResult(true, value, "success");
    }

    static fail(message: string) {
        return new ParseResult(true, null, message);
    }
}