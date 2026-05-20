export default class RandomUtil {
    static randomSN(len) {
        const rn = [];
        for (let i = 0; i < len; i++) {
            rn.push(Math.floor(Math.random() * 125 + 1));
        }
        return rn;
    }
}
//# sourceMappingURL=RandomUtil.js.map