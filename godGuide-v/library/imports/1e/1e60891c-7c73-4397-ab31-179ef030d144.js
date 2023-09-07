"use strict";
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