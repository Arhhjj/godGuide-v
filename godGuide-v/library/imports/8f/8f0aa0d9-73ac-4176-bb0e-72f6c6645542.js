"use strict";
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