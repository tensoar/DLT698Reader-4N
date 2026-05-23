export class ByteBuf {
    buffer;
    writeIndex;
    readIndex;
    capacity;
    static DEFAULT_CAPACITY = 128;
    static EXPAND_FACTOR = 2;
    static allocate(initialCapacity = ByteBuf.DEFAULT_CAPACITY) {
        return new ByteBuf(initialCapacity);
    }
    static wrap(buffer) {
        const buf = new ByteBuf(buffer.length);
        buf.writeBuffer(buffer);
        buf.resetReadIndex();
        return buf;
    }
    static from(data) {
        const buf = Buffer.from(data);
        return ByteBuf.wrap(buf);
    }
    static of(...bytes) {
        const buffer = Buffer.from(bytes);
        return ByteBuf.wrap(buffer);
    }
    constructor(initialCapacity) {
        this.capacity = Math.max(initialCapacity, 16);
        this.buffer = Buffer.alloc(this.capacity);
        this.writeIndex = 0;
        this.readIndex = 0;
    }
    ensureWritable(bytes) {
        const required = this.writeIndex + bytes;
        if (required <= this.capacity)
            return;
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
    readUInt8() {
        const val = this.buffer.readUInt8(this.readIndex);
        this.readIndex += 1;
        return val;
    }
    readInt8() {
        const val = this.buffer.readInt8(this.readIndex);
        this.readIndex += 1;
        return val;
    }
    readUInt16BE() {
        const val = this.buffer.readUInt16BE(this.readIndex);
        this.readIndex += 2;
        return val;
    }
    readUInt16LE() {
        const val = this.buffer.readUInt16LE(this.readIndex);
        this.readIndex += 2;
        return val;
    }
    readInt16BE() {
        const val = this.buffer.readInt16BE(this.readIndex);
        this.readIndex += 2;
        return val;
    }
    readInt16LE() {
        const val = this.buffer.readInt16LE(this.readIndex);
        this.readIndex += 2;
        return val;
    }
    readUInt32BE() {
        const val = this.buffer.readUInt32BE(this.readIndex);
        this.readIndex += 4;
        return val;
    }
    readUInt32LE() {
        const val = this.buffer.readUInt32LE(this.readIndex);
        this.readIndex += 4;
        return val;
    }
    readInt32BE() {
        const val = this.buffer.readInt32BE(this.readIndex);
        this.readIndex += 4;
        return val;
    }
    readInt32LE() {
        const val = this.buffer.readInt32LE(this.readIndex);
        this.readIndex += 4;
        return val;
    }
    readInt64BE() {
        const val = this.buffer.readBigInt64BE(this.readIndex);
        this.readIndex += 8;
        return val;
    }
    readUInt64BE() {
        const val = this.buffer.readBigUInt64BE(this.readIndex);
        this.readIndex += 8;
        return val;
    }
    readFloatBE() {
        const val = this.buffer.readFloatBE(this.readIndex);
        this.readIndex += 4;
        return val;
    }
    readFloatLE() {
        const val = this.buffer.readFloatLE(this.readIndex);
        this.readIndex += 4;
        return val;
    }
    readDoubleBE() {
        const val = this.buffer.readDoubleBE(this.readIndex);
        this.readIndex += 8;
        return val;
    }
    readDoubleLE() {
        const val = this.buffer.readDoubleLE(this.readIndex);
        this.readIndex += 8;
        return val;
    }
    readBufferBE(length) {
        const slice = this.buffer.subarray(this.readIndex, this.readIndex + length);
        this.readIndex += length;
        return slice;
    }
    readBytesBE(length) {
        const arr = [];
        const index = this.readIndex;
        for (let i = 0; i < length; i++) {
            arr.push(this.buffer.at(index + i));
            this.readIndex += 1;
        }
        return arr;
    }
    readBytesLE(length) {
        const bytes = [];
        for (let i = 0; i < length; i++) {
            bytes.push(this.buffer.at(this.readIndex));
            this.readIndex++;
        }
        return bytes.reverse();
    }
    readStringBE(length) {
        const str = this.buffer.toString('utf8', this.readIndex, this.readIndex + length);
        this.readIndex += length;
        return str;
    }
    readAsciiBE(length) {
        const str = this.buffer.toString('ascii', this.readIndex, this.readIndex + length);
        this.readIndex += length;
        return str;
    }
    readHexBE(length) {
        const str = this.buffer.toString('hex', this.readIndex, this.readIndex + length).toUpperCase();
        this.readIndex += length;
        return str;
    }
    readHexLE(length) {
        const bytes = this.buffer.subarray(this.readIndex, this.readIndex + length);
        const reversed = Buffer.from([...bytes].reverse());
        const str = reversed.toString('hex').toUpperCase();
        this.readIndex += length;
        return str;
    }
    skipBytes(length) {
        if (this.readIndex + length > this.writeIndex) {
            throw new RangeError(`skipBytes: Unable skip ${length} bytes, readable bytes length = ${this.readableBytes()}`);
        }
        this.readIndex += length;
    }
    // 写入方法
    writeUInt8(value) {
        this.ensureWritable(1);
        this.buffer.writeUInt8(value, this.writeIndex);
        this.writeIndex += 1;
    }
    writeInt8(value) {
        this.ensureWritable(1);
        this.buffer.writeInt8(value, this.writeIndex);
        this.writeIndex += 1;
    }
    writeUInt16BE(value) {
        this.ensureWritable(2);
        this.buffer.writeUInt16BE(value, this.writeIndex);
        this.writeIndex += 2;
    }
    writeUInt16LE(value) {
        this.ensureWritable(2);
        this.buffer.writeUInt16LE(value, this.writeIndex);
        this.writeIndex += 2;
    }
    writeInt16BE(value) {
        this.ensureWritable(2);
        this.buffer.writeInt16BE(value, this.writeIndex);
        this.writeIndex += 2;
    }
    writeInt16LE(value) {
        this.ensureWritable(2);
        this.buffer.writeInt16LE(value, this.writeIndex);
        this.writeIndex += 2;
    }
    writeUInt32BE(value) {
        this.ensureWritable(4);
        this.buffer.writeUInt32BE(value, this.writeIndex);
        this.writeIndex += 4;
    }
    writeUInt32LE(value) {
        this.ensureWritable(4);
        this.buffer.writeUInt32LE(value, this.writeIndex);
        this.writeIndex += 4;
    }
    writeInt32BE(value) {
        this.ensureWritable(4);
        this.buffer.writeInt32BE(value, this.writeIndex);
        this.writeIndex += 4;
    }
    writeInt32LE(value) {
        this.ensureWritable(4);
        this.buffer.writeInt32LE(value, this.writeIndex);
        this.writeIndex += 4;
    }
    writeInt64BE(value) {
        this.ensureWritable(8);
        this.buffer.writeBigInt64BE(value, this.writeIndex);
        this.writeIndex += 8;
    }
    writeUInt64BE(value) {
        this.ensureWritable(8);
        this.buffer.writeBigUInt64BE(value, this.writeIndex);
        this.writeIndex += 8;
    }
    writeFloatBE(value) {
        this.ensureWritable(4);
        this.buffer.writeFloatBE(value, this.writeIndex);
        this.writeIndex += 4;
    }
    writeFloatLE(value) {
        this.ensureWritable(4);
        this.buffer.writeFloatLE(value, this.writeIndex);
        this.writeIndex += 4;
    }
    writeDoubleBE(value) {
        this.ensureWritable(8);
        this.buffer.writeDoubleBE(value, this.writeIndex);
        this.writeIndex += 8;
    }
    writeDoubleLE(value) {
        this.ensureWritable(8);
        this.buffer.writeDoubleLE(value, this.writeIndex);
        this.writeIndex += 8;
    }
    writeBuffer(src) {
        this.ensureWritable(src.length);
        src.copy(this.buffer, this.writeIndex);
        this.writeIndex += src.length;
    }
    writeBytesBE(src) {
        if (Array.isArray(src)) {
            // 处理 number[]
            const len = src.length;
            this.ensureWritable(len);
            for (let i = 0; i < len; i++) {
                this.buffer.writeUInt8(src[i] & 0xFF, this.writeIndex + i);
            }
            this.writeIndex += len;
        }
        else {
            // 处理 ByteBuf
            const len = src.wIndex;
            this.ensureWritable(len);
            src.rawBuffer().copy(this.buffer, this.writeIndex, 0, len);
            this.writeIndex += len;
        }
    }
    writeStringBE(str) {
        const bytes = Buffer.from(str, 'utf8');
        this.writeBuffer(bytes);
        return bytes.length;
    }
    writeAsciiBE(str) {
        const bytes = Buffer.from(str, 'ascii');
        this.writeBuffer(bytes);
        return bytes.length;
    }
    writeHexBE(hexStr) {
        const bytes = Buffer.from(hexStr.replace(/\s+/g, ''), 'hex');
        this.writeBuffer(bytes);
        return bytes.length;
    }
    writeFixedStringBE(str, fixedLength, encoding = 'utf8') {
        this.ensureWritable(fixedLength);
        const bytes = Buffer.alloc(fixedLength);
        const src = Buffer.from(str, encoding);
        src.copy(bytes, 0, 0, Math.min(src.length, fixedLength));
        this.writeBuffer(bytes);
    }
    readableBytes() {
        return this.writeIndex - this.readIndex;
    }
    resetReadIndex() {
        this.readIndex = 0;
    }
    resetWriteIndex() {
        this.writeIndex = 0;
    }
    clearIndex() {
        this.readIndex = 0;
        this.writeIndex = 0;
    }
    slice(startIndex, endIndex) {
        const buf = this.buffer.subarray(startIndex, endIndex);
        return ByteBuf.wrap(buf);
    }
    sliceArray(startIndex, endIndex) {
        const arr = [];
        for (let i = startIndex; i < endIndex; i++) {
            arr.push(this.buffer.at(i));
        }
        return arr;
    }
    rawBuffer() {
        return this.buffer;
    }
    getBuffer(ignoreReadIndex = true) {
        let startIndex = ignoreReadIndex ? 0 : this.rIndex;
        const buf = Buffer.alloc(this.wIndex - startIndex);
        for (let i = startIndex; i < this.wIndex; i++) {
            buf[i] = this.buffer[i];
        }
        return buf;
    }
    at(index) {
        return this.buffer[index];
    }
    get wIndex() {
        return this.writeIndex;
    }
    get rIndex() {
        return this.readIndex;
    }
    get currentCapacity() {
        return this.capacity;
    }
    get length() {
        return this.writeIndex;
    }
    toReadableHexString(upperCase = true, withSpace = true) {
        const len = this.writeIndex;
        if (len === 0)
            return '';
        const buf = this.buffer;
        let hex = '';
        for (let i = 0; i < len; i++) {
            const byte = buf.readUInt8(i);
            hex += (byte < 16 ? '0' : '') + byte.toString(16);
            if (withSpace && i !== len - 1) {
                hex += ' ';
            }
        }
        return upperCase ? hex.toUpperCase() : hex;
    }
    toString(encoding = 'hex', ignoreReadIndex = false) {
        return this.buffer.toString(encoding, ignoreReadIndex ? 0 : this.readIndex, this.writeIndex);
    }
}
//# sourceMappingURL=ByteBuf.js.map