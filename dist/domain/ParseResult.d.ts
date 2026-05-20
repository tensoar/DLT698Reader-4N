export default class ParseResult<T> {
    readonly success: boolean;
    readonly value: T | null;
    readonly message: string;
    constructor(success: boolean, value: T | null, message: string);
    static sucess<T>(value: T): ParseResult<T>;
    static fail(message: string): ParseResult<null>;
}
//# sourceMappingURL=ParseResult.d.ts.map