"use strict";
cc._RF.push(module, 'aae4cQnarlFE4m+zeU7vd7m', 'Events');
// scripts/common/util/Events.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadEvent = exports.eventsOnEnable = exports.eventsOnLoad = void 0;
var EventName_1 = require("../const/EventName");
//#region 装饰器
/**
 * 重写类方法
 * @param constructor 构造函数
 * @param onKey 在该方法内部调用Events.targetOn
 * @param offKey 在该方法内部调用Events.targetOff
 * @param onSuper 是否注册父类成员方法上绑定的事件，默认true
 */
function rewrite(constructor, onKey, offKey, onSuper) {
    if (onSuper === void 0) { onSuper = true; }
    var onFunc = constructor.prototype[onKey];
    var offFunc = constructor.prototype[offKey];
    constructor.prototype[onKey] = function () {
        Events.targetOn(this, onSuper);
        onFunc && onFunc.call(this);
    };
    constructor.prototype[offKey] = function () {
        Events.targetOff(this);
        offFunc && offFunc.call(this);
    };
}
/**
 * 类装饰器。用于覆盖onLoad和onDestroy方法，在onLoad中注册preloadEvent绑定的所有事件，在onDestroy注销绑定的所有事件
 * @param onSuper 是否注册父类成员方法上绑定的事件，默认true
 */
function eventsOnLoad(onSuper) {
    if (onSuper === void 0) { onSuper = true; }
    return function (constructor) {
        rewrite(constructor, "onLoad", "onDestroy", onSuper);
    };
}
exports.eventsOnLoad = eventsOnLoad;
/**
 * 类装饰器。用于覆盖onEnable和onDisable方法，在onEnable中注册preloadEvent绑定的所有事件，在onDisable注销绑定的所有事件
 * @param onSuper 是否注册父类成员方法上绑定的事件，默认true
 */
function eventsOnEnable(onSuper) {
    if (onSuper === void 0) { onSuper = true; }
    return function (constructor) {
        rewrite(constructor, "onEnable", "onDisable", onSuper);
    };
}
exports.eventsOnEnable = eventsOnEnable;
/**
 * 非静态成员方法装饰器。用于预先载入待注册的事件，配合eventsOnLoad、eventsOnEnable、targetOn使用
 * @param event 事件名
 * @param once 事件是否只会触发一次，默认false
 */
function preloadEvent(event, once) {
    if (once === void 0) { once = false; }
    return function (target, funcName, desc) {
        var arr = Events.classMap.get(target.constructor);
        if (arr === undefined) {
            arr = [];
            Events.classMap.set(target.constructor, arr);
        }
        else {
            var find = arr.find(function (e) {
                return e.event === event && e.funcName === funcName;
            });
            if (find) {
                cc.error("event: " + EventName_1.EventName[event] + " \u91CD\u590D\u8F7D\u5165");
                return;
            }
        }
        arr.push({
            event: event,
            funcName: funcName,
            once: once
        });
    };
}
exports.preloadEvent = preloadEvent;
//#endregion
/**
 * 事件收发管理类
 */
var Events = /** @class */ (function () {
    function Events() {
    }
    /**
     * 注册与target构造函数预先绑定的所有事件
     * @param target 注册目标
     * @param onSuper 是否注册父类成员方法上绑定的事件，默认true
     */
    Events.targetOn = function (target, onSuper) {
        var _this = this;
        if (onSuper === void 0) { onSuper = true; }
        if (onSuper) {
            this.classMap.forEach(function (value, key) {
                if (target instanceof key) {
                    for (var i = 0; i < value.length; i++) {
                        var e = value[i];
                        _this.on(e.event, target[e.funcName], target, e.once);
                    }
                }
            });
        }
        else {
            var arr = this.classMap.get(target.constructor);
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var e = arr[i];
                    this.on(e.event, target[e.funcName], target, e.once);
                }
            }
        }
    };
    /**
     * 注册事件
     * @param event 事件名
     * @param cb 处理事件的监听函数
     * @param target 注册目标
     * @param once 事件是否只会触发一次，默认false
     */
    Events.on = function (event, cb, target, once) {
        if (once === void 0) { once = false; }
        if (!cb || !target) {
            cc.error("event: " + EventName_1.EventName[event] + " listener\u6216target\u4E0D\u80FD\u4E3A\u7A7A");
            return;
        }
        var map = this._eventsMap.get(event);
        var list = [];
        if (map === undefined) {
            map = new Map();
            map.set(target, list);
            this._eventsMap.set(event, map);
        }
        else {
            list = map.get(target);
            if (list === undefined) {
                list = [];
                map.set(target, list);
            }
            else {
                var result = list.find(function (e) { return e.cb === cb; });
                if (result) {
                    cc.error("event: " + EventName_1.EventName[event] + " \u91CD\u590D\u6CE8\u518C");
                    return;
                }
            }
        }
        var listener = {
            cb: cb,
            once: once
        };
        list.push(listener);
    };
    /**
     * 注册事件，触发一次后自动注销
     * @param event 事件名
     * @param cb 处理事件的监听函数
     * @param target 注册目标
     */
    Events.once = function (event, cb, target) {
        this.on(event, cb, target, true);
    };
    /**
     * 移除事件
     * @param event 事件名
     * @param cb 处理事件的监听函数
     * @param target 注册目标
     */
    Events.off = function (event, cb, target) {
        if (!cb || !target) {
            cc.error("event: " + EventName_1.EventName[event] + " listener\u6216target\u4E0D\u80FD\u4E3A\u7A7A");
            return;
        }
        var map = this._eventsMap.get(event);
        if (map === undefined) {
            cc.error("event: " + EventName_1.EventName[event] + " \u672A\u6CE8\u518C\u8BE5\u4E8B\u4EF6");
            return;
        }
        var list = map.get(target);
        if (list === undefined) {
            cc.error("event: " + EventName_1.EventName[event] + " target\u4E0A\u672A\u6CE8\u518C\u8BE5\u4E8B\u4EF6");
            return;
        }
        var index = list.findIndex(function (e) { return e.cb === cb; });
        if (index < 0) {
            cc.error("event: " + EventName_1.EventName[event] + " target\u4E0A\u672A\u4EE5\u8BE5listener\u6CE8\u518C\u8BE5\u4E8B\u4EF6");
            return;
        }
        list.splice(index, 1);
        if (list.length <= 0) {
            map.delete(target);
            map.size <= 0 && this._eventsMap.delete(event);
        }
    };
    /**
     * 移除target上注册的所有事件
     * @param target 注册目标
     */
    Events.targetOff = function (target) {
        var _this = this;
        if (!target) {
            cc.error("event: " + target + " target\u4E0D\u80FD\u4E3A\u7A7A");
            return;
        }
        this._eventsMap.forEach(function (map, event) {
            map.delete(target);
            map.size <= 0 && _this._eventsMap.delete(event);
        });
    };
    /**
     * 派发事件
     * @param event 事件名
     * @param args 事件参数
     */
    Events.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var map = this._eventsMap.get(event);
        if (map === undefined) {
            cc.warn("event: " + EventName_1.EventName[event] + " \u672A\u6CE8\u518C\u8BE5\u4E8B\u4EF6");
            return;
        }
        var i;
        var callArr = [];
        var onceArr = [];
        map.forEach(function (list, target) {
            for (i = 0; i < list.length; i++) {
                var listener = list[i];
                callArr.push({ cb: listener.cb, target: target });
                if (listener.once) {
                    onceArr.push({ cb: listener.cb, target: target });
                }
            }
        });
        // 移除所有once的监听
        for (i = 0; i < onceArr.length; i++) {
            var e = onceArr[i];
            this.off(event, e.cb, e.target);
        }
        // 延迟到此处调用事件回调，防止受到回调过程中的 注册/注销 影响
        for (i = 0; i < callArr.length; i++) {
            var e = callArr[i];
            e.cb.apply(e.target, args);
        }
    };
    /**
     * 派发事件--异步
     * @param event 事件名
     * @param args 事件参数
     */
    Events.emitAsync = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var map, i, callArr, onceArr, e, arr, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        map = this._eventsMap.get(event);
                        if (map === undefined) {
                            cc.warn("event: " + EventName_1.EventName[event] + " \u672A\u6CE8\u518C\u8BE5\u4E8B\u4EF6");
                            return [2 /*return*/];
                        }
                        callArr = [];
                        onceArr = [];
                        map.forEach(function (list, target) {
                            for (i = 0; i < list.length; i++) {
                                var listener = list[i];
                                callArr.push({ cb: listener.cb, target: target });
                                if (listener.once) {
                                    onceArr.push({ cb: listener.cb, target: target });
                                }
                            }
                        });
                        // 移除所有once的监听
                        for (i = 0; i < onceArr.length; i++) {
                            e = onceArr[i];
                            this.off(event, e.cb, e.target);
                        }
                        arr = [];
                        for (i = 0; i < callArr.length; i++) {
                            e = callArr[i];
                            arr.push(e.cb.apply(e.target, args));
                        }
                        return [4 /*yield*/, Promise.all(arr)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 预加载数据，存储构造函数、监听事件、监听函数名，用于实例化时注册事件
     */
    Events.classMap = new Map();
    /**
     * 存储监听事件、监听函数与监听对象
     */
    Events._eventsMap = new Map();
    return Events;
}());
exports.default = Events;

cc._RF.pop();