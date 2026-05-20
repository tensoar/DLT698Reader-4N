export default interface InteractionAdapter {
    open(): Promise<boolean>;
    close(): Promise<boolean>;
    send(data: Buffer): Promise<boolean>;
    onData(cb: (data: Buffer) => void): void;
    isOpen(): boolean;
}
//# sourceMappingURL=InteractionAdapter.d.ts.map