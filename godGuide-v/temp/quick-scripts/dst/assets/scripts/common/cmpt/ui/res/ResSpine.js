
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/res/ResSpine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '14fadlt4gBHJ47mZbSl1iSm', 'ResSpine');
// scripts/common/cmpt/ui/res/ResSpine.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var Res_1 = require("../../../util/Res");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, disallowMultiple = _a.disallowMultiple, requireComponent = _a.requireComponent;
/**
 * spine组件，自动管理资源的引用计数
 */
var ResSpine = /** @class */ (function (_super) {
    __extends(ResSpine, _super);
    function ResSpine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 动态加载的资源
        _this._asset = null;
        _this._url = "";
        _this._spine = null;
        return _this;
    }
    Object.defineProperty(ResSpine.prototype, "spine", {
        get: function () {
            if (!this._spine) {
                this._spine = this.getComponent(sp.Skeleton);
            }
            return this._spine;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResSpine.prototype, "skeletonData", {
        get: function () {
            return this.spine.skeletonData;
        },
        set: function (v) {
            var _a;
            if (!this.isValid || this.spine.skeletonData === v) {
                return;
            }
            v === null || v === void 0 ? void 0 : v.addRef();
            (_a = this._asset) === null || _a === void 0 ? void 0 : _a.decRef();
            this._asset = v;
            this.spine.skeletonData = v;
        },
        enumerable: false,
        configurable: true
    });
    ResSpine.prototype.onDestroy = function () {
        var _a;
        (_a = this._asset) === null || _a === void 0 ? void 0 : _a.decRef();
    };
    /**
     * 设置skeletonData
     * @param url 骨骼资源路径，规则同Res加载路径
     */
    ResSpine.prototype.setSkeletonData = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._url = url;
                        _a = Res_1.default.get(url, sp.SkeletonData);
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, Res_1.default.load(url, sp.SkeletonData)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        result = _a;
                        // 如短时间内多次调用，需保证显示最新一次加载的资源
                        if (result instanceof sp.SkeletonData && this._url === url) {
                            this.skeletonData = result;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ResSpine = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(sp.Skeleton),
        menu("Framework/UI组件/ResSpine")
    ], ResSpine);
    return ResSpine;
}(cc.Component));
exports.default = ResSpine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxccmVzXFxSZXNTcGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFFOUIsSUFBQSxLQUF3RCxFQUFFLENBQUMsVUFBVSxFQUFuRSxPQUFPLGFBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFFNUU7O0dBRUc7QUFLSDtJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQTJDQztRQTFDRyxVQUFVO1FBQ0YsWUFBTSxHQUFvQixJQUFJLENBQUM7UUFFL0IsVUFBSSxHQUFXLEVBQUUsQ0FBQztRQUVsQixZQUFNLEdBQWdCLElBQUksQ0FBQzs7SUFxQ3ZDLENBQUM7SUFwQ0csc0JBQVksMkJBQUs7YUFBakI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsa0NBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ25DLENBQUM7YUFDRCxVQUF3QixDQUFrQjs7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUNoRCxPQUFPO2FBQ1Y7WUFDRCxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsTUFBTSxHQUFHO1lBQ1osTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxNQUFNLEdBQUc7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7OztPQVRBO0lBV1MsNEJBQVMsR0FBbkI7O1FBQ0ksTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxNQUFNLEdBQUc7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNVLGtDQUFlLEdBQTVCLFVBQTZCLEdBQVc7dUNBQUcsT0FBTzs7Ozs7d0JBQzlDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNILEtBQUEsYUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFBO2dDQUE3Qix3QkFBNkI7d0JBQUkscUJBQU0sYUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFBOzs4QkFBcEMsU0FBb0M7Ozt3QkFBOUUsTUFBTSxLQUF3RTt3QkFDbEYsMkJBQTJCO3dCQUMzQixJQUFJLE1BQU0sWUFBWSxFQUFFLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFOzRCQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQzt5QkFDOUI7Ozs7O0tBQ0o7SUExQ2dCLFFBQVE7UUFKNUIsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztPQUNYLFFBQVEsQ0EyQzVCO0lBQUQsZUFBQztDQTNDRCxBQTJDQyxDQTNDcUMsRUFBRSxDQUFDLFNBQVMsR0EyQ2pEO2tCQTNDb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXMgZnJvbSBcIi4uLy4uLy4uL3V0aWwvUmVzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIG1lbnUsIGRpc2FsbG93TXVsdGlwbGUsIHJlcXVpcmVDb21wb25lbnQgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogc3BpbmXnu4Tku7bvvIzoh6rliqjnrqHnkIbotYTmupDnmoTlvJXnlKjorqHmlbBcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkByZXF1aXJlQ29tcG9uZW50KHNwLlNrZWxldG9uKVxyXG5AbWVudShcIkZyYW1ld29yay9VSee7hOS7ti9SZXNTcGluZVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNTcGluZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvLyDliqjmgIHliqDovb3nmoTotYTmupBcclxuICAgIHByaXZhdGUgX2Fzc2V0OiBzcC5Ta2VsZXRvbkRhdGEgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3VybDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwcml2YXRlIF9zcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBnZXQgc3BpbmUoKTogc3AuU2tlbGV0b24ge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3BpbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUgPSB0aGlzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGluZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNrZWxldG9uRGF0YSgpOiBzcC5Ta2VsZXRvbkRhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwaW5lLnNrZWxldG9uRGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc2tlbGV0b25EYXRhKHY6IHNwLlNrZWxldG9uRGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkIHx8IHRoaXMuc3BpbmUuc2tlbGV0b25EYXRhID09PSB2KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdj8uYWRkUmVmKCk7XHJcbiAgICAgICAgdGhpcy5fYXNzZXQ/LmRlY1JlZigpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0ID0gdjtcclxuICAgICAgICB0aGlzLnNwaW5lLnNrZWxldG9uRGF0YSA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hc3NldD8uZGVjUmVmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5za2VsZXRvbkRhdGFcclxuICAgICAqIEBwYXJhbSB1cmwg6aqo6aq86LWE5rqQ6Lev5b6E77yM6KeE5YiZ5ZCMUmVz5Yqg6L296Lev5b6EXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBzZXRTa2VsZXRvbkRhdGEodXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFJlcy5nZXQodXJsLCBzcC5Ta2VsZXRvbkRhdGEpIHx8IGF3YWl0IFJlcy5sb2FkKHVybCwgc3AuU2tlbGV0b25EYXRhKTtcclxuICAgICAgICAvLyDlpoLnn63ml7bpl7TlhoXlpJrmrKHosIPnlKjvvIzpnIDkv53or4HmmL7npLrmnIDmlrDkuIDmrKHliqDovb3nmoTotYTmupBcclxuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2Ygc3AuU2tlbGV0b25EYXRhICYmIHRoaXMuX3VybCA9PT0gdXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tlbGV0b25EYXRhID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=