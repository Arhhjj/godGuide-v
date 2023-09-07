"use strict";
cc._RF.push(module, '67025YgSQdGQ6vst9yFrddx', 'Random');
// scripts/common/util/Random.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tool_1 = require("./Tool");
var CHARS = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
var BASE = 131;
var MOD = 19260817;
/**
 * 可设置随机种子的随机数生成器
 */
var Random = /** @class */ (function () {
    function Random() {
    }
    /**
     * 计算字符串的hash值 返回值>=0
     * @param str
     * @param initHash 计算的初始值
     */
    Random.hashCode = function (str, initHash) {
        if (initHash === void 0) { initHash = 0; }
        var hash = initHash;
        if (!str) {
            return hash;
        }
        for (var i = 0; i < str.length; i++) {
            hash = (BASE * hash + str.charCodeAt(i)) % MOD;
        }
        return hash;
    };
    /**
     * 随机生成一个种子编码
     * @param length 编码字节长度
     */
    Random.getSeed = function (length) {
        if (length === void 0) { length = 8; }
        var seed = "";
        for (var i = 0; i < length; i++) {
            seed += Tool_1.default.arrayRand(CHARS);
        }
        return seed;
    };
    /**
     * 获取区间[0, 1)的浮点数
     */
    Random.random = function (seed) {
        var seedCode = typeof seed === "string" ? this.hashCode(seed) : seed;
        return (seedCode * 9301 + 49297) % 233280 / 233280;
    };
    /**
     * 获取区间[min, max)的整数，传入1个参数则区间为[0, min)
     */
    Random.int = function (seed, min, max) {
        if (max === void 0) { max = undefined; }
        if (max === undefined) {
            max = min;
            min = 0;
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(this.random(seed) * (max - min)) + min;
    };
    /**
     * 获取区间[min, max)的浮点数，传入1个参数则区间为[0, min)
     */
    Random.float = function (seed, min, max) {
        if (max === void 0) { max = undefined; }
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return this.random(seed) * (max - min) + min;
    };
    /**
     * 根据权重数组进行随机，返回结果下标
     * @param weightArr 权重数组
     * @returns 随机到的权重数组下标
     */
    Random.randWeightIdx = function (seed, weightArr) {
        var sum = 0;
        for (var i = 0; i < weightArr.length; i++) {
            sum += weightArr[i];
        }
        var randNum = this.float(seed, 0, sum);
        var curValue = 0;
        for (var i = 0; i < weightArr.length; i++) {
            curValue += weightArr[i];
            if (randNum < curValue) {
                return i;
            }
        }
        return weightArr.length - 1;
    };
    /**
     * Fisher–Yates shuffle 数组随机乱序
     */
    Random.shuffle = function (seed, arr) {
        var _a;
        for (var i = arr.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(this.random(seed) * (i + 1));
            _a = [arr[i], arr[randomIndex]], arr[randomIndex] = _a[0], arr[i] = _a[1];
        }
        return arr;
    };
    /**
     * 随机返回数组中的一个元素
     */
    Random.arrayRand = function (seed, arr) {
        if (arr.length <= 0) {
            return null;
        }
        return arr[this.int(seed, 0, arr.length)];
    };
    return Random;
}());
exports.default = Random;

cc._RF.pop();