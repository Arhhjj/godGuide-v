
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/Tool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f0aaDZc6xBdrsOcvbGZFVC', 'Tool');
// scripts/common/util/Tool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tween_1 = require("./Tween");
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["S"] = 0] = "S";
    TimeUnit[TimeUnit["M"] = 1] = "M";
    TimeUnit[TimeUnit["H"] = 2] = "H";
    TimeUnit[TimeUnit["D"] = 3] = "D";
})(TimeUnit || (TimeUnit = {}));
/**
 * 工具类
 */
var Tool = /** @class */ (function () {
    function Tool() {
    }
    /**
     * 深拷贝
     * @param source 源数据
     */
    Tool.deepCopy = function (source) {
        if (typeof source !== "object" || source === null || source instanceof RegExp) {
            return source;
        }
        var result = null;
        if (Array.isArray(source)) {
            result = [];
            for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
                var item = source_1[_i];
                result.push(this.deepCopy(item));
            }
        }
        else {
            result = {};
            for (var key in source) {
                result[key] = this.deepCopy(source[key]);
            }
        }
        return result;
    };
    /**
     * 异步等待 - setTimeout
     * @param seconds
     */
    Tool.wait = function (seconds) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, seconds * 1000);
        });
    };
    /**
     * 异步等待 - cc.Component.scheduleOnce
     */
    Tool.waitCmpt = function (cmpt, seconds) {
        return new Promise(function (resolve, reject) {
            cmpt.scheduleOnce(function () {
                resolve();
            }, seconds);
        });
    };
    /**
     * 异步等待 - tween 默认group为TWEEN
     */
    Tool.waitTween = function (cmpt, seconds, group) {
        if (group === void 0) { group = Tween_1.TWEEN; }
        return new Promise(function (resolve, reject) {
            new Tween_1.Tween({ k: 0 }, group)
                .to({ k: 1 }, seconds * 1000)
                .onComplete(function () {
                resolve();
            })
                .start()
                .bindCCObject(cmpt);
        });
    };
    /**
     * 以tween周期性执行回调，会随绑定的target销毁而销毁
     * @param callback
     * @param target
     * @param interval 回调间隔时间 秒
     * @param repeat 回调共会执行repeat+1次
     * @param group tween分组
     */
    Tool.scheduleByTween = function (callback, target, interval, repeat, group) {
        if (repeat === void 0) { repeat = 0; }
        if (group === void 0) { group = Tween_1.TWEEN; }
        var count = 0;
        var once = function () {
            var data = { arg: 0 };
            new Tween_1.Tween(data, group)
                .bindCCObject(target)
                .to({ arg: 1 }, interval * 1000)
                .onComplete(function () {
                callback();
                count++;
                if (count < repeat + 1) {
                    once();
                }
            })
                .start();
        };
        once();
    };
    /**
     * 线性插值
     * @param a 起始值
     * @param b 目标值
     * @param r ratio between 0 and 1
     * @param min 最小间隔值
     */
    Tool.lerp = function (a, b, r, min) {
        if (min === void 0) { min = 0; }
        min = Math.abs(min);
        var c = b - a;
        var delta = c * r;
        delta = delta < 0 ? Math.min(delta, -min) : Math.max(delta, min);
        if (Math.abs(delta) > Math.abs(c)) {
            delta = c;
        }
        return a + delta;
    };
    /**
     * 通过两点坐标(不平行于坐标轴)和x，计算两点式方程结果y
     */
    Tool.calcTwoPointForm = function (p1, p2, x) {
        if (p1.x === p2.x)
            return p1.y;
        return (p2.y - p1.y) * (x - p1.x) / (p2.x - p1.x) + p1.y;
    };
    /**
     * 返回两个矩形的重叠矩形，不重叠则返回null
     */
    Tool.overlapRect = function (r1, r2) {
        var xMin = Math.max(r1.xMin, r2.xMin);
        var xMax = Math.min(r1.xMax, r2.xMax);
        var yMin = Math.max(r1.yMin, r2.yMin);
        var yMax = Math.min(r1.yMax, r2.yMax);
        if (xMin > xMax || yMin > yMax) {
            return null;
        }
        return cc.rect(xMin, yMin, xMax - xMin, yMax - yMin);
    };
    /**
     * 将角度约束在 [0,360) 区间内
     */
    Tool.normalizeDegree = function (degree) {
        var result = degree % 360;
        if (result < 0) {
            result += 360;
        }
        return result;
    };
    /**
     * 圆心在坐标原点的椭圆，以与x轴逆时针方向的角度计算对应椭圆边上的坐标
     */
    Tool.getEllipsePoint = function (a, b, degree) {
        degree = this.normalizeDegree(degree);
        var k = Math.tan(cc.misc.degreesToRadians(degree));
        var x = Math.sqrt(b * b / (k * k + b * b / a / a));
        if (degree > 90 && degree < 270) {
            x = -x;
        }
        var y = Math.sqrt(b * b - b * b * x * x / a / a);
        if (degree > 180) {
            y = -y;
        }
        return cc.v2(x, y);
    };
    /**
     * 判断射线与圆是否相交
     * @param rayPoint 射线起点
     * @param rayDir 射线方向
     * @param circlrCenter 圆心
     * @param circleRadius 圆半径
     */
    Tool.isRayCircleIntersection = function (rayPoint, rayDir, circlrCenter, circleRadius) {
        var d = rayDir.magSqr();
        var t = ((circlrCenter.x - rayPoint.x) * rayDir.x + (circlrCenter.y - rayPoint.y) * rayDir.y) / d;
        var p;
        if (d <= 0) {
            p = rayPoint;
        }
        else {
            if (t < 0) {
                p = rayPoint;
            }
            else {
                p = cc.v2(rayPoint.x + t * rayDir.x, rayPoint.y + t * rayDir.y);
            }
        }
        var dx = circlrCenter.x - p.x;
        var dy = circlrCenter.y - p.y;
        return (dx * dx + dy * dy) <= circleRadius * circleRadius;
    };
    /**
     * 返回value是否在 [min, max] 区间内
     * @param min
     * @param max
     * @param value
     * @param includeEdge true(默认值): [min, max]; false: (min, max)
     */
    Tool.inRange = function (min, max, value, includeEdge) {
        if (includeEdge === void 0) { includeEdge = true; }
        return includeEdge ? value >= min && value <= max : value > min && value < max;
    };
    /**
     * 获取区间[min, max)的整数，传入1个参数则区间为[0, min)
     */
    Tool.randInt = function (min, max) {
        if (max === void 0) { max = undefined; }
        if (max === undefined) {
            max = min;
            min = 0;
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    /**
     * 获取区间[min, max)的浮点数，传入1个参数则区间为[0, min)
     */
    Tool.randFloat = function (min, max) {
        if (max === void 0) { max = undefined; }
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min;
    };
    /**
     * 返回一个概率值(%)的随机结果是否在概率范围内
     * @param rate 概率值(%) [0,100]
     */
    Tool.randRateResult = function (rate) {
        return this.randFloat(100) < rate;
    };
    /**
     * 根据权重数组进行随机，返回结果下标
     * @param weightArr 权重数组
     * @returns 随机到的权重数组下标
     */
    Tool.randWeightIdx = function (weightArr) {
        var sum = 0;
        for (var i = 0; i < weightArr.length; i++) {
            sum += weightArr[i];
        }
        var randNum = this.randFloat(0, sum);
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
     * Fisher–Yates shuffle 字符串随机乱序
     */
    Tool.shuffleString = function (str) {
        var arr = [];
        for (var i = 0; i < str.length; i++) {
            arr.push(str[i]);
        }
        arr = this.shuffle(arr);
        str = "";
        arr.forEach(function (v) {
            str += v;
        });
        return str;
    };
    /**
     * Fisher–Yates shuffle 数组随机乱序
     */
    Tool.shuffle = function (arr) {
        var _a;
        for (var i = arr.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            _a = [arr[i], arr[randomIndex]], arr[randomIndex] = _a[0], arr[i] = _a[1];
        }
        return arr;
    };
    /**
     * 随机返回数组中的一个元素
     */
    Tool.arrayRand = function (arr) {
        if (arr.length <= 0) {
            return null;
        }
        return arr[this.randInt(0, arr.length)];
    };
    /**
     * 判断数组中是否有某个元素
     * @param arr 数组
     * @param param 元素值或表达元素值满足某种条件的函数
     */
    Tool.arrayHas = function (arr, param) {
        var idx = typeof param !== "function" ? arr.findIndex(function (e) { return e === param; }) : arr.findIndex(param);
        return idx >= 0;
    };
    /**
     * 根据下标交换数组两个元素位置
     */
    Tool.arraySwap = function (arr, idx1, idx2) {
        var _a;
        if (idx1 === idx2 || !this.inRange(0, arr.length - 1, idx1) || !this.inRange(0, arr.length - 1, idx2)) {
            return;
        }
        _a = [arr[idx2], arr[idx1]], arr[idx1] = _a[0], arr[idx2] = _a[1];
    };
    /**
     * 将元素从fromIdx位置移到toIdx位置，其余元素相对位置不变
     */
    Tool.arrayMove = function (arr, fromIdx, toIdx) {
        if (fromIdx === toIdx || !this.inRange(0, arr.length - 1, fromIdx) || !this.inRange(0, arr.length - 1, toIdx)) {
            return;
        }
        var from = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, from[0]);
    };
    /**
     * 在数组中添加某个元素
     * @param canRepeat 是否可重复添加相同元素 默认false
     * @return 是否执行了添加行为
     */
    Tool.arrayAdd = function (arr, ele, canRepeat) {
        if (canRepeat === void 0) { canRepeat = false; }
        if (!canRepeat && this.arrayHas(arr, ele)) {
            return false;
        }
        arr.push(ele);
        return true;
    };
    /**
     * 在数组中删除某个元素(若有多个相同元素则只删除第一个)
     * @return 是否执行了删除行为
     */
    Tool.arrayDelete = function (arr, ele) {
        var index = arr.findIndex(function (e) { return e === ele; });
        if (index >= 0) {
            arr.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 根据参数返回格式化字符串
     * @param text 源字符串
     * @param option 用于格式化源字符串的数据，可以是键值对，也可以按顺序传参
     * @example
     * // 可使用以下两种调用方式，返回结果都是"测试字符串111--abc..."
     * Tool.formatString("测试字符串%{a1}--%{a2}...", {a1: 111, a2: "abc"});
     * Tool.formatString("测试字符串%{a1}--%{a2}...", 111, "abc");
     */
    Tool.formatString = function (text) {
        var option = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            option[_i - 1] = arguments[_i];
        }
        var result = text;
        if (option.length === 1 && Object.prototype.toString.call(option[0]) === "[object Object]") {
            // 参数为键值对
            for (var arg in option[0]) {
                if (option[0].hasOwnProperty(arg)) {
                    var reg = new RegExp("%{" + arg + "}", "g");
                    result = result.replace(reg, "" + option[0][arg]);
                }
            }
        }
        else {
            // 参数为数组
            option.forEach(function (value) {
                result = result.replace(/%\{.*?\}/, "" + value);
            });
        }
        return result;
    };
    /**
     * 对一段时间返回格式化时间字符串
     * @param sec 时间s
     * @param format 格式化字符串
     * @example
     * // 当format为string时，会以format中的最大时间单位进行格式化
     * Tool.formatTimeString(3601, "%{m}:%{s}"); // 60:1
     * Tool.formatTimeString(3601, "%{mm}:%{ss}"); // 60:01
     * Tool.formatTimeString(3601, "%{hh}:%{mm}:%{ss}"); // 01:00:01
     *
     * // 当format为object时，会以传入的sec计算最大的时间单位，并选择format对应的字符串进行格式化
     * Tool.formatTimeString(100, {
     *     S: "%{s}秒",
     *     M: "%{m}分%{s}秒",
     *     H: "%{h}时%{m}分%{s}秒",
     *     D: "%{d}天%{h}时%{m}分%{s}秒"
     * }); // 1分40秒
     * Tool.formatTimeString(100000, {
     *     S: "%{s}秒",
     *     M: "%{m}分%{s}秒",
     *     H: "%{h}时%{m}分%{s}秒",
     *     D: "%{d}天%{h}时%{m}分%{s}秒"
     * }); // 1天3时46分40秒
     */
    Tool.formatTimeString = function (sec, format) {
        if (format === void 0) { format = "%{hh}:%{mm}:%{ss}"; }
        var seconds = Math.floor(sec);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(seconds / 3600);
        var days = Math.floor(seconds / 86400);
        var maxUnit = TimeUnit.S;
        var result = "";
        if (typeof format === "string") {
            // 查询格式化字符串中最大的单位
            result = format;
            if (/%\{d+\}/.test(format)) {
                maxUnit = TimeUnit.D;
            }
            else if (/%\{h+\}/.test(format)) {
                maxUnit = TimeUnit.H;
            }
            else if (/%\{m+\}/.test(format)) {
                maxUnit = TimeUnit.M;
            }
        }
        else {
            // 以传入的数值判断最大单位
            if (days > 0) {
                maxUnit = TimeUnit.D;
                result = format.D;
            }
            else if (hours > 0) {
                maxUnit = TimeUnit.H;
                result = format.H;
            }
            else if (minutes > 0) {
                maxUnit = TimeUnit.M;
                result = format.M;
            }
            else {
                maxUnit = TimeUnit.S;
                result = format.S;
            }
        }
        if (maxUnit > TimeUnit.S) {
            seconds %= 60;
        }
        if (maxUnit > TimeUnit.M) {
            minutes %= 60;
        }
        if (maxUnit > TimeUnit.H) {
            hours %= 24;
        }
        var data = {
            dd: days < 10 ? "0" + days : "" + days,
            d: "" + days,
            hh: hours < 10 ? "0" + hours : "" + hours,
            h: "" + hours,
            mm: minutes < 10 ? "0" + minutes : "" + minutes,
            m: "" + minutes,
            ss: seconds < 10 ? "0" + seconds : "" + seconds,
            s: "" + seconds
        };
        result = this.formatString(result, data);
        return result;
    };
    /**
     * 将一个Date对象或Date时间戳返回格式化日期字符串
     * @param date Date对象或Date时间戳
     * @param format 格式化字符串
     * @param isUTC true:UTC时间 false:本地时间
     * @example
     * Tool.formatDateString(0, "%{YYYY}-%{MM}-%{dd} %{hh}:%{mm}:%{ss}", true); // "1970-01-01 00:00:00"
     * Tool.formatDateString(0, "%{dd}/%{MM}/%{YY}", true); // "01/01/70"
     */
    Tool.formatDateString = function (date, format, isUTC) {
        if (format === void 0) { format = "%{YYYY}-%{MM}-%{dd} %{hh}:%{mm}:%{ss}"; }
        if (isUTC === void 0) { isUTC = false; }
        var src = date instanceof Date ? date : new Date(date);
        var year = isUTC ? src.getUTCFullYear() : src.getFullYear();
        var month = isUTC ? src.getUTCMonth() + 1 : src.getMonth() + 1;
        var days = isUTC ? src.getUTCDate() : src.getDate();
        var hours = isUTC ? src.getUTCHours() : src.getHours();
        var minutes = isUTC ? src.getUTCMinutes() : src.getMinutes();
        var seconds = isUTC ? src.getUTCSeconds() : src.getSeconds();
        var data = {
            YYYY: "" + year,
            YY: year % 100 < 10 ? "0" + year % 100 : "" + year % 100,
            MM: month < 10 ? "0" + month : "" + month,
            M: "" + month,
            dd: days < 10 ? "0" + days : "" + days,
            d: "" + days,
            hh: hours < 10 ? "0" + hours : "" + hours,
            h: "" + hours,
            mm: minutes < 10 ? "0" + minutes : "" + minutes,
            m: "" + minutes,
            ss: seconds < 10 ? "0" + seconds : "" + seconds,
            s: "" + seconds
        };
        var result = this.formatString(format, data);
        return result;
    };
    /**
     * 子节点递归处理
     * @param node 需要递归处理的节点或节点数组
     * @param cb 节点处理函数
     * @param thisArg cb绑定的this对象
     */
    Tool.nodeRecursive = function (node, cb, thisArg) {
        var _this = this;
        if (thisArg === void 0) { thisArg = undefined; }
        if (node instanceof cc.Node) {
            cb.call(thisArg, node);
            node.children.forEach(function (n) { _this.nodeRecursive(n, cb, thisArg); });
        }
        else if (Array.isArray(node)) {
            node.forEach(function (n) { _this.nodeRecursive(n, cb, thisArg); });
        }
    };
    /**
     * destroy并立即remove传入节点的所有子节点
     */
    Tool.clearChildren = function () {
        var nodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
        }
        nodes.forEach(function (e) {
            e.destroyAllChildren();
            e.removeAllChildren();
        });
    };
    /**
    * 为节点添加带参数的点击事件
    * @param node 添加点击事件的节点
    * @param component 组件名称 -- 脚本名称
    * @param callBack 点击事件函数 -- 需要在该component脚本内的方法
    * @param param 点击事件传入的参数
    * @param target 事件处理代码组件所属的节点 -- 该component脚本所挂载在的节点
    */
    Tool.addParamButtonClick = function (node, component, callBack, param, target, scale) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = target; // 事件处理代码组件所属的节点 -- 该component脚本所挂载在的节点
        clickEventHandler.component = component; // 组件名称 -- 脚本名称
        clickEventHandler.handler = callBack; // 点击事件函数 -- 需要在该component脚本内的方法
        clickEventHandler.customEventData = param; // 点击事件传入的参数
        var button = node.getComponent(cc.Button);
        if (!button) {
            button = node.addComponent(cc.Button);
        }
        if (scale) {
            button.transition = cc.Button.Transition.SCALE;
        }
        button.clickEvents = [];
        button.clickEvents.push(clickEventHandler);
    };
    /**
    * 解绑带参数的点击事件
    * @param node 添加点击事件的节点
    * @param component 组件名称 -- 脚本名称
    * @param callBack 点击事件函数 -- 需要在该component脚本内的方法
    * @param target 事件处理代码组件所属的节点 -- 该component脚本所挂载在的节点
    */
    Tool.removeParamButtonClick = function (node, component, callBack, target) {
        var button = node.getComponent(cc.Button);
        if (button) {
            for (var i = button.clickEvents.length - 1; i >= 0; i--) {
                var eventHandler = button.clickEvents[i];
                if (eventHandler.target === target &&
                    eventHandler.component === component &&
                    eventHandler.handler === callBack) {
                    // 移除对应的点击事件
                    button.clickEvents.splice(i, 1);
                    break;
                }
            }
        }
    };
    return Tool;
}());
exports.default = Tool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxUb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQThDO0FBRTlDLElBQUssUUFLSjtBQUxELFdBQUssUUFBUTtJQUNULGlDQUFDLENBQUE7SUFDRCxpQ0FBQyxDQUFBO0lBQ0QsaUNBQUMsQ0FBQTtJQUNELGlDQUFDLENBQUE7QUFDTCxDQUFDLEVBTEksUUFBUSxLQUFSLFFBQVEsUUFLWjtBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQTBqQkEsQ0FBQztJQXpqQkc7OztPQUdHO0lBQ1csYUFBUSxHQUF0QixVQUEwQixNQUFTO1FBQy9CLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxZQUFZLE1BQU0sRUFBRTtZQUMzRSxPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUVELElBQUksTUFBTSxHQUFRLElBQUksQ0FBQztRQUN2QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNaLEtBQWlCLFVBQU0sRUFBTixpQkFBTSxFQUFOLG9CQUFNLEVBQU4sSUFBTSxFQUFFO2dCQUFwQixJQUFJLElBQUksZUFBQTtnQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKO2FBQU07WUFDSCxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ1csU0FBSSxHQUFsQixVQUFt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QWEsRUFBRSxTQUFpQixFQUFFLFFBQWdCLEVBQUUsTUFBZTtRQUNwRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLE1BQU0sRUFBRTtZQUNSLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JELElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQ0ksWUFBWSxDQUFDLE1BQU0sS0FBSyxNQUFNO29CQUM5QixZQUFZLENBQUMsU0FBUyxLQUFLLFNBQVM7b0JBQ3BDLFlBQVksQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUNuQztvQkFDRSxZQUFZO29CQUNaLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsTUFBTTtpQkFDVDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUwsV0FBQztBQUFELENBMWpCQSxBQTBqQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyb3VwLCBUd2VlbiwgVFdFRU4gfSBmcm9tIFwiLi9Ud2VlblwiO1xyXG5cclxuZW51bSBUaW1lVW5pdCB7XHJcbiAgICBTLFxyXG4gICAgTSxcclxuICAgIEgsXHJcbiAgICBEXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlt6XlhbfnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvb2wge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmt7Hmi7fotJ1cclxuICAgICAqIEBwYXJhbSBzb3VyY2Ug5rqQ5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVlcENvcHk8VD4oc291cmNlOiBUKTogVCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIgfHwgc291cmNlID09PSBudWxsIHx8IHNvdXJjZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc291cmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0gbnVsbDtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5kZWVwQ29weShpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLmRlZXBDb3B5KHNvdXJjZVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8guatpeetieW+hSAtIHNldFRpbWVvdXRcclxuICAgICAqIEBwYXJhbSBzZWNvbmRzIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhaXQoc2Vjb25kczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0sIHNlY29uZHMgKiAxMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8guatpeetieW+hSAtIGNjLkNvbXBvbmVudC5zY2hlZHVsZU9uY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB3YWl0Q21wdChjbXB0OiBjYy5Db21wb25lbnQsIHNlY29uZHM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNtcHQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSwgc2Vjb25kcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvILmraXnrYnlvoUgLSB0d2VlbiDpu5jorqRncm91cOS4ulRXRUVOXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgd2FpdFR3ZWVuKGNtcHQ6IGNjLkNvbXBvbmVudCwgc2Vjb25kczogbnVtYmVyLCBncm91cDogR3JvdXAgPSBUV0VFTik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBUd2Vlbih7IGs6IDAgfSwgZ3JvdXApXHJcbiAgICAgICAgICAgICAgICAudG8oeyBrOiAxIH0sIHNlY29uZHMgKiAxMDAwKVxyXG4gICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgLmJpbmRDQ09iamVjdChjbXB0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7pXR3ZWVu5ZGo5pyf5oCn5omn6KGM5Zue6LCD77yM5Lya6ZqP57uR5a6a55qEdGFyZ2V06ZSA5q+B6ICM6ZSA5q+BXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICogQHBhcmFtIGludGVydmFsIOWbnuiwg+mXtOmalOaXtumXtCDnp5JcclxuICAgICAqIEBwYXJhbSByZXBlYXQg5Zue6LCD5YWx5Lya5omn6KGMcmVwZWF0KzHmrKFcclxuICAgICAqIEBwYXJhbSBncm91cCB0d2VlbuWIhue7hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVkdWxlQnlUd2VlbihjYWxsYmFjazogKCkgPT4gdm9pZCwgdGFyZ2V0OiBjYy5PYmplY3QsIGludGVydmFsOiBudW1iZXIsIHJlcGVhdDogbnVtYmVyID0gMCwgZ3JvdXA6IEdyb3VwID0gVFdFRU4pIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGxldCBvbmNlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHsgYXJnOiAwIH07XHJcbiAgICAgICAgICAgIG5ldyBUd2VlbihkYXRhLCBncm91cClcclxuICAgICAgICAgICAgICAgIC5iaW5kQ0NPYmplY3QodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgLnRvKHsgYXJnOiAxIH0sIGludGVydmFsICogMTAwMClcclxuICAgICAgICAgICAgICAgIC5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDwgcmVwZWF0ICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb25jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57q/5oCn5o+S5YC8XHJcbiAgICAgKiBAcGFyYW0gYSDotbflp4vlgLxcclxuICAgICAqIEBwYXJhbSBiIOebruagh+WAvFxyXG4gICAgICogQHBhcmFtIHIgcmF0aW8gYmV0d2VlbiAwIGFuZCAxXHJcbiAgICAgKiBAcGFyYW0gbWluIOacgOWwj+mXtOmalOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlcnAoYTogbnVtYmVyLCBiOiBudW1iZXIsIHI6IG51bWJlciwgbWluOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcclxuICAgICAgICBtaW4gPSBNYXRoLmFicyhtaW4pO1xyXG4gICAgICAgIGxldCBjID0gYiAtIGE7XHJcbiAgICAgICAgbGV0IGRlbHRhID0gYyAqIHI7XHJcbiAgICAgICAgZGVsdGEgPSBkZWx0YSA8IDAgPyBNYXRoLm1pbihkZWx0YSwgLW1pbikgOiBNYXRoLm1heChkZWx0YSwgbWluKTtcclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpID4gTWF0aC5hYnMoYykpIHtcclxuICAgICAgICAgICAgZGVsdGEgPSBjO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYSArIGRlbHRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5Lik54K55Z2Q5qCHKOS4jeW5s+ihjOS6juWdkOagh+i9tCnlkox477yM6K6h566X5Lik54K55byP5pa556iL57uT5p6ceVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbGNUd29Qb2ludEZvcm0ocDE6IGNjLlZlYzIsIHAyOiBjYy5WZWMyLCB4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChwMS54ID09PSBwMi54KSByZXR1cm4gcDEueTtcclxuICAgICAgICByZXR1cm4gKHAyLnkgLSBwMS55KSAqICh4IC0gcDEueCkgLyAocDIueCAtIHAxLngpICsgcDEueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4pOS4quefqeW9oueahOmHjeWPoOefqeW9ou+8jOS4jemHjeWPoOWImei/lOWbnm51bGxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVybGFwUmVjdChyMTogY2MuUmVjdCwgcjI6IGNjLlJlY3QpOiBjYy5SZWN0IHtcclxuICAgICAgICBsZXQgeE1pbiA9IE1hdGgubWF4KHIxLnhNaW4sIHIyLnhNaW4pO1xyXG4gICAgICAgIGxldCB4TWF4ID0gTWF0aC5taW4ocjEueE1heCwgcjIueE1heCk7XHJcbiAgICAgICAgbGV0IHlNaW4gPSBNYXRoLm1heChyMS55TWluLCByMi55TWluKTtcclxuICAgICAgICBsZXQgeU1heCA9IE1hdGgubWluKHIxLnlNYXgsIHIyLnlNYXgpO1xyXG5cclxuICAgICAgICBpZiAoeE1pbiA+IHhNYXggfHwgeU1pbiA+IHlNYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5yZWN0KHhNaW4sIHlNaW4sIHhNYXggLSB4TWluLCB5TWF4IC0geU1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIbop5LluqbnuqbmnZ/lnKggWzAsMzYwKSDljLrpl7TlhoVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBub3JtYWxpemVEZWdyZWUoZGVncmVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBkZWdyZWUgJSAzNjA7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IDM2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWchuW/g+WcqOWdkOagh+WOn+eCueeahOakreWchu+8jOS7peS4jnjovbTpgIbml7bpkojmlrnlkJHnmoTop5LluqborqHnrpflr7nlupTmpK3lnIbovrnkuIrnmoTlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRFbGxpcHNlUG9pbnQoYTogbnVtYmVyLCBiOiBudW1iZXIsIGRlZ3JlZTogbnVtYmVyKTogY2MuVmVjMiB7XHJcbiAgICAgICAgZGVncmVlID0gdGhpcy5ub3JtYWxpemVEZWdyZWUoZGVncmVlKTtcclxuICAgICAgICBsZXQgayA9IE1hdGgudGFuKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyhkZWdyZWUpKTtcclxuICAgICAgICBsZXQgeCA9IE1hdGguc3FydChiICogYiAvIChrICogayArIGIgKiBiIC8gYSAvIGEpKTtcclxuICAgICAgICBpZiAoZGVncmVlID4gOTAgJiYgZGVncmVlIDwgMjcwKSB7XHJcbiAgICAgICAgICAgIHggPSAteDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHkgPSBNYXRoLnNxcnQoYiAqIGIgLSBiICogYiAqIHggKiB4IC8gYSAvIGEpO1xyXG4gICAgICAgIGlmIChkZWdyZWUgPiAxODApIHtcclxuICAgICAgICAgICAgeSA9IC15O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5bCE57q/5LiO5ZyG5piv5ZCm55u45LqkXHJcbiAgICAgKiBAcGFyYW0gcmF5UG9pbnQg5bCE57q/6LW354K5XHJcbiAgICAgKiBAcGFyYW0gcmF5RGlyIOWwhOe6v+aWueWQkVxyXG4gICAgICogQHBhcmFtIGNpcmNsckNlbnRlciDlnIblv4NcclxuICAgICAqIEBwYXJhbSBjaXJjbGVSYWRpdXMg5ZyG5Y2K5b6EXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNSYXlDaXJjbGVJbnRlcnNlY3Rpb24ocmF5UG9pbnQ6IGNjLlZlYzIgfCBjYy5WZWMzLCByYXlEaXI6IGNjLlZlYzIsIGNpcmNsckNlbnRlcjogY2MuVmVjMiB8IGNjLlZlYzMsIGNpcmNsZVJhZGl1czogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGQgPSByYXlEaXIubWFnU3FyKCk7XHJcbiAgICAgICAgbGV0IHQgPSAoKGNpcmNsckNlbnRlci54IC0gcmF5UG9pbnQueCkgKiByYXlEaXIueCArIChjaXJjbHJDZW50ZXIueSAtIHJheVBvaW50LnkpICogcmF5RGlyLnkpIC8gZDtcclxuICAgICAgICBsZXQgcDtcclxuICAgICAgICBpZiAoZCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHAgPSByYXlQb2ludDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHAgPSByYXlQb2ludDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAgPSBjYy52MihyYXlQb2ludC54ICsgdCAqIHJheURpci54LCByYXlQb2ludC55ICsgdCAqIHJheURpci55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHggPSBjaXJjbHJDZW50ZXIueCAtIHAueDtcclxuICAgICAgICBsZXQgZHkgPSBjaXJjbHJDZW50ZXIueSAtIHAueTtcclxuICAgICAgICByZXR1cm4gKGR4ICogZHggKyBkeSAqIGR5KSA8PSBjaXJjbGVSYWRpdXMgKiBjaXJjbGVSYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm552YWx1ZeaYr+WQpuWcqCBbbWluLCBtYXhdIOWMuumXtOWGhVxyXG4gICAgICogQHBhcmFtIG1pbiBcclxuICAgICAqIEBwYXJhbSBtYXggXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwYXJhbSBpbmNsdWRlRWRnZSB0cnVlKOm7mOiupOWAvCk6IFttaW4sIG1heF07IGZhbHNlOiAobWluLCBtYXgpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5SYW5nZShtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHZhbHVlOiBudW1iZXIsIGluY2x1ZGVFZGdlOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbmNsdWRlRWRnZSA/IHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXggOiB2YWx1ZSA+IG1pbiAmJiB2YWx1ZSA8IG1heDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWMuumXtFttaW4sIG1heCnnmoTmlbTmlbDvvIzkvKDlhaUx5Liq5Y+C5pWw5YiZ5Yy66Ze05Li6WzAsIG1pbilcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByYW5kSW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciA9IHVuZGVmaW5lZCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG1heCA9IG1pbjtcclxuICAgICAgICAgICAgbWluID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWluID0gTWF0aC5jZWlsKG1pbik7XHJcbiAgICAgICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bljLrpl7RbbWluLCBtYXgp55qE5rWu54K55pWw77yM5Lyg5YWlMeS4quWPguaVsOWImeWMuumXtOS4ulswLCBtaW4pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZEZsb2F0KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciA9IHVuZGVmaW5lZCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG1heCA9IG1pbjtcclxuICAgICAgICAgICAgbWluID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4gOS4quamgueOh+WAvCglKeeahOmaj+acuue7k+aenOaYr+WQpuWcqOamgueOh+iMg+WbtOWGhVxyXG4gICAgICogQHBhcmFtIHJhdGUg5qaC546H5YC8KCUpIFswLDEwMF1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByYW5kUmF0ZVJlc3VsdChyYXRlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5kRmxvYXQoMTAwKSA8IHJhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7mnYPph43mlbDnu4Tov5vooYzpmo/mnLrvvIzov5Tlm57nu5PmnpzkuIvmoIdcclxuICAgICAqIEBwYXJhbSB3ZWlnaHRBcnIg5p2D6YeN5pWw57uEXHJcbiAgICAgKiBAcmV0dXJucyDpmo/mnLrliLDnmoTmnYPph43mlbDnu4TkuIvmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByYW5kV2VpZ2h0SWR4KHdlaWdodEFycjogbnVtYmVyW10pIHtcclxuICAgICAgICBsZXQgc3VtID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlaWdodEFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzdW0gKz0gd2VpZ2h0QXJyW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmFuZE51bSA9IHRoaXMucmFuZEZsb2F0KDAsIHN1bSk7XHJcbiAgICAgICAgbGV0IGN1clZhbHVlID0gMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VpZ2h0QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGN1clZhbHVlICs9IHdlaWdodEFycltpXTtcclxuICAgICAgICAgICAgaWYgKHJhbmROdW0gPCBjdXJWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdlaWdodEFyci5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlzaGVy4oCTWWF0ZXMgc2h1ZmZsZSDlrZfnrKbkuLLpmo/mnLrkubHluo9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaHVmZmxlU3RyaW5nKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgYXJyOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHN0cltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyciA9IHRoaXMuc2h1ZmZsZShhcnIpO1xyXG4gICAgICAgIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgYXJyLmZvckVhY2goKHYpID0+IHtcclxuICAgICAgICAgICAgc3RyICs9IHY7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpc2hlcuKAk1lhdGVzIHNodWZmbGUg5pWw57uE6ZqP5py65Lmx5bqPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2h1ZmZsZTxUPihhcnI6IEFycmF5PFQ+KTogQXJyYXk8VD4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcbiAgICAgICAgICAgIFthcnJbcmFuZG9tSW5kZXhdLCBhcnJbaV1dID0gW2FycltpXSwgYXJyW3JhbmRvbUluZGV4XV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmo/mnLrov5Tlm57mlbDnu4TkuK3nmoTkuIDkuKrlhYPntKBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhcnJheVJhbmQ8VD4oYXJyOiBBcnJheTxUPik6IFQge1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJbdGhpcy5yYW5kSW50KDAsIGFyci5sZW5ndGgpXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaVsOe7hOS4reaYr+WQpuacieafkOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGFyciDmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwYXJhbSDlhYPntKDlgLzmiJbooajovr7lhYPntKDlgLzmu6HotrPmn5Dnp43mnaHku7bnmoTlh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhcnJheUhhczxUPihhcnI6IFRbXSwgcGFyYW06IFQgfCAoKGVsZTogVCkgPT4gYm9vbGVhbikpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaWR4ID0gdHlwZW9mIHBhcmFtICE9PSBcImZ1bmN0aW9uXCIgPyBhcnIuZmluZEluZGV4KChlKSA9PiB7IHJldHVybiBlID09PSBwYXJhbTsgfSkgOiBhcnIuZmluZEluZGV4KHBhcmFtIGFzICgoZWxlOiBUKSA9PiBib29sZWFuKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkeCA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5LiL5qCH5Lqk5o2i5pWw57uE5Lik5Liq5YWD57Sg5L2N572uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXJyYXlTd2FwPFQ+KGFycjogVFtdLCBpZHgxOiBudW1iZXIsIGlkeDI6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChpZHgxID09PSBpZHgyIHx8ICF0aGlzLmluUmFuZ2UoMCwgYXJyLmxlbmd0aCAtIDEsIGlkeDEpIHx8ICF0aGlzLmluUmFuZ2UoMCwgYXJyLmxlbmd0aCAtIDEsIGlkeDIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgW2FycltpZHgxXSwgYXJyW2lkeDJdXSA9IFthcnJbaWR4Ml0sIGFycltpZHgxXV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIblhYPntKDku45mcm9tSWR45L2N572u56e75YiwdG9JZHjkvY3nva7vvIzlhbbkvZnlhYPntKDnm7jlr7nkvY3nva7kuI3lj5hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhcnJheU1vdmU8VD4oYXJyOiBUW10sIGZyb21JZHg6IG51bWJlciwgdG9JZHg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChmcm9tSWR4ID09PSB0b0lkeCB8fCAhdGhpcy5pblJhbmdlKDAsIGFyci5sZW5ndGggLSAxLCBmcm9tSWR4KSB8fCAhdGhpcy5pblJhbmdlKDAsIGFyci5sZW5ndGggLSAxLCB0b0lkeCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZnJvbTogVFtdID0gYXJyLnNwbGljZShmcm9tSWR4LCAxKTtcclxuICAgICAgICBhcnIuc3BsaWNlKHRvSWR4LCAwLCBmcm9tWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaVsOe7hOS4rea3u+WKoOafkOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGNhblJlcGVhdCDmmK/lkKblj6/ph43lpI3mt7vliqDnm7jlkIzlhYPntKAg6buY6K6kZmFsc2VcclxuICAgICAqIEByZXR1cm4g5piv5ZCm5omn6KGM5LqG5re75Yqg6KGM5Li6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXJyYXlBZGQ8VD4oYXJyOiBUW10sIGVsZTogVCwgY2FuUmVwZWF0OiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIWNhblJlcGVhdCAmJiB0aGlzLmFycmF5SGFzKGFyciwgZWxlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5wdXNoKGVsZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjmlbDnu4TkuK3liKDpmaTmn5DkuKrlhYPntKAo6Iul5pyJ5aSa5Liq55u45ZCM5YWD57Sg5YiZ5Y+q5Yig6Zmk56ys5LiA5LiqKVxyXG4gICAgICogQHJldHVybiDmmK/lkKbmiafooYzkuobliKDpmaTooYzkuLpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhcnJheURlbGV0ZTxUPihhcnI6IFRbXSwgZWxlOiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBhcnIuZmluZEluZGV4KChlKSA9PiB7IHJldHVybiBlID09PSBlbGU7IH0pO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5Y+C5pWw6L+U5Zue5qC85byP5YyW5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gdGV4dCDmupDlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBvcHRpb24g55So5LqO5qC85byP5YyW5rqQ5a2X56ym5Liy55qE5pWw5o2u77yM5Y+v5Lul5piv6ZSu5YC85a+577yM5Lmf5Y+v5Lul5oyJ6aG65bqP5Lyg5Y+CXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8g5Y+v5L2/55So5Lul5LiL5Lik56eN6LCD55So5pa55byP77yM6L+U5Zue57uT5p6c6YO95pivXCLmtYvor5XlrZfnrKbkuLIxMTEtLWFiYy4uLlwiXHJcbiAgICAgKiBUb29sLmZvcm1hdFN0cmluZyhcIua1i+ivleWtl+espuS4siV7YTF9LS0le2EyfS4uLlwiLCB7YTE6IDExMSwgYTI6IFwiYWJjXCJ9KTtcclxuICAgICAqIFRvb2wuZm9ybWF0U3RyaW5nKFwi5rWL6K+V5a2X56ym5LiyJXthMX0tLSV7YTJ9Li4uXCIsIDExMSwgXCJhYmNcIik7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9ybWF0U3RyaW5nKHRleHQ6IHN0cmluZywgLi4ub3B0aW9uOiBbUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPl0gfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+KTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGV4dDtcclxuICAgICAgICBpZiAob3B0aW9uLmxlbmd0aCA9PT0gMSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3B0aW9uWzBdKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xyXG4gICAgICAgICAgICAvLyDlj4LmlbDkuLrplK7lgLzlr7lcclxuICAgICAgICAgICAgZm9yIChsZXQgYXJnIGluIChvcHRpb25bMF0gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPikpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25bMF0uaGFzT3duUHJvcGVydHkoYXJnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWcgPSBuZXcgUmVnRXhwKGAleyR7YXJnfX1gLCBcImdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocmVnLCBgJHtvcHRpb25bMF1bYXJnXX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOWPguaVsOS4uuaVsOe7hFxyXG4gICAgICAgICAgICBvcHRpb24uZm9yRWFjaCgodmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoLyVcXHsuKj9cXH0vLCBgJHt2YWx1ZX1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nkuIDmrrXml7bpl7Tov5Tlm57moLzlvI/ljJbml7bpl7TlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBzZWMg5pe26Ze0c1xyXG4gICAgICogQHBhcmFtIGZvcm1hdCDmoLzlvI/ljJblrZfnrKbkuLJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyDlvZNmb3JtYXTkuLpzdHJpbmfml7bvvIzkvJrku6Vmb3JtYXTkuK3nmoTmnIDlpKfml7bpl7TljZXkvY3ov5vooYzmoLzlvI/ljJZcclxuICAgICAqIFRvb2wuZm9ybWF0VGltZVN0cmluZygzNjAxLCBcIiV7bX06JXtzfVwiKTsgLy8gNjA6MVxyXG4gICAgICogVG9vbC5mb3JtYXRUaW1lU3RyaW5nKDM2MDEsIFwiJXttbX06JXtzc31cIik7IC8vIDYwOjAxXHJcbiAgICAgKiBUb29sLmZvcm1hdFRpbWVTdHJpbmcoMzYwMSwgXCIle2hofTole21tfTole3NzfVwiKTsgLy8gMDE6MDA6MDFcclxuICAgICAqIFxyXG4gICAgICogLy8g5b2TZm9ybWF05Li6b2JqZWN05pe277yM5Lya5Lul5Lyg5YWl55qEc2Vj6K6h566X5pyA5aSn55qE5pe26Ze05Y2V5L2N77yM5bm26YCJ5oupZm9ybWF05a+55bqU55qE5a2X56ym5Liy6L+b6KGM5qC85byP5YyWXHJcbiAgICAgKiBUb29sLmZvcm1hdFRpbWVTdHJpbmcoMTAwLCB7XHJcbiAgICAgKiAgICAgUzogXCIle3N956eSXCIsXHJcbiAgICAgKiAgICAgTTogXCIle2195YiGJXtzfeenklwiLFxyXG4gICAgICogICAgIEg6IFwiJXtofeaXtiV7bX3liIYle3N956eSXCIsXHJcbiAgICAgKiAgICAgRDogXCIle2R95aSpJXtofeaXtiV7bX3liIYle3N956eSXCJcclxuICAgICAqIH0pOyAvLyAx5YiGNDDnp5JcclxuICAgICAqIFRvb2wuZm9ybWF0VGltZVN0cmluZygxMDAwMDAsIHtcclxuICAgICAqICAgICBTOiBcIiV7c33np5JcIixcclxuICAgICAqICAgICBNOiBcIiV7bX3liIYle3N956eSXCIsXHJcbiAgICAgKiAgICAgSDogXCIle2h95pe2JXttfeWIhiV7c33np5JcIixcclxuICAgICAqICAgICBEOiBcIiV7ZH3lpKkle2h95pe2JXttfeWIhiV7c33np5JcIlxyXG4gICAgICogfSk7IC8vIDHlpKkz5pe2NDbliIY0MOenklxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdFRpbWVTdHJpbmcoc2VjOiBudW1iZXIsIGZvcm1hdDogc3RyaW5nIHwgeyBcIlNcIjogc3RyaW5nOyBcIk1cIjogc3RyaW5nOyBcIkhcIjogc3RyaW5nOyBcIkRcIjogc3RyaW5nIH0gPSBcIiV7aGh9OiV7bW19OiV7c3N9XCIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSBNYXRoLmZsb29yKHNlYyk7XHJcbiAgICAgICAgbGV0IG1pbnV0ZXM6IG51bWJlciA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBsZXQgaG91cnM6IG51bWJlciA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xyXG4gICAgICAgIGxldCBkYXlzOiBudW1iZXIgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCk7XHJcblxyXG4gICAgICAgIGxldCBtYXhVbml0OiBUaW1lVW5pdCA9IFRpbWVVbml0LlM7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgLy8g5p+l6K+i5qC85byP5YyW5a2X56ym5Liy5Lit5pyA5aSn55qE5Y2V5L2NXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgaWYgKC8lXFx7ZCtcXH0vLnRlc3QoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICAgICAgbWF4VW5pdCA9IFRpbWVVbml0LkQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoLyVcXHtoK1xcfS8udGVzdChmb3JtYXQpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhVbml0ID0gVGltZVVuaXQuSDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgvJVxce20rXFx9Ly50ZXN0KGZvcm1hdCkpIHtcclxuICAgICAgICAgICAgICAgIG1heFVuaXQgPSBUaW1lVW5pdC5NO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5Lul5Lyg5YWl55qE5pWw5YC85Yik5pat5pyA5aSn5Y2V5L2NXHJcbiAgICAgICAgICAgIGlmIChkYXlzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbWF4VW5pdCA9IFRpbWVVbml0LkQ7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmb3JtYXQuRDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1heFVuaXQgPSBUaW1lVW5pdC5IO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZm9ybWF0Lkg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWludXRlcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1heFVuaXQgPSBUaW1lVW5pdC5NO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZm9ybWF0Lk07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXhVbml0ID0gVGltZVVuaXQuUztcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdC5TO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF4VW5pdCA+IFRpbWVVbml0LlMpIHtcclxuICAgICAgICAgICAgc2Vjb25kcyAlPSA2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1heFVuaXQgPiBUaW1lVW5pdC5NKSB7XHJcbiAgICAgICAgICAgIG1pbnV0ZXMgJT0gNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXhVbml0ID4gVGltZVVuaXQuSCkge1xyXG4gICAgICAgICAgICBob3VycyAlPSAyNDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBkZDogZGF5cyA8IDEwID8gYDAke2RheXN9YCA6IGAke2RheXN9YCxcclxuICAgICAgICAgICAgZDogYCR7ZGF5c31gLFxyXG4gICAgICAgICAgICBoaDogaG91cnMgPCAxMCA/IGAwJHtob3Vyc31gIDogYCR7aG91cnN9YCxcclxuICAgICAgICAgICAgaDogYCR7aG91cnN9YCxcclxuICAgICAgICAgICAgbW06IG1pbnV0ZXMgPCAxMCA/IGAwJHttaW51dGVzfWAgOiBgJHttaW51dGVzfWAsXHJcbiAgICAgICAgICAgIG06IGAke21pbnV0ZXN9YCxcclxuICAgICAgICAgICAgc3M6IHNlY29uZHMgPCAxMCA/IGAwJHtzZWNvbmRzfWAgOiBgJHtzZWNvbmRzfWAsXHJcbiAgICAgICAgICAgIHM6IGAke3NlY29uZHN9YFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5mb3JtYXRTdHJpbmcocmVzdWx0LCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG5LiA5LiqRGF0ZeWvueixoeaIlkRhdGXml7bpl7TmiLPov5Tlm57moLzlvI/ljJbml6XmnJ/lrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBkYXRlIERhdGXlr7nosaHmiJZEYXRl5pe26Ze05oizXHJcbiAgICAgKiBAcGFyYW0gZm9ybWF0IOagvOW8j+WMluWtl+espuS4slxyXG4gICAgICogQHBhcmFtIGlzVVRDIHRydWU6VVRD5pe26Ze0IGZhbHNlOuacrOWcsOaXtumXtFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIFRvb2wuZm9ybWF0RGF0ZVN0cmluZygwLCBcIiV7WVlZWX0tJXtNTX0tJXtkZH0gJXtoaH06JXttbX06JXtzc31cIiwgdHJ1ZSk7IC8vIFwiMTk3MC0wMS0wMSAwMDowMDowMFwiXHJcbiAgICAgKiBUb29sLmZvcm1hdERhdGVTdHJpbmcoMCwgXCIle2RkfS8le01NfS8le1lZfVwiLCB0cnVlKTsgLy8gXCIwMS8wMS83MFwiXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9ybWF0RGF0ZVN0cmluZyhkYXRlOiBudW1iZXIgfCBEYXRlLCBmb3JtYXQ6IHN0cmluZyA9IFwiJXtZWVlZfS0le01NfS0le2RkfSAle2hofTole21tfTole3NzfVwiLCBpc1VUQzogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgc3JjID0gZGF0ZSBpbnN0YW5jZW9mIERhdGUgPyBkYXRlIDogbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgbGV0IHllYXIgPSBpc1VUQyA/IHNyYy5nZXRVVENGdWxsWWVhcigpIDogc3JjLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gaXNVVEMgPyBzcmMuZ2V0VVRDTW9udGgoKSArIDEgOiBzcmMuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgbGV0IGRheXMgPSBpc1VUQyA/IHNyYy5nZXRVVENEYXRlKCkgOiBzcmMuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGxldCBob3VycyA9IGlzVVRDID8gc3JjLmdldFVUQ0hvdXJzKCkgOiBzcmMuZ2V0SG91cnMoKTtcclxuICAgICAgICBsZXQgbWludXRlcyA9IGlzVVRDID8gc3JjLmdldFVUQ01pbnV0ZXMoKSA6IHNyYy5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgbGV0IHNlY29uZHMgPSBpc1VUQyA/IHNyYy5nZXRVVENTZWNvbmRzKCkgOiBzcmMuZ2V0U2Vjb25kcygpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgWVlZWTogYCR7eWVhcn1gLFxyXG4gICAgICAgICAgICBZWTogeWVhciAlIDEwMCA8IDEwID8gYDAke3llYXIgJSAxMDB9YCA6IGAke3llYXIgJSAxMDB9YCxcclxuICAgICAgICAgICAgTU06IG1vbnRoIDwgMTAgPyBgMCR7bW9udGh9YCA6IGAke21vbnRofWAsXHJcbiAgICAgICAgICAgIE06IGAke21vbnRofWAsXHJcbiAgICAgICAgICAgIGRkOiBkYXlzIDwgMTAgPyBgMCR7ZGF5c31gIDogYCR7ZGF5c31gLFxyXG4gICAgICAgICAgICBkOiBgJHtkYXlzfWAsXHJcbiAgICAgICAgICAgIGhoOiBob3VycyA8IDEwID8gYDAke2hvdXJzfWAgOiBgJHtob3Vyc31gLFxyXG4gICAgICAgICAgICBoOiBgJHtob3Vyc31gLFxyXG4gICAgICAgICAgICBtbTogbWludXRlcyA8IDEwID8gYDAke21pbnV0ZXN9YCA6IGAke21pbnV0ZXN9YCxcclxuICAgICAgICAgICAgbTogYCR7bWludXRlc31gLFxyXG4gICAgICAgICAgICBzczogc2Vjb25kcyA8IDEwID8gYDAke3NlY29uZHN9YCA6IGAke3NlY29uZHN9YCxcclxuICAgICAgICAgICAgczogYCR7c2Vjb25kc31gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmZvcm1hdFN0cmluZyhmb3JtYXQsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZDoioLngrnpgJLlvZLlpITnkIZcclxuICAgICAqIEBwYXJhbSBub2RlIOmcgOimgemAkuW9kuWkhOeQhueahOiKgueCueaIluiKgueCueaVsOe7hFxyXG4gICAgICogQHBhcmFtIGNiIOiKgueCueWkhOeQhuWHveaVsFxyXG4gICAgICogQHBhcmFtIHRoaXNBcmcgY2Lnu5HlrprnmoR0aGlz5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbm9kZVJlY3Vyc2l2ZShub2RlOiBjYy5Ob2RlIHwgY2MuTm9kZVtdLCBjYjogKG46IGNjLk5vZGUpID0+IHZvaWQsIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgY2MuTm9kZSkge1xyXG4gICAgICAgICAgICBjYi5jYWxsKHRoaXNBcmcsIG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKG46IGNjLk5vZGUpID0+IHsgdGhpcy5ub2RlUmVjdXJzaXZlKG4sIGNiLCB0aGlzQXJnKTsgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZm9yRWFjaCgobjogY2MuTm9kZSkgPT4geyB0aGlzLm5vZGVSZWN1cnNpdmUobiwgY2IsIHRoaXNBcmcpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXN0cm955bm256uL5Y2zcmVtb3Zl5Lyg5YWl6IqC54K555qE5omA5pyJ5a2Q6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJDaGlsZHJlbiguLi5ub2RlczogY2MuTm9kZVtdKTogdm9pZCB7XHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOS4uuiKgueCuea3u+WKoOW4puWPguaVsOeahOeCueWHu+S6i+S7tlxyXG4gICAgKiBAcGFyYW0gbm9kZSDmt7vliqDngrnlh7vkuovku7bnmoToioLngrlcclxuICAgICogQHBhcmFtIGNvbXBvbmVudCDnu4Tku7blkI3np7AgLS0g6ISa5pys5ZCN56ewXHJcbiAgICAqIEBwYXJhbSBjYWxsQmFjayDngrnlh7vkuovku7blh73mlbAgLS0g6ZyA6KaB5Zyo6K+lY29tcG9uZW506ISa5pys5YaF55qE5pa55rOVXHJcbiAgICAqIEBwYXJhbSBwYXJhbSDngrnlh7vkuovku7bkvKDlhaXnmoTlj4LmlbBcclxuICAgICogQHBhcmFtIHRhcmdldCDkuovku7blpITnkIbku6PnoIHnu4Tku7bmiYDlsZ7nmoToioLngrkgLS0g6K+lY29tcG9uZW506ISa5pys5omA5oyC6L295Zyo55qE6IqC54K5XHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGRQYXJhbUJ1dHRvbkNsaWNrKG5vZGU6IGNjLk5vZGUsIGNvbXBvbmVudDogc3RyaW5nLCBjYWxsQmFjazogc3RyaW5nLCBwYXJhbTogc3RyaW5nLCB0YXJnZXQ6IGNjLk5vZGUsIHNjYWxlPzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBjbGlja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKClcclxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci50YXJnZXQgPSB0YXJnZXQgLy8g5LqL5Lu25aSE55CG5Luj56CB57uE5Lu25omA5bGe55qE6IqC54K5IC0tIOivpWNvbXBvbmVudOiEmuacrOaJgOaMgui9veWcqOeahOiKgueCuVxyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IGNvbXBvbmVudCAvLyDnu4Tku7blkI3np7AgLS0g6ISa5pys5ZCN56ewXHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IGNhbGxCYWNrIC8vIOeCueWHu+S6i+S7tuWHveaVsCAtLSDpnIDopoHlnKjor6Vjb21wb25lbnTohJrmnKzlhoXnmoTmlrnms5VcclxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5jdXN0b21FdmVudERhdGEgPSBwYXJhbSAvLyDngrnlh7vkuovku7bkvKDlhaXnmoTlj4LmlbBcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbilcclxuICAgICAgICBpZiAoIWJ1dHRvbikge1xyXG4gICAgICAgICAgICBidXR0b24gPSBub2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY2FsZSkge1xyXG4gICAgICAgICAgICBidXR0b24udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXR0b24uY2xpY2tFdmVudHMgPSBbXVxyXG4gICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnRIYW5kbGVyKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDop6Pnu5HluKblj4LmlbDnmoTngrnlh7vkuovku7ZcclxuICAgICogQHBhcmFtIG5vZGUg5re75Yqg54K55Ye75LqL5Lu255qE6IqC54K5XHJcbiAgICAqIEBwYXJhbSBjb21wb25lbnQg57uE5Lu25ZCN56ewIC0tIOiEmuacrOWQjeensFxyXG4gICAgKiBAcGFyYW0gY2FsbEJhY2sg54K55Ye75LqL5Lu25Ye95pWwIC0tIOmcgOimgeWcqOivpWNvbXBvbmVudOiEmuacrOWGheeahOaWueazlVxyXG4gICAgKiBAcGFyYW0gdGFyZ2V0IOS6i+S7tuWkhOeQhuS7o+eggee7hOS7tuaJgOWxnueahOiKgueCuSAtLSDor6Vjb21wb25lbnTohJrmnKzmiYDmjILovb3lnKjnmoToioLngrlcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZVBhcmFtQnV0dG9uQ2xpY2sobm9kZTogY2MuTm9kZSwgY29tcG9uZW50OiBzdHJpbmcsIGNhbGxCYWNrOiBzdHJpbmcsIHRhcmdldDogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBidXR0b24gPSBub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGJ1dHRvbi5jbGlja0V2ZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGJ1dHRvbi5jbGlja0V2ZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIudGFyZ2V0ID09PSB0YXJnZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuY29tcG9uZW50ID09PSBjb21wb25lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9PT0gY2FsbEJhY2tcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOenu+mZpOWvueW6lOeahOeCueWHu+S6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==