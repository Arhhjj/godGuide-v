
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/Events.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQStDO0FBd0IvQyxhQUFhO0FBRWI7Ozs7OztHQU1HO0FBQ0gsU0FBUyxPQUFPLENBQUMsV0FBZ0IsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLE9BQXVCO0lBQXZCLHdCQUFBLEVBQUEsY0FBdUI7SUFDckYsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0IsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFBO0lBQ0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRztRQUM1QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixZQUFZLENBQUMsT0FBdUI7SUFBdkIsd0JBQUEsRUFBQSxjQUF1QjtJQUNoRCxPQUFPLFVBQVUsV0FBZ0I7UUFDN0IsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQztBQUNOLENBQUM7QUFKRCxvQ0FJQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLGNB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Qzt3QkFDSCxjQUFjO3dCQUNkLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDN0IsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ25DO3dCQUVHLEdBQUcsR0FBdUIsRUFBRSxDQUFDO3dCQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQzdCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUN4Qzt3QkFDRCxxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQzs7Ozs7S0FDMUI7SUFuTkQ7O09BRUc7SUFDVyxlQUFRLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7SUFFakU7O09BRUc7SUFDWSxpQkFBVSxHQUE0QyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBNE1uRixhQUFDO0NBck5ELEFBcU5DLElBQUE7a0JBck5vQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcIi4uL2NvbnN0L0V2ZW50TmFtZVwiO1xyXG5cclxuLyoqXHJcbiAqIOijhemlsOWZqOmihOWKoOi9veaVsOaNrlxyXG4gKi9cclxuaW50ZXJmYWNlIFByZWxvYWREYXRhIHtcclxuICAgIC8qKiDkuovku7blkI0gKi9cclxuICAgIGV2ZW50OiBFdmVudE5hbWU7XHJcbiAgICAvKiog5LqL5Lu25Zue6LCD5Ye95pWw5ZCNICovXHJcbiAgICBmdW5jTmFtZTogc3RyaW5nO1xyXG4gICAgLyoqIOS6i+S7tuaYr+WQpuWPquS8muinpuWPkeS4gOasoSAqL1xyXG4gICAgb25jZTogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOebkeWQrOWZqFxyXG4gKi9cclxuaW50ZXJmYWNlIExpc3RlbmVyIHtcclxuICAgIC8qKiDlm57osIMgKi9cclxuICAgIGNiOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkO1xyXG4gICAgLyoqIOaYr+WQpuWPquinpuWPkeS4gOasoSAqL1xyXG4gICAgb25jZTogYm9vbGVhbjtcclxufVxyXG5cclxuLy8jcmVnaW9uIOijhemlsOWZqFxyXG5cclxuLyoqXHJcbiAqIOmHjeWGmeexu+aWueazlVxyXG4gKiBAcGFyYW0gY29uc3RydWN0b3Ig5p6E6YCg5Ye95pWwXHJcbiAqIEBwYXJhbSBvbktleSDlnKjor6Xmlrnms5XlhoXpg6josIPnlKhFdmVudHMudGFyZ2V0T25cclxuICogQHBhcmFtIG9mZktleSDlnKjor6Xmlrnms5XlhoXpg6josIPnlKhFdmVudHMudGFyZ2V0T2ZmXHJcbiAqIEBwYXJhbSBvblN1cGVyIOaYr+WQpuazqOWGjOeItuexu+aIkOWRmOaWueazleS4iue7keWumueahOS6i+S7tu+8jOm7mOiupHRydWVcclxuICovXHJcbmZ1bmN0aW9uIHJld3JpdGUoY29uc3RydWN0b3I6IGFueSwgb25LZXk6IHN0cmluZywgb2ZmS2V5OiBzdHJpbmcsIG9uU3VwZXI6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICBsZXQgb25GdW5jID0gY29uc3RydWN0b3IucHJvdG90eXBlW29uS2V5XTtcclxuICAgIGxldCBvZmZGdW5jID0gY29uc3RydWN0b3IucHJvdG90eXBlW29mZktleV07XHJcbiAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb25LZXldID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEV2ZW50cy50YXJnZXRPbih0aGlzLCBvblN1cGVyKTtcclxuICAgICAgICBvbkZ1bmMgJiYgb25GdW5jLmNhbGwodGhpcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb2ZmS2V5XSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgIG9mZkZ1bmMgJiYgb2ZmRnVuYy5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog57G76KOF6aWw5Zmo44CC55So5LqO6KaG55uWb25Mb2Fk5ZKMb25EZXN0cm955pa55rOV77yM5Zyob25Mb2Fk5Lit5rOo5YaMcHJlbG9hZEV2ZW5057uR5a6a55qE5omA5pyJ5LqL5Lu277yM5Zyob25EZXN0cm955rOo6ZSA57uR5a6a55qE5omA5pyJ5LqL5Lu2XHJcbiAqIEBwYXJhbSBvblN1cGVyIOaYr+WQpuazqOWGjOeItuexu+aIkOWRmOaWueazleS4iue7keWumueahOS6i+S7tu+8jOm7mOiupHRydWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBldmVudHNPbkxvYWQob25TdXBlcjogYm9vbGVhbiA9IHRydWUpOiAoY29uc3RydWN0b3I6IGFueSkgPT4gdm9pZCB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnN0cnVjdG9yOiBhbnkpIHtcclxuICAgICAgICByZXdyaXRlKGNvbnN0cnVjdG9yLCBcIm9uTG9hZFwiLCBcIm9uRGVzdHJveVwiLCBvblN1cGVyKTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnsbvoo4XppbDlmajjgILnlKjkuo7opobnm5ZvbkVuYWJsZeWSjG9uRGlzYWJsZeaWueazle+8jOWcqG9uRW5hYmxl5Lit5rOo5YaMcHJlbG9hZEV2ZW5057uR5a6a55qE5omA5pyJ5LqL5Lu277yM5Zyob25EaXNhYmxl5rOo6ZSA57uR5a6a55qE5omA5pyJ5LqL5Lu2XHJcbiAqIEBwYXJhbSBvblN1cGVyIOaYr+WQpuazqOWGjOeItuexu+aIkOWRmOaWueazleS4iue7keWumueahOS6i+S7tu+8jOm7mOiupHRydWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBldmVudHNPbkVuYWJsZShvblN1cGVyOiBib29sZWFuID0gdHJ1ZSk6IChjb25zdHJ1Y3RvcjogYW55KSA9PiB2b2lkIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY29uc3RydWN0b3I6IGFueSkge1xyXG4gICAgICAgIHJld3JpdGUoY29uc3RydWN0b3IsIFwib25FbmFibGVcIiwgXCJvbkRpc2FibGVcIiwgb25TdXBlcik7XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICog6Z2e6Z2Z5oCB5oiQ5ZGY5pa55rOV6KOF6aWw5Zmo44CC55So5LqO6aKE5YWI6L295YWl5b6F5rOo5YaM55qE5LqL5Lu277yM6YWN5ZCIZXZlbnRzT25Mb2Fk44CBZXZlbnRzT25FbmFibGXjgIF0YXJnZXRPbuS9v+eUqFxyXG4gKiBAcGFyYW0gZXZlbnQg5LqL5Lu25ZCNXHJcbiAqIEBwYXJhbSBvbmNlIOS6i+S7tuaYr+WQpuWPquS8muinpuWPkeS4gOasoe+8jOm7mOiupGZhbHNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJlbG9hZEV2ZW50KGV2ZW50OiBFdmVudE5hbWUsIG9uY2U6IGJvb2xlYW4gPSBmYWxzZSk6ICh0YXJnZXQ6IGFueSwgZnVuY05hbWU6IHN0cmluZywgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yKSA9PiB2b2lkIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBhbnksIGZ1bmNOYW1lOiBzdHJpbmcsIGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gICAgICAgIGxldCBhcnIgPSBFdmVudHMuY2xhc3NNYXAuZ2V0KHRhcmdldC5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgaWYgKGFyciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFyciA9IFtdO1xyXG4gICAgICAgICAgICBFdmVudHMuY2xhc3NNYXAuc2V0KHRhcmdldC5jb25zdHJ1Y3RvciwgYXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZmluZCA9IGFyci5maW5kKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZS5ldmVudCA9PT0gZXZlbnQgJiYgZS5mdW5jTmFtZSA9PT0gZnVuY05hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZmluZCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoYGV2ZW50OiAke0V2ZW50TmFtZVtldmVudF19IOmHjeWkjei9veWFpWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgZnVuY05hbWU6IGZ1bmNOYW1lLFxyXG4gICAgICAgICAgICBvbmNlOiBvbmNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8qKlxyXG4gKiDkuovku7bmlLblj5HnrqHnkIbnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50cyB7XHJcbiAgICAvKipcclxuICAgICAqIOmihOWKoOi9veaVsOaNru+8jOWtmOWCqOaehOmAoOWHveaVsOOAgeebkeWQrOS6i+S7tuOAgeebkeWQrOWHveaVsOWQje+8jOeUqOS6juWunuS+i+WMluaXtuazqOWGjOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzTWFwOiBNYXA8RnVuY3Rpb24sIFByZWxvYWREYXRhW10+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Y5YKo55uR5ZCs5LqL5Lu244CB55uR5ZCs5Ye95pWw5LiO55uR5ZCs5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9ldmVudHNNYXA6IE1hcDxFdmVudE5hbWUsIE1hcDxPYmplY3QsIExpc3RlbmVyW10+PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOazqOWGjOS4jnRhcmdldOaehOmAoOWHveaVsOmihOWFiOe7keWumueahOaJgOacieS6i+S7tlxyXG4gICAgICogQHBhcmFtIHRhcmdldCDms6jlhoznm67moIdcclxuICAgICAqIEBwYXJhbSBvblN1cGVyIOaYr+WQpuazqOWGjOeItuexu+aIkOWRmOaWueazleS4iue7keWumueahOS6i+S7tu+8jOm7mOiupHRydWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0YXJnZXRPbih0YXJnZXQ6IE9iamVjdCwgb25TdXBlcjogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICBpZiAob25TdXBlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTWFwLmZvckVhY2goKHZhbHVlOiBQcmVsb2FkRGF0YVtdLCBrZXk6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2Yga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZSA9IHZhbHVlW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKGUuZXZlbnQsIHRhcmdldFtlLmZ1bmNOYW1lXSwgdGFyZ2V0LCBlLm9uY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuY2xhc3NNYXAuZ2V0KHRhcmdldC5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgICAgIGlmIChhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGUgPSBhcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbihlLmV2ZW50LCB0YXJnZXRbZS5mdW5jTmFtZV0sIHRhcmdldCwgZS5vbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOazqOWGjOS6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50IOS6i+S7tuWQjVxyXG4gICAgICogQHBhcmFtIGNiIOWkhOeQhuS6i+S7tueahOebkeWQrOWHveaVsFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDms6jlhoznm67moIdcclxuICAgICAqIEBwYXJhbSBvbmNlIOS6i+S7tuaYr+WQpuWPquS8muinpuWPkeS4gOasoe+8jOm7mOiupGZhbHNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb24oZXZlbnQ6IEV2ZW50TmFtZSwgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgdGFyZ2V0OiBPYmplY3QsIG9uY2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghY2IgfHwgIXRhcmdldCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgZXZlbnQ6ICR7RXZlbnROYW1lW2V2ZW50XX0gbGlzdGVuZXLmiJZ0YXJnZXTkuI3og73kuLrnqbpgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1hcDogTWFwPE9iamVjdCwgTGlzdGVuZXJbXT4gPSB0aGlzLl9ldmVudHNNYXAuZ2V0KGV2ZW50KTtcclxuICAgICAgICBsZXQgbGlzdDogTGlzdGVuZXJbXSA9IFtdO1xyXG4gICAgICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBtYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIG1hcC5zZXQodGFyZ2V0LCBsaXN0KTtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzTWFwLnNldChldmVudCwgbWFwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsaXN0ID0gbWFwLmdldCh0YXJnZXQpO1xyXG4gICAgICAgICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0KHRhcmdldCwgbGlzdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbGlzdC5maW5kKChlKSA9PiB7IHJldHVybiBlLmNiID09PSBjYjsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoYGV2ZW50OiAke0V2ZW50TmFtZVtldmVudF19IOmHjeWkjeazqOWGjGApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxpc3RlbmVyOiBMaXN0ZW5lciA9IHtcclxuICAgICAgICAgICAgY2I6IGNiLFxyXG4gICAgICAgICAgICBvbmNlOiBvbmNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsaXN0LnB1c2gobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rOo5YaM5LqL5Lu277yM6Kem5Y+R5LiA5qyh5ZCO6Ieq5Yqo5rOo6ZSAXHJcbiAgICAgKiBAcGFyYW0gZXZlbnQg5LqL5Lu25ZCNXHJcbiAgICAgKiBAcGFyYW0gY2Ig5aSE55CG5LqL5Lu255qE55uR5ZCs5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOazqOWGjOebruagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG9uY2UoZXZlbnQ6IEV2ZW50TmFtZSwgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgdGFyZ2V0OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uKGV2ZW50LCBjYiwgdGFyZ2V0LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOS6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50IOS6i+S7tuWQjVxyXG4gICAgICogQHBhcmFtIGNiIOWkhOeQhuS6i+S7tueahOebkeWQrOWHveaVsFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDms6jlhoznm67moIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvZmYoZXZlbnQ6IEV2ZW50TmFtZSwgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgdGFyZ2V0OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWNiIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYGV2ZW50OiAke0V2ZW50TmFtZVtldmVudF19IGxpc3RlbmVy5oiWdGFyZ2V05LiN6IO95Li656m6YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXA6IE1hcDxPYmplY3QsIExpc3RlbmVyW10+ID0gdGhpcy5fZXZlbnRzTWFwLmdldChldmVudCk7XHJcbiAgICAgICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGBldmVudDogJHtFdmVudE5hbWVbZXZlbnRdfSDmnKrms6jlhozor6Xkuovku7ZgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxpc3Q6IExpc3RlbmVyW10gPSBtYXAuZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgZXZlbnQ6ICR7RXZlbnROYW1lW2V2ZW50XX0gdGFyZ2V05LiK5pyq5rOo5YaM6K+l5LqL5Lu2YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IGxpc3QuZmluZEluZGV4KChlKSA9PiB7IHJldHVybiBlLmNiID09PSBjYjsgfSk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgZXZlbnQ6ICR7RXZlbnROYW1lW2V2ZW50XX0gdGFyZ2V05LiK5pyq5Lul6K+lbGlzdGVuZXLms6jlhozor6Xkuovku7ZgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIG1hcC5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICAgICAgbWFwLnNpemUgPD0gMCAmJiB0aGlzLl9ldmVudHNNYXAuZGVsZXRlKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaR0YXJnZXTkuIrms6jlhoznmoTmiYDmnInkuovku7ZcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5rOo5YaM55uu5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdGFyZ2V0T2ZmKHRhcmdldDogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYGV2ZW50OiAke3RhcmdldH0gdGFyZ2V05LiN6IO95Li656m6YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2V2ZW50c01hcC5mb3JFYWNoKChtYXAsIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIG1hcC5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICAgICAgbWFwLnNpemUgPD0gMCAmJiB0aGlzLl9ldmVudHNNYXAuZGVsZXRlKGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50IOS6i+S7tuWQjVxyXG4gICAgICogQHBhcmFtIGFyZ3Mg5LqL5Lu25Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZW1pdChldmVudDogRXZlbnROYW1lLCAuLi5hcmdzOiB1bmtub3duW10pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbWFwOiBNYXA8T2JqZWN0LCBMaXN0ZW5lcltdPiA9IHRoaXMuX2V2ZW50c01hcC5nZXQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYy53YXJuKGBldmVudDogJHtFdmVudE5hbWVbZXZlbnRdfSDmnKrms6jlhozor6Xkuovku7ZgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICBsZXQgY2FsbEFycjogQXJyYXk8eyBjYjogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZDsgdGFyZ2V0OiBPYmplY3QgfT4gPSBbXTtcclxuICAgICAgICBsZXQgb25jZUFycjogQXJyYXk8eyBjYjogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZDsgdGFyZ2V0OiBPYmplY3QgfT4gPSBbXTtcclxuICAgICAgICBtYXAuZm9yRWFjaCgobGlzdCwgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbEFyci5wdXNoKHsgY2I6IGxpc3RlbmVyLmNiLCB0YXJnZXQ6IHRhcmdldCB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jZUFyci5wdXNoKHsgY2I6IGxpc3RlbmVyLmNiLCB0YXJnZXQ6IHRhcmdldCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOenu+mZpOaJgOaciW9uY2XnmoTnm5HlkKxcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb25jZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZSA9IG9uY2VBcnJbaV07XHJcbiAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50LCBlLmNiLCBlLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOW7tui/n+WIsOatpOWkhOiwg+eUqOS6i+S7tuWbnuiwg++8jOmYsuatouWPl+WIsOWbnuiwg+i/h+eoi+S4reeahCDms6jlhowv5rOo6ZSAIOW9seWTjVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlID0gY2FsbEFycltpXTtcclxuICAgICAgICAgICAgZS5jYi5hcHBseShlLnRhcmdldCwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rS+5Y+R5LqL5Lu2LS3lvILmraVcclxuICAgICAqIEBwYXJhbSBldmVudCDkuovku7blkI1cclxuICAgICAqIEBwYXJhbSBhcmdzIOS6i+S7tuWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGVtaXRBc3luYyhldmVudDogRXZlbnROYW1lLCAuLi5hcmdzOiB1bmtub3duW10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgbWFwOiBNYXA8T2JqZWN0LCBMaXN0ZW5lcltdPiA9IHRoaXMuX2V2ZW50c01hcC5nZXQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYy53YXJuKGBldmVudDogJHtFdmVudE5hbWVbZXZlbnRdfSDmnKrms6jlhozor6Xkuovku7ZgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICBsZXQgY2FsbEFycjogQXJyYXk8eyBjYjogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZDsgdGFyZ2V0OiBPYmplY3QgfT4gPSBbXTtcclxuICAgICAgICBsZXQgb25jZUFycjogQXJyYXk8eyBjYjogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZDsgdGFyZ2V0OiBPYmplY3QgfT4gPSBbXTtcclxuICAgICAgICBtYXAuZm9yRWFjaCgobGlzdCwgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbEFyci5wdXNoKHsgY2I6IGxpc3RlbmVyLmNiLCB0YXJnZXQ6IHRhcmdldCB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jZUFyci5wdXNoKHsgY2I6IGxpc3RlbmVyLmNiLCB0YXJnZXQ6IHRhcmdldCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOenu+mZpOaJgOaciW9uY2XnmoTnm5HlkKxcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb25jZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZSA9IG9uY2VBcnJbaV07XHJcbiAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50LCBlLmNiLCBlLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOW7tui/n+WIsOatpOWkhOiwg+eUqOS6i+S7tuWbnuiwg++8jOmYsuatouWPl+WIsOWbnuiwg+i/h+eoi+S4reeahCDms6jlhowv5rOo6ZSAIOW9seWTjVxyXG4gICAgICAgIGxldCBhcnI6IFByb21pc2U8dW5rbm93bj5bXSA9IFtdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlID0gY2FsbEFycltpXTtcclxuICAgICAgICAgICAgYXJyLnB1c2goZS5jYi5hcHBseShlLnRhcmdldCwgYXJncykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChhcnIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==