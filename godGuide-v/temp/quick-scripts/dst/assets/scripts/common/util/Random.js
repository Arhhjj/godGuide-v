
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/Random.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxSYW5kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBMEI7QUFFMUIsSUFBTSxLQUFLLEdBQWE7SUFDcEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUNoRCxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUNoSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztDQUNuSSxDQUFDO0FBRUYsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2pCLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUVyQjs7R0FFRztBQUNIO0lBQUE7SUF3R0EsQ0FBQztJQXRHRzs7OztPQUlHO0lBQ1csZUFBUSxHQUF0QixVQUF1QixHQUFXLEVBQUUsUUFBb0I7UUFBcEIseUJBQUEsRUFBQSxZQUFvQjtRQUNwRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNOLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDbEQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ1csY0FBTyxHQUFyQixVQUFzQixNQUFrQjtRQUFsQix1QkFBQSxFQUFBLFVBQWtCO1FBQ3BDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxJQUFJLGNBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDVyxhQUFNLEdBQXBCLFVBQXFCLElBQXFCO1FBQ3RDLElBQUksUUFBUSxHQUFXLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdFLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkQsQ0FBQztJQUVEOztPQUVHO0lBQ1csVUFBRyxHQUFqQixVQUFrQixJQUFxQixFQUFFLEdBQVcsRUFBRSxHQUF1QjtRQUF2QixvQkFBQSxFQUFBLGVBQXVCO1FBQ3pFLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNuQixHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ1YsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDN0QsQ0FBQztJQUVEOztPQUVHO0lBQ1csWUFBSyxHQUFuQixVQUFvQixJQUFxQixFQUFFLEdBQVcsRUFBRSxHQUF1QjtRQUF2QixvQkFBQSxFQUFBLGVBQXVCO1FBQzNFLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNuQixHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ1YsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLG9CQUFhLEdBQTNCLFVBQTRCLElBQXFCLEVBQUUsU0FBbUI7UUFDbEUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUE7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLE9BQU8sR0FBRyxRQUFRLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSjtRQUNELE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ1csY0FBTyxHQUFyQixVQUF5QixJQUFxQixFQUFFLEdBQWE7O1FBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxLQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBdEQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFBLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFBLENBQStCO1NBQzNEO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDVyxnQkFBUyxHQUF2QixVQUEyQixJQUFxQixFQUFFLEdBQWE7UUFDM0QsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0F4R0EsQUF3R0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb29sIGZyb20gXCIuL1Rvb2xcIjtcclxuXHJcbmNvbnN0IENIQVJTOiBzdHJpbmdbXSA9IFtcclxuICAgIFwiMFwiLCBcIjFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsIFwiOVwiLFxyXG4gICAgXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCIsIFwia1wiLCBcImxcIiwgXCJtXCIsIFwiblwiLCBcIm9cIiwgXCJwXCIsIFwicVwiLCBcInJcIiwgXCJzXCIsIFwidFwiLCBcInVcIiwgXCJ2XCIsIFwid1wiLCBcInhcIiwgXCJ5XCIsIFwielwiLFxyXG4gICAgXCJBXCIsIFwiQlwiLCBcIkNcIiwgXCJEXCIsIFwiRVwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiLCBcIklcIiwgXCJKXCIsIFwiS1wiLCBcIkxcIiwgXCJNXCIsIFwiTlwiLCBcIk9cIiwgXCJQXCIsIFwiUVwiLCBcIlJcIiwgXCJTXCIsIFwiVFwiLCBcIlVcIiwgXCJWXCIsIFwiV1wiLCBcIlhcIiwgXCJZXCIsIFwiWlwiXHJcbl07XHJcblxyXG5jb25zdCBCQVNFID0gMTMxO1xyXG5jb25zdCBNT0QgPSAxOTI2MDgxNztcclxuXHJcbi8qKlxyXG4gKiDlj6/orr7nva7pmo/mnLrnp43lrZDnmoTpmo/mnLrmlbDnlJ/miJDlmahcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpflrZfnrKbkuLLnmoRoYXNo5YC8IOi/lOWbnuWAvD49MFxyXG4gICAgICogQHBhcmFtIHN0ciBcclxuICAgICAqIEBwYXJhbSBpbml0SGFzaCDorqHnrpfnmoTliJ3lp4vlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBoYXNoQ29kZShzdHI6IHN0cmluZywgaW5pdEhhc2g6IG51bWJlciA9IDApOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBoYXNoID0gaW5pdEhhc2g7XHJcbiAgICAgICAgaWYgKCFzdHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhhc2g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBoYXNoID0gKEJBU0UgKiBoYXNoICsgc3RyLmNoYXJDb2RlQXQoaSkpICUgTU9EO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzaDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmaj+acuueUn+aIkOS4gOS4quenjeWtkOe8lueggVxyXG4gICAgICogQHBhcmFtIGxlbmd0aCDnvJbnoIHlrZfoioLplb/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTZWVkKGxlbmd0aDogbnVtYmVyID0gOCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHNlZWQgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc2VlZCArPSBUb29sLmFycmF5UmFuZChDSEFSUyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yy66Ze0WzAsIDEp55qE5rWu54K55pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tKHNlZWQ6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHNlZWRDb2RlOiBudW1iZXIgPSB0eXBlb2Ygc2VlZCA9PT0gXCJzdHJpbmdcIiA/IHRoaXMuaGFzaENvZGUoc2VlZCkgOiBzZWVkO1xyXG4gICAgICAgIHJldHVybiAoc2VlZENvZGUgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwIC8gMjMzMjgwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yy66Ze0W21pbiwgbWF4KeeahOaVtOaVsO+8jOS8oOWFpTHkuKrlj4LmlbDliJnljLrpl7TkuLpbMCwgbWluKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGludChzZWVkOiBzdHJpbmcgfCBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciA9IHVuZGVmaW5lZCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG1heCA9IG1pbjtcclxuICAgICAgICAgICAgbWluID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWluID0gTWF0aC5jZWlsKG1pbik7XHJcbiAgICAgICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMucmFuZG9tKHNlZWQpICogKG1heCAtIG1pbikpICsgbWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yy66Ze0W21pbiwgbWF4KeeahOa1rueCueaVsO+8jOS8oOWFpTHkuKrlj4LmlbDliJnljLrpl7TkuLpbMCwgbWluKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZsb2F0KHNlZWQ6IHN0cmluZyB8IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyID0gdW5kZWZpbmVkKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbWF4ID0gbWluO1xyXG4gICAgICAgICAgICBtaW4gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5kb20oc2VlZCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruadg+mHjeaVsOe7hOi/m+ihjOmaj+acuu+8jOi/lOWbnue7k+aenOS4i+agh1xyXG4gICAgICogQHBhcmFtIHdlaWdodEFyciDmnYPph43mlbDnu4RcclxuICAgICAqIEByZXR1cm5zIOmaj+acuuWIsOeahOadg+mHjeaVsOe7hOS4i+agh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRXZWlnaHRJZHgoc2VlZDogc3RyaW5nIHwgbnVtYmVyLCB3ZWlnaHRBcnI6IG51bWJlcltdKSB7XHJcbiAgICAgICAgbGV0IHN1bSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWlnaHRBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3VtICs9IHdlaWdodEFycltpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJhbmROdW0gPSB0aGlzLmZsb2F0KHNlZWQsIDAsIHN1bSk7XHJcbiAgICAgICAgbGV0IGN1clZhbHVlID0gMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VpZ2h0QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGN1clZhbHVlICs9IHdlaWdodEFycltpXTtcclxuICAgICAgICAgICAgaWYgKHJhbmROdW0gPCBjdXJWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdlaWdodEFyci5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlzaGVy4oCTWWF0ZXMgc2h1ZmZsZSDmlbDnu4Tpmo/mnLrkubHluo9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaHVmZmxlPFQ+KHNlZWQ6IHN0cmluZyB8IG51bWJlciwgYXJyOiBBcnJheTxUPik6IEFycmF5PFQ+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IodGhpcy5yYW5kb20oc2VlZCkgKiAoaSArIDEpKTtcclxuICAgICAgICAgICAgW2FycltyYW5kb21JbmRleF0sIGFycltpXV0gPSBbYXJyW2ldLCBhcnJbcmFuZG9tSW5kZXhdXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmaj+acuui/lOWbnuaVsOe7hOS4reeahOS4gOS4quWFg+e0oFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFycmF5UmFuZDxUPihzZWVkOiBzdHJpbmcgfCBudW1iZXIsIGFycjogQXJyYXk8VD4pOiBUIHtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyW3RoaXMuaW50KHNlZWQsIDAsIGFyci5sZW5ndGgpXTtcclxuICAgIH1cclxufVxyXG4iXX0=