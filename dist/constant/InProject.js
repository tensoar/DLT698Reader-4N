export class Endian {
    value;
    description;
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }
    static BE = new Endian(1, "大端序");
    static LE = new Endian(2, "小端序");
}
//# sourceMappingURL=InProject.js.map