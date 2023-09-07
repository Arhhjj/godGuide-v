
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/Decorator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxEZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBMEI7QUFTMUI7O0dBRUc7QUFDSDtJQUFBO0lBb0ZBLENBQUM7SUFuRkcsZUFBZTtJQUVmOzs7O09BSUc7SUFDVyxlQUFLLEdBQW5CLFVBQW9CLE1BQWUsRUFBRSxRQUFnQixFQUFFLElBQW1CO1FBQ3RFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDckIsSUFBSSxRQUFRLEdBQThCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDcEQsSUFBSSxRQUFRLEdBQUc7MkNBQW1CLE9BQU87Ozs7OzRCQUNqQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDL0IsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dDQUNyQixFQUFFLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0NBQ3hELHNCQUFPOzZCQUNWOzRCQUNELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0NBQ3BCLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3RCLHNCQUFPOzZCQUNWOzRCQUNHLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hCLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xCLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7NEJBRUYscUJBQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUE7OzRCQUFwQyxNQUFNLEdBQUcsU0FBMkI7NEJBQ3hDLE9BQU8sQ0FB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Q0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6RSxPQUFPLE1BQU0sQ0FBQztpQkFDakI7WUFDTCxDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7SUFDTixDQUFDO0lBR0wsZ0JBQUM7QUFBRCxDQXBGQSxBQW9GQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvb2wgZnJvbSBcIi4vVG9vbFwiO1xyXG5cclxudHlwZSBBc3luY0RhdGEgPSBbKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkLCAocmVhc29uPzogdW5rbm93bikgPT4gdm9pZCwgdW5rbm93bltdXTtcclxuXHJcbi8qKiDlvILmraXmiJDlkZjmlrnms5UgKi9cclxuaW50ZXJmYWNlIEFzeW5jUHJvcGVydHkgZXh0ZW5kcyBQcm9wZXJ0eURlc2NyaXB0b3Ige1xyXG4gICAgdmFsdWU/OiAoLi4uYXJnczogdW5rbm93bltdKSA9PiBQcm9taXNlPHVua25vd24+O1xyXG59XHJcblxyXG4vKipcclxuICog5bel5YW36KOF6aWw5ZmoXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNvcmF0b3Ige1xyXG4gICAgLy8jcmVnaW9uIOaWueazleijhemlsOWZqFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byC5q2l5pa55rOV6KOF6aWw5Zmo77yM5aSa5qyh6LCD55So5pe25Lya5oyJ6Zif5YiX6aG65bqP5L6d5qyh5omn6KGMXHJcbiAgICAgKiAtIOWvueS6jumdnumdmeaAgeaIkOWRmO+8jOavj+S4gOS4quWvueixoeWunuS+i+mDveWtmOWcqOS4gOS4queLrOeri+eahOmYn+WIl1xyXG4gICAgICogLSDlr7nkuo7pnZnmgIHmiJDlkZjvvIzku4XlrZjlnKjkuIDkuKrpmJ/liJdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBxdWV1ZSh0YXJnZXQ6IHVua25vd24sIGZ1bmNOYW1lOiBzdHJpbmcsIGRlc2M6IEFzeW5jUHJvcGVydHkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgb2xkID0gZGVzYy52YWx1ZTtcclxuICAgICAgICBsZXQgcXVldWVNYXA6IE1hcDx1bmtub3duLCBBc3luY0RhdGFbXT4gPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgbGV0IHF1ZXVlUnVuID0gYXN5bmMgZnVuY3Rpb24gKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBsZXQgcXVldWUgPSBxdWV1ZU1hcC5nZXQodGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihgW0RlY29yYXRvci5xdWV1ZV0gZXJyb3I6IHF1ZXVlIGlzIHVuZGVmaW5lZGApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlTWFwLmRlbGV0ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHF1ZXVlWzBdO1xyXG4gICAgICAgICAgICBsZXQgcmVzb2x2ZSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIGxldCByZWplY3QgPSBkYXRhWzFdO1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IGRhdGFbMl07XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgb2xkLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBxdWV1ZVJ1bi5hcHBseSh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVzYy52YWx1ZSA9IGZ1bmN0aW9uICguLi5hcmdzOiB1bmtub3duW10pOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBxdWV1ZSA9IHF1ZXVlTWFwLmdldCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBxdWV1ZU1hcC5zZXQodGhpcywgcXVldWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaChbcmVzb2x2ZSwgcmVqZWN0LCBhcmdzXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWVSdW4uYXBwbHkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlrnms5Xoo4XppbDlmajvvIzmlrnms5XlvIDlp4vmiafooYzoh7PmiafooYzlrozmr5XlkI7plIHlrprkuIDmrrXml7bpl7TvvIzmnJ/pl7Tlv73nlaXmiYDmnInlr7nor6Xmlrnms5XnmoTosIPnlKhcclxuICAgICAqIC0g5b+955Wl6LCD55So5pe25LiN5Lya5pyJ6L+U5Zue5YC8XHJcbiAgICAgKiBAcGFyYW0gc2Vjb25kcyDplIHlrprnmoTnp5LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2NrKHNlY29uZHM6IG51bWJlciA9IDApOiAodGFyZ2V0OiB1bmtub3duLCBmdW5jTmFtZTogc3RyaW5nLCBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiB1bmtub3duLCBmdW5jTmFtZTogc3RyaW5nLCBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IG9sZCA9IGRlc2MudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBjYWxsaW5nU2V0OiBTZXQ8dW5rbm93bj4gPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgICAgIGRlc2MudmFsdWUgPSBmdW5jdGlvbiAoLi4uYXJnczogdW5rbm93bltdKTogdW5rbm93biB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGluZ1NldC5oYXModGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsaW5nU2V0LmFkZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBvbGQuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKCh2YWx1ZTogdW5rbm93bikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9vbC53YWl0KE1hdGgubWF4KHNlY29uZHMsIDApKS50aGVuKCgpID0+IHsgY2FsbGluZ1NldC5kZWxldGUodGhpcyk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChyZWFzb246IHVua25vd24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvb2wud2FpdChNYXRoLm1heChzZWNvbmRzLCAwKSkudGhlbigoKSA9PiB7IGNhbGxpbmdTZXQuZGVsZXRlKHRoaXMpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbC53YWl0KE1hdGgubWF4KHNlY29uZHMsIDApKS50aGVuKCgpID0+IHsgY2FsbGluZ1NldC5kZWxldGUodGhpcyk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxufVxyXG4iXX0=