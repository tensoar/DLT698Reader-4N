export class ByteBuf {
    private buffer: Buffer;
    private writeIndex: number;
    private readIndex: number;
    private capacity: number;

    private static readonly DEFAULT_CAPACITY = 128;
    private static readonly EXPAND_FACTOR = 2;

    public static allocate(initialCapacity: number = ByteBuf.DEFAULT_CAPACITY): ByteBuf {
        return new ByteBuf(initialCapacity);
    }

    public static wrap(buffer: Buffer): ByteBuf {
        const buf = new ByteBuf(buffer.length);
        buf.writeBuffer(buffer);
        buf.resetReadIndex();
        return buf;
    }

    public static from(
        data: string | number[]
    ): ByteBuf {
        const buf = Buffer.from(data);
        return ByteBuf.wrap(buf);
    }

    public static of(...bytes: number[]): ByteBuf {
        const buffer = Buffer.from(bytes);
        return ByteBuf.wrap(buffer);
    }

    private constructor(initialCapacity: number) {
        this.capacity = Math.max(initialCapacity, 16);
        this.buffer = Buffer.alloc(this.capacity);
        this.writeIndex = 0;
        this.readIndex = 0;
    }

    private ensureWritable(bytes: number) {
        const required = this.writeIndex + bytes;
        if (required <= this.capacity) return;

        let newCapacity = this.capacity;
        while (newCapacity < required) {
            newCapacity = Math.floor(newCapacity * ByteBuf.EXPAND_FACTOR);
        }
        console.debug(`ByteBuf: Expand capacity from ${this.capacity} to ${newCapacity}`);
        const newBuf = Buffer.alloc(newCapacity);
        this.buffer.copy(newBuf, 0, 0, this.writeIndex);
        this.buffer = newBuf;
        this.capacity = newCapacity;
    }

    // 读取方法
    public readUInt8(): number {
        const val = this.buffer.readUInt8(this.readIndex);
        this.readIndex += 1;
        return val;
    }

    public readInt8(): number {
        const val = this.buffer.readInt8(this.readIndex);
        this.readIndex += 1;
        return val;
    }

    public readUInt16BE(): number {
        const val = this.buffer.readUInt16BE(this.readIndex);
        this.readIndex += 2;
        return val;
    }

    public readUInt16LE(): number {
        const val = this.buffer.readUInt16LE(this.readIndex);
        this.readIndex += 2;
        return val;
    }

    public readInt16BE(): number {
        const val = this.buffer.readInt16BE(this.readIndex);
        this.readIndex += 2;
        return val;
    }

    public readInt16LE(): number {
        const val = this.buffer.readInt16LE(this.readIndex);
        this.readIndex += 2;
        return val;
    }

    public readUInt32BE(): number {
        const val = this.buffer.readUInt32BE(this.readIndex);
        this.readIndex += 4;
        return val;
    }

    public readUInt32LE(): number {
        const val = this.buffer.readUInt32LE(this.readIndex);
        this.readIndex += 4;
        return val;
    }

    public readInt32BE(): number {
        const val = this.buffer.readInt32BE(this.readIndex);
        this.readIndex += 4;
        return val;
    }

    public readInt32LE(): number {
        const val = this.buffer.readInt32LE(this.readIndex);
        this.readIndex += 4;
        return val;
    }

    public readFloatBE(): number {
        const val = this.buffer.readFloatBE(this.readIndex);
        this.readIndex += 4;
        return val;
    }

    public readFloatLE(): number {
        const val = this.buffer.readFloatLE(this.readIndex);
        this.readIndex += 4;
        return val;
    }

    public readDoubleBE(): number {
        const val = this.buffer.readDoubleBE(this.readIndex);
        this.readIndex += 8;
        return val;
    }

    public readDoubleLE(): number {
        const val = this.buffer.readDoubleLE(this.readIndex);
        this.readIndex += 8;
        return val;
    }

    public readBuffer(length: number): Buffer {
        const slice = this.buffer.subarray(this.readIndex, this.readIndex + length);
        this.readIndex += length;
        return slice;
    }

    public readString(length: number): string {
        const str = this.buffer.toString('utf8', this.readIndex, this.readIndex + length);
        this.readIndex += length;
        return str;
    }

    public readAscii(length: number): string {
        const str = this.buffer.toString('ascii', this.readIndex, this.readIndex + length);
        this.readIndex += length;
        return str;
    }

    public readHex(length: number): string {
        const str = this.buffer.toString('hex', this.readIndex, this.readIndex + length).toUpperCase();
        this.readIndex += length;
        return str;
    }

    public skipBytes(length: number) {
        if (this.readIndex + length > this.writeIndex) {
            throw new RangeError(`skipBytes: Unable skip ${length} bytes, readable bytes length = ${this.readableBytes()}`);
        }
        this.readIndex += length;
    }

    // 写入方法
    public writeUInt8(value: number) {
        this.ensureWritable(1);
        this.buffer.writeUInt8(value, this.writeIndex);
        this.writeIndex += 1;
    }

    public writeInt8(value: number) {
        this.ensureWritable(1);
        this.buffer.writeInt8(value, this.writeIndex);
        this.writeIndex += 1;
    }

    public writeUInt16BE(value: number) {
        this.ensureWritable(2);
        this.buffer.writeUInt16BE(value, this.writeIndex);
        this.writeIndex += 2;
    }

    public writeUInt16LE(value: number) {
        this.ensureWritable(2);
        this.buffer.writeUInt16LE(value, this.writeIndex);
        this.writeIndex += 2;
    }

    public writeInt16BE(value: number) {
        this.ensureWritable(2);
        this.buffer.writeInt16BE(value, this.writeIndex);
        this.writeIndex += 2;
    }

    public writeInt16LE(value: number) {
        this.ensureWritable(2);
        this.buffer.writeInt16LE(value, this.writeIndex);
        this.writeIndex += 2;
    }

    public writeUInt32BE(value: number) {
        this.ensureWritable(4);
        this.buffer.writeUInt32BE(value, this.writeIndex);
        this.writeIndex += 4;
    }

    public writeUInt32LE(value: number) {
        this.ensureWritable(4);
        this.buffer.writeUInt32LE(value, this.writeIndex);
        this.writeIndex += 4;
    }

    public writeInt32BE(value: number) {
        this.ensureWritable(4);
        this.buffer.writeInt32BE(value, this.writeIndex);
        this.writeIndex += 4;
    }

    public writeInt32LE(value: number) {
        this.ensureWritable(4);
        this.buffer.writeInt32LE(value, this.writeIndex);
        this.writeIndex += 4;
    }

    public writeFloatBE(value: number) {
        this.ensureWritable(4);
        this.buffer.writeFloatBE(value, this.writeIndex);
        this.writeIndex += 4;
    }

    public writeFloatLE(value: number) {
        this.ensureWritable(4);
        this.buffer.writeFloatLE(value, this.writeIndex);
        this.writeIndex += 4;
    }

    public writeDoubleBE(value: number) {
        this.ensureWritable(8);
        this.buffer.writeDoubleBE(value, this.writeIndex);
        this.writeIndex += 8;
    }

    public writeDoubleLE(value: number) {
        this.ensureWritable(8);
        this.buffer.writeDoubleLE(value, this.writeIndex);
        this.writeIndex += 8;
    }

    public writeBuffer(src: Buffer) {
        this.ensureWritable(src.length);
        src.copy(this.buffer, this.writeIndex);
        this.writeIndex += src.length;
    }

    public writeBytes(src: ByteBuf | number[]): void {
        if (Array.isArray(src)) {
            // 处理 number[]
            const len = src.length;
            this.ensureWritable(len);
            for (let i = 0; i < len; i++) {
                this.buffer.writeUInt8(src[i]! & 0xFF, this.writeIndex + i);
            }
            this.writeIndex += len;
        } else {
            // 处理 ByteBuf
            const len = src.wIndex;
            this.ensureWritable(len);
            src.rawBuffer().copy(this.buffer, this.writeIndex, 0, len);
            this.writeIndex += len;
        }
    }

    public writeString(str: string): number {
        const bytes = Buffer.from(str, 'utf8');
        this.writeBuffer(bytes);
        return bytes.length;
    }

    public writeAscii(str: string): number {
        const bytes = Buffer.from(str, 'ascii');
        this.writeBuffer(bytes);
        return bytes.length;
    }

    public writeHex(hexStr: string): number {
        const bytes = Buffer.from(hexStr.replace(/\s+/g, ''), 'hex');
        this.writeBuffer(bytes);
        return bytes.length;
    }

    public writeFixedString(str: string, fixedLength: number, encoding: BufferEncoding = 'utf8') {
        this.ensureWritable(fixedLength);
        const bytes = Buffer.alloc(fixedLength);
        const src = Buffer.from(str, encoding);
        src.copy(bytes, 0, 0, Math.min(src.length, fixedLength));
        this.writeBuffer(bytes);
    }

    //工具方法
    public readableBytes(): number {
        return this.writeIndex - this.readIndex;
    }

    public resetReadIndex() {
        this.readIndex = 0;
    }

    public resetWriteIndex() {
        this.writeIndex = 0;
    }

    public clearIndex() {
        this.readIndex = 0;
        this.writeIndex = 0;
    }

    public slice(): Buffer {
        return this.buffer.subarray(0, this.writeIndex);
    }

    public rawBuffer(): Buffer {
        return this.buffer;
    }

    public at(index: number): number {
        return this.buffer[index]!;
    }

    get wIndex(): number {
        return this.writeIndex;
    }

    get rIndex(): number {
        return this.readIndex;
    }

    get currentCapacity(): number {
        return this.capacity;
    }

    get length(): number {
        return this.writeIndex;
    }

    toReadableHexString(upperCase = true, withSpace = true): string {
        const len = this.writeIndex;
        if (len === 0) return '';

        const buf = this.buffer;
        let hex = '';

        for (let i = 0; i < len; i++) {
            const byte = buf.readUInt8(i);
            hex += (byte < 16 ? '0' : '') + byte.toString(16);
            if (withSpace) {
                if (i !== len - 1) hex += ' ';
            }
        }

        return upperCase ? hex.toUpperCase() : hex;
    }

    public toString(encoding: BufferEncoding = 'hex', ignoreRIndex: boolean = false): string {
        return this.buffer.toString(
            encoding,
            ignoreRIndex ? 0 : this.readIndex,
            this.writeIndex
        );
    }
}