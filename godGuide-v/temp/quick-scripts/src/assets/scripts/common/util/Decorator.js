"use strict";
cc._RF.push(module, '194e1Q1HWRNm4uMrCVIQinW', 'Decorator');
// scripts/common/util/Decorator.ts

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
var Tool_1 = require("./Tool");
/**
 * 工具装饰器
 */
var Decorator = /** @class */ (function () {
    function Decorator() {
    }
    //#region 方法装饰器
    /**
     * 异步方法装饰器，多次调用时会按队列顺序依次执行
     * - 对于非静态成员，每一个对象实例都存在一个独立的队列
     * - 对于静态成员，仅存在一个队列
     */
    Decorator.queue = function (target, funcName, desc) {
        var old = desc.value;
        var queueMap = new Map();
        var queueRun = function () {
            return __awaiter(this, void 0, Promise, function () {
                var queue, data, resolve, reject, args, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queue = queueMap.get(this);
                            if (queue === undefined) {
                                cc.error("[Decorator.queue] error: queue is undefined");
                                return [2 /*return*/];
                            }
                            if (queue.length === 0) {
                                queueMap.delete(this);
                                return [2 /*return*/];
                            }
                            data = queue[0];
                            resolve = data[0];
                            reject = data[1];
                            args = data[2];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, old.apply(this, args)];
                        case 2:
                            result = _a.sent();
                            resolve(result);
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            reject(error_1);
                            return [3 /*break*/, 5];
                        case 4:
                            queue.shift();
                            queueRun.apply(this);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        desc.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                var queue = queueMap.get(_this);
                if (queue === undefined) {
                    queue = [];
                    queueMap.set(_this, queue);
                }
                queue.push([resolve, reject, args]);
                if (queue.length === 1) {
                    queueRun.apply(_this);
                }
            });
        };
    };
    /**
     * 方法装饰器，方法开始执行至执行完毕后锁定一段时间，期间忽略所有对该方法的调用
     * - 忽略调用时不会有返回值
     * @param seconds 锁定的秒数
     */
    Decorator.lock = function (seconds) {
        if (seconds === void 0) { seconds = 0; }
        return function (target, funcName, desc) {
            var old = desc.value;
            var callingSet = new Set();
            desc.value = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (callingSet.has(this)) {
                    return;
                }
                callingSet.add(this);
                var result = old.apply(this, args);
                if (result instanceof Promise) {
                    return new Promise(function (resolve, reject) {
                        result.then(function (value) {
                            Tool_1.default.wait(Math.max(seconds, 0)).then(function () { callingSet.delete(_this); });
                            resolve(value);
                        }, function (reason) {
                            Tool_1.default.wait(Math.max(seconds, 0)).then(function () { callingSet.delete(_this); });
                            reject(reason);
                        });
                    });
                }
                else {
                    Tool_1.default.wait(Math.max(seconds, 0)).then(function () { callingSet.delete(_this); });
                    return result;
                }
            };
        };
    };
    return Decorator;
}());
exports.default = Decorator;

cc._RF.pop();