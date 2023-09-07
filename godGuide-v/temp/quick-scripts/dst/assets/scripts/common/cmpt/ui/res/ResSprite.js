
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/res/ResSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1e608kcfHNDl6sxF57wMNFE', 'ResSprite');
// scripts/common/cmpt/ui/res/ResSprite.ts

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
 * 精灵组件，自动管理资源的引用计数
 */
var ResSprite = /** @class */ (function (_super) {
    __extends(ResSprite, _super);
    function ResSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 动态加载的资源
        _this._asset = null;
        _this._url = "";
        _this._atlasKey = "";
        _this._sprite = null;
        return _this;
    }
    Object.defineProperty(ResSprite.prototype, "sprite", {
        get: function () {
            if (!this._sprite) {
                this._sprite = this.getComponent(cc.Sprite);
            }
            return this._sprite;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResSprite.prototype, "spriteFrame", {
        get: function () {
            return this.sprite.spriteFrame;
        },
        set: function (v) {
            var _a;
            if (!this.isValid || this.sprite.spriteFrame === v) {
                return;
            }
            v === null || v === void 0 ? void 0 : v.addRef();
            (_a = this._asset) === null || _a === void 0 ? void 0 : _a.decRef();
            this._asset = v;
            this.sprite.spriteFrame = v;
        },
        enumerable: false,
        configurable: true
    });
    ResSprite.prototype.onDestroy = function () {
        var _a;
        (_a = this._asset) === null || _a === void 0 ? void 0 : _a.decRef();
    };
    /**
     * 加载并设置spriteFrame
     * @param url 图片或图集路径，规则同Res加载路径
     * @param key 如果需要加载的url为图集时，需传入图集的key
     */
    ResSprite.prototype.setSpriteFrame = function (url, key) {
        if (key === void 0) { key = ""; }
        return __awaiter(this, void 0, Promise, function () {
            var type, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._url = url;
                        this._atlasKey = key;
                        type = key ? cc.SpriteAtlas : cc.SpriteFrame;
                        _a = Res_1.default.get(url, type);
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, Res_1.default.load(url, type)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        result = _a;
                        // 如短时间内多次调用，需保证显示最新一次加载的资源
                        if (result instanceof type && this._url === url && this._atlasKey === key) {
                            this.spriteFrame = result instanceof cc.SpriteAtlas ? result.getSpriteFrame(key) : result;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ResSprite = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(cc.Sprite),
        menu("Framework/UI组件/ResSprite")
    ], ResSprite);
    return ResSprite;
}(cc.Component));
exports.default = ResSprite;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxccmVzXFxSZXNTcHJpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBRTlCLElBQUEsS0FBd0QsRUFBRSxDQUFDLFVBQVUsRUFBbkUsT0FBTyxhQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsZ0JBQWdCLHNCQUFrQixDQUFDO0FBRTVFOztHQUVHO0FBS0g7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUErQ0M7UUE5Q0csVUFBVTtRQUNGLFlBQU0sR0FBb0MsSUFBSSxDQUFDO1FBRS9DLFVBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsZUFBUyxHQUFXLEVBQUUsQ0FBQztRQUV2QixhQUFPLEdBQWMsSUFBSSxDQUFDOztJQXdDdEMsQ0FBQztJQXZDRyxzQkFBWSw2QkFBTTthQUFsQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0M7WUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBVzthQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDbkMsQ0FBQzthQUNELFVBQXVCLENBQWlCOztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hELE9BQU87YUFDVjtZQUNELENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxNQUFNLEdBQUc7WUFDWixNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sR0FBRztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7O09BVEE7SUFXUyw2QkFBUyxHQUFuQjs7UUFDSSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sR0FBRztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLGtDQUFjLEdBQTNCLFVBQTRCLEdBQVcsRUFBRSxHQUFnQjtRQUFoQixvQkFBQSxFQUFBLFFBQWdCO3VDQUFHLE9BQU87Ozs7O3dCQUMvRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzt3QkFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7d0JBQ2pCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ3BDLEtBQUEsYUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0NBQWxCLHdCQUFrQjt3QkFBSSxxQkFBTSxhQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBQTs7OEJBQXpCLFNBQXlCOzs7d0JBQXhELE1BQU0sS0FBa0Q7d0JBQzVELDJCQUEyQjt3QkFDM0IsSUFBSSxNQUFNLFlBQVksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssR0FBRyxFQUFFOzRCQUN2RSxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7eUJBQzdGOzs7OztLQUNKO0lBOUNnQixTQUFTO1FBSjdCLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLENBQUM7T0FDWixTQUFTLENBK0M3QjtJQUFELGdCQUFDO0NBL0NELEFBK0NDLENBL0NzQyxFQUFFLENBQUMsU0FBUyxHQStDbEQ7a0JBL0NvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlcyBmcm9tIFwiLi4vLi4vLi4vdXRpbC9SZXNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgbWVudSwgZGlzYWxsb3dNdWx0aXBsZSwgcmVxdWlyZUNvbXBvbmVudCB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDnsr7ngbXnu4Tku7bvvIzoh6rliqjnrqHnkIbotYTmupDnmoTlvJXnlKjorqHmlbBcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkByZXF1aXJlQ29tcG9uZW50KGNjLlNwcml0ZSlcclxuQG1lbnUoXCJGcmFtZXdvcmsvVUnnu4Tku7YvUmVzU3ByaXRlXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc1Nwcml0ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvLyDliqjmgIHliqDovb3nmoTotYTmupBcclxuICAgIHByaXZhdGUgX2Fzc2V0OiBjYy5TcHJpdGVGcmFtZSB8IGNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF91cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9hdGxhc0tleTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwcml2YXRlIF9zcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGdldCBzcHJpdGUoKTogY2MuU3ByaXRlIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Nwcml0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ByaXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3ByaXRlRnJhbWUoKTogY2MuU3ByaXRlRnJhbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc3ByaXRlRnJhbWUodjogY2MuU3ByaXRlRnJhbWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCB8fCB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9PT0gdikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHY/LmFkZFJlZigpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0Py5kZWNSZWYoKTtcclxuICAgICAgICB0aGlzLl9hc3NldCA9IHY7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYXNzZXQ/LmRlY1JlZigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295bm26K6+572uc3ByaXRlRnJhbWVcclxuICAgICAqIEBwYXJhbSB1cmwg5Zu+54mH5oiW5Zu+6ZuG6Lev5b6E77yM6KeE5YiZ5ZCMUmVz5Yqg6L296Lev5b6EXHJcbiAgICAgKiBAcGFyYW0ga2V5IOWmguaenOmcgOimgeWKoOi9veeahHVybOS4uuWbvumbhuaXtu+8jOmcgOS8oOWFpeWbvumbhueahGtleVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0U3ByaXRlRnJhbWUodXJsOiBzdHJpbmcsIGtleTogc3RyaW5nID0gXCJcIik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcclxuICAgICAgICB0aGlzLl9hdGxhc0tleSA9IGtleTtcclxuICAgICAgICBsZXQgdHlwZSA9IGtleSA/IGNjLlNwcml0ZUF0bGFzIDogY2MuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFJlcy5nZXQodXJsLCB0eXBlKSB8fCBhd2FpdCBSZXMubG9hZCh1cmwsIHR5cGUpO1xyXG4gICAgICAgIC8vIOWmguefreaXtumXtOWGheWkmuasoeiwg+eUqO+8jOmcgOS/neivgeaYvuekuuacgOaWsOS4gOasoeWKoOi9veeahOi1hOa6kFxyXG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiB0eXBlICYmIHRoaXMuX3VybCA9PT0gdXJsICYmIHRoaXMuX2F0bGFzS2V5ID09PSBrZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZSA9IHJlc3VsdCBpbnN0YW5jZW9mIGNjLlNwcml0ZUF0bGFzID8gcmVzdWx0LmdldFNwcml0ZUZyYW1lKGtleSkgOiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==