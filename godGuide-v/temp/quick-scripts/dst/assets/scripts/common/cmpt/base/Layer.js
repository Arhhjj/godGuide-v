
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/base/Layer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a6e48AvPltFQqwiI4zAsMqx', 'Layer');
// scripts/common/cmpt/base/Layer.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Url_1 = require("../../const/Url");
var Res_1 = require("../../util/Res");
var Tool_1 = require("../../util/Tool");
var DialogBase_1 = require("./DialogBase");
var Tip_1 = require("./Tip");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/**
 * 全局弹窗管理器
 */
var Layer = /** @class */ (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mainLayer = null;
        _this.dialogLayer = null;
        _this.loadingLayer = null;
        _this.tipLayer = null;
        /** 打开Loading层计数，为0时关闭，防止某些情况同时触发打开关闭Loading */
        _this._loadingCount = 0;
        /** tip节点池 */
        _this._tipPool = [];
        /** 当前存在的tip文字数组 */
        _this._tipTexts = [];
        return _this;
    }
    Layer_1 = Layer;
    Layer.prototype.resetInEditor = function () {
        var _this = this;
        if (!CC_EDITOR) {
            return;
        }
        var checkNode = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i] = arguments[_i];
            }
            names.forEach(function (name) {
                if (!_this.node.getChildByName(name)) {
                    var node = new cc.Node(name);
                    _this.node.addChild(node);
                    var widget = node.addComponent(cc.Widget);
                    widget.top = 0;
                    widget.isAlignTop = true;
                    widget.bottom = 0;
                    widget.isAlignBottom = true;
                    widget.left = 0;
                    widget.isAlignLeft = true;
                    widget.right = 0;
                    widget.isAlignRight = true;
                    if (name === "LoadingLayer") {
                        node.addComponent(cc.BlockInputEvents);
                    }
                }
            });
        };
        checkNode("MainLayer", "DialogLayer", "LoadingLayer", "TipLayer");
        this.mainLayer = this.node.getChildByName("MainLayer");
        this.dialogLayer = this.node.getChildByName("DialogLayer");
        this.loadingLayer = this.node.getChildByName("LoadingLayer");
        this.tipLayer = this.node.getChildByName("TipLayer");
    };
    Layer.prototype.onLoad = function () {
        Layer_1.inst = this;
        this.hideLoading();
    };
    Layer.prototype.onDestroy = function () {
        Layer_1.inst = null;
    };
    /**
     * 获取文件名（截取url最后一个斜杠后的内容）
     */
    Layer.prototype.getNameByUrl = function (url) {
        return url.substring(url.lastIndexOf("/") + 1, url.length);
    };
    /**
     * 进入新场景
     * @async
     * @param sceneName 场景名
     */
    Layer.prototype.enterScene = function (sceneName) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.showLoading();
                cc.director.preloadScene(sceneName, function (err) {
                    if (err) {
                        cc.error("[Layer.enterScene] failed to preload scene: " + sceneName);
                        return;
                    }
                    _this.hideLoading();
                    cc.director.loadScene(sceneName);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 进入常驻界面，并清空dialog与tip（不同于dialog，常驻界面始终显示在最底层，且同时只会存在一个）
     */
    Layer.prototype.enterMain = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var prefab, _a, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showLoading();
                        _a = Res_1.default.get(url, cc.Prefab);
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, Res_1.default.load(url, cc.Prefab)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        prefab = _a;
                        this.hideLoading();
                        if (!prefab) {
                            cc.error("[Layer.enterMain] can not find prefab: " + url);
                            return [2 /*return*/, null];
                        }
                        this.mainLayer.destroyAllChildren();
                        this.closeDialogs();
                        this.clearTips();
                        node = Res_1.default.instantiate(prefab);
                        node.setPosition(0, 0);
                        this.mainLayer.addChild(node);
                        return [2 /*return*/, node];
                }
            });
        });
    };
    /**
     * 获取弹窗组件（返回遍历到的第一个）
     * @param url prefab路径，规则同Res加载路径
     */
    Layer.prototype.getDialog = function (url) {
        for (var i = 0; i < this.dialogLayer.childrenCount; i++) {
            var node = this.dialogLayer.children[i];
            var cmpt = node.getComponent(DialogBase_1.default);
            if (!cmpt) {
                continue;
            }
            if (cmpt.prefabUrl === url) {
                return cmpt;
            }
        }
        return null;
    };
    /**
     * （同步方法，需确保事先已加载预制资源）打开弹窗
     * @param url prefab路径，规则同Res加载路径
     * @param args DialogBase.open调用参数
     */
    Layer.prototype.openDialog = function (url) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var prefab = Res_1.default.get(url, cc.Prefab);
        if (!prefab) {
            cc.error("[Layer.openDialog] can not find dialog prefab: " + url);
            return;
        }
        var node = Res_1.default.instantiate(prefab);
        this.dialogLayer.addChild(node);
        node.setPosition(0, 0);
        var cmpt = node.getComponent(DialogBase_1.default);
        if (cmpt) {
            //@ts-ignore
            cmpt._prefabUrl = url;
            cmpt.playOpen();
            cmpt.onOpen.apply(cmpt, args);
        }
    };
    /**
     * （同步方法，需确保事先已加载预制资源）打开唯一弹窗--同一弹窗节点只能同时存在一个
     * @param url prefab路径，规则同Res加载路径
     * @param args DialogBase.open调用参数
     */
    Layer.prototype.openUniDialog = function (url) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.getDialog(url)) {
            return;
        }
        this.openDialog.apply(this, __spreadArrays([url], args));
    };
    /**
     * 打开弹窗
     * @async
     * @param url prefab路径，规则同Res加载路径
     * @param args DialogBase.open调用参数
     */
    Layer.prototype.openDialogAsync = function (url) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var prefab, node, cmpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showLoading();
                        return [4 /*yield*/, Res_1.default.load(url, cc.Prefab)];
                    case 1:
                        prefab = _a.sent();
                        this.hideLoading();
                        if (!prefab) {
                            cc.error("[Layer.openDialogAsync] can not find dialog prefab: " + url);
                            return [2 /*return*/];
                        }
                        node = Res_1.default.instantiate(prefab);
                        this.dialogLayer.addChild(node);
                        node.setPosition(0, 0);
                        cmpt = node.getComponent(DialogBase_1.default);
                        if (cmpt) {
                            //@ts-ignore
                            cmpt._prefabUrl = url;
                            cmpt.playOpen();
                            cmpt.onOpen.apply(cmpt, args);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 打开唯一弹窗--同一弹窗节点只能同时存在一个
     * @async
     * @param url prefab路径，规则同Res加载路径
     * @param args DialogBase.open调用参数
     */
    Layer.prototype.openUniDialogAsync = function (url) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.getDialog(url)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.openDialogAsync.apply(this, __spreadArrays([url], args))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 关闭遍历到的第一个弹窗
     * @param url prefab路径，规则同Res加载路径
     * @param play true：调用playClose播放弹窗关闭动画；false：直接调用close关闭弹窗
     */
    Layer.prototype.closeDialog = function (url, play) {
        if (play === void 0) { play = false; }
        var cmpt = this.getDialog(url);
        if (!cmpt) {
            return;
        }
        play ? cmpt.playClose() : cmpt.close();
    };
    /**
     * 关闭所有同路径弹窗，不传参则关闭所有弹窗
     * @param url prefab路径，规则同Res加载路径
     * @param play true：调用playClose播放弹窗关闭动画；false：直接调用close关闭弹窗
     */
    Layer.prototype.closeDialogs = function (url, play) {
        if (url === void 0) { url = ""; }
        if (play === void 0) { play = false; }
        for (var i = this.dialogLayer.childrenCount - 1; i >= 0; i--) {
            var node = this.dialogLayer.children[i];
            var cmpt = node.getComponent(DialogBase_1.default);
            if (!cmpt) {
                continue;
            }
            if (!url || cmpt.prefabUrl === url) {
                play ? cmpt.playClose() : cmpt.close();
            }
        }
    };
    /**
     * 异步等待弹窗关闭（只等待遍历到的第一个）
     * @param url prefab路径，规则同Res加载路径
     */
    Layer.prototype.waitCloseDialog = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var cmpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmpt = this.getDialog(url);
                        if (!cmpt) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                cmpt.addResolve(resolve);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 异步等待所有同路径弹窗关闭
     * @param url prefab路径，规则同Res加载路径
     */
    Layer.prototype.waitCloseDialogs = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var arr, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [];
                        _loop_1 = function (i) {
                            var node = this_1.dialogLayer.children[i];
                            var cmpt = node.getComponent(DialogBase_1.default);
                            if (!cmpt) {
                                return "continue";
                            }
                            if (cmpt.prefabUrl === url) {
                                arr.push(new Promise(function (resolve, reject) {
                                    cmpt.addResolve(resolve);
                                }));
                            }
                        };
                        this_1 = this;
                        for (i = 0; i < this.dialogLayer.childrenCount; i++) {
                            _loop_1(i);
                        }
                        return [4 /*yield*/, Promise.all(arr)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 弹出一条文字提示
     * @param data TipData | string 提示数据
     */
    Layer.prototype.showTip = function (data) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var tipData, tipNode, prefab, delay, fade, moveTo, call;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tipData = null;
                        if (typeof data === "string") {
                            tipData = {
                                text: data
                            };
                        }
                        else {
                            tipData = data;
                        }
                        if (!tipData.hasOwnProperty("unique")) {
                            tipData.unique = false;
                        }
                        if (!tipData.hasOwnProperty("duration")) {
                            tipData.duration = 1;
                        }
                        if (!tipData.hasOwnProperty("fade")) {
                            tipData.fade = 0.5;
                        }
                        if (!tipData.hasOwnProperty("start")) {
                            tipData.start = cc.v2(0, 0);
                        }
                        if (!tipData.hasOwnProperty("end")) {
                            tipData.end = cc.v2(0, 0);
                        }
                        // 唯一显示
                        if (tipData.unique && Tool_1.default.arrayHas(this._tipTexts, tipData.text)) {
                            return [2 /*return*/];
                        }
                        this._tipTexts.push(tipData.text);
                        tipNode = null;
                        if (!(this._tipPool.length > 0)) return [3 /*break*/, 1];
                        tipNode = this._tipPool.shift();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Res_1.default.load(Url_1.ResUrl.PREFAB.TIP, cc.Prefab)];
                    case 2:
                        prefab = _b.sent();
                        if (!prefab) {
                            cc.error("[Layer.showTip] can not load prefab: " + Url_1.ResUrl.PREFAB.TIP);
                            return [2 /*return*/];
                        }
                        tipNode = Res_1.default.instantiate(prefab);
                        this.tipLayer.addChild(tipNode);
                        _b.label = 3;
                    case 3:
                        delay = cc.delayTime(tipData.duration);
                        fade = cc.fadeOut(tipData.fade);
                        moveTo = cc.moveTo(tipData.fade, tipData.end);
                        call = cc.callFunc(function () {
                            tipNode.active = false;
                            _this._tipPool.push(tipNode);
                            Tool_1.default.arrayDelete(_this._tipTexts, tipData.text);
                        });
                        tipNode.active = true;
                        tipNode.opacity = 255;
                        tipNode.setPosition(tipData.start);
                        tipNode.setSiblingIndex(this.tipLayer.childrenCount - 1);
                        tipNode.runAction(cc.sequence(delay, cc.spawn(fade, moveTo), call));
                        // 数据
                        (_a = tipNode.getComponent(Tip_1.default)) === null || _a === void 0 ? void 0 : _a.init(tipData.text);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 清空所有提示
     */
    Layer.prototype.clearTips = function () {
        this._tipPool.length = 0;
        this._tipTexts.length = 0;
        this.tipLayer.destroyAllChildren();
    };
    /**
     * 打开全局loading遮罩（打开与关闭的调用必须一一对应）
     */
    Layer.prototype.showLoading = function () {
        this._loadingCount++;
        if (!this.loadingLayer.active) {
            this.loadingLayer.active = true;
            // 默认0.5s后才显示loading内容
            var content_1 = this.loadingLayer.getChildByName("content");
            if (content_1) {
                content_1.active = false;
                this.unscheduleAllCallbacks();
                Tool_1.default.waitCmpt(this, 0.5).then(function () {
                    content_1.active = true;
                });
            }
        }
    };
    /**
     * 关闭全局loading遮罩
     */
    Layer.prototype.hideLoading = function () {
        this._loadingCount--;
        if (this._loadingCount <= 0) {
            this._loadingCount = 0;
            this.loadingLayer.active = false;
            this.unscheduleAllCallbacks();
        }
    };
    var Layer_1;
    Layer.inst = null;
    __decorate([
        property(cc.Node)
    ], Layer.prototype, "mainLayer", void 0);
    __decorate([
        property(cc.Node)
    ], Layer.prototype, "dialogLayer", void 0);
    __decorate([
        property(cc.Node)
    ], Layer.prototype, "loadingLayer", void 0);
    __decorate([
        property(cc.Node)
    ], Layer.prototype, "tipLayer", void 0);
    Layer = Layer_1 = __decorate([
        ccclass,
        disallowMultiple,
        menu("Framework/基础组件/Layer")
    ], Layer);
    return Layer;
}(cc.Component));
exports.default = Layer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxiYXNlXFxMYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlDO0FBQ3pDLHNDQUFpQztBQUNqQyx3Q0FBbUM7QUFDbkMsMkNBQXNDO0FBQ3RDLDZCQUF3QjtBQUVsQixJQUFBLEtBQWdELEVBQUUsQ0FBQyxVQUFVLEVBQTNELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQW9CcEU7O0dBRUc7QUFJSDtJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQWtYQztRQS9XOEIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXBELCtDQUErQztRQUN2QyxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNsQyxhQUFhO1FBQ0wsY0FBUSxHQUFjLEVBQUUsQ0FBQztRQUNqQyxtQkFBbUI7UUFDWCxlQUFTLEdBQWEsRUFBRSxDQUFDOztJQXFXckMsQ0FBQztjQWxYb0IsS0FBSztJQWVaLDZCQUFhLEdBQXZCO1FBQUEsaUJBNkJDO1FBNUJHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixPQUFPO1NBQ1Y7UUFDRCxJQUFJLFNBQVMsR0FBRztZQUFDLGVBQWtCO2lCQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7Z0JBQWxCLDBCQUFrQjs7WUFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQ2YsSUFBSSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNqQyxJQUFJLElB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LEVBQUUsQ0FBQztnQkFDOUIsY0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMxQixTQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDOztJQWhYYSxVQUFJLEdBQVUsSUFBSSxDQUFDO0lBRWQ7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQW1DO0lBQ2xDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUFxQztJQUNwQztRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FBc0M7SUFDckM7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQWtDO0lBTm5DLEtBQUs7UUFIekIsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsc0JBQXNCLENBQUM7T0FDUixLQUFLLENBa1h6QjtJQUFELFlBQUM7Q0FsWEQsQUFrWEMsQ0FsWGtDLEVBQUUsQ0FBQyxTQUFTLEdBa1g5QztrQkFsWG9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNVcmwgfSBmcm9tIFwiLi4vLi4vY29uc3QvVXJsXCI7XHJcbmltcG9ydCBSZXMgZnJvbSBcIi4uLy4uL3V0aWwvUmVzXCI7XHJcbmltcG9ydCBUb29sIGZyb20gXCIuLi8uLi91dGlsL1Rvb2xcIjtcclxuaW1wb3J0IERpYWxvZ0Jhc2UgZnJvbSBcIi4vRGlhbG9nQmFzZVwiO1xyXG5pbXBvcnQgVGlwIGZyb20gXCIuL1RpcFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZGlzYWxsb3dNdWx0aXBsZSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiB0aXDmlbDmja5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGlwRGF0YSB7XHJcbiAgICAvKiog5paH5a2X5YaF5a65ICovXHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICAvKiog5q2k5p2h5paH5a2X5piv5ZCm5ZSv5LiA5pi+56S6ICovXHJcbiAgICB1bmlxdWU/OiBib29sZWFuO1xyXG4gICAgLyoqIOWtmOWcqOaXtumXtCDljZXkvY1zICovXHJcbiAgICBkdXJhdGlvbj86IG51bWJlcjtcclxuICAgIC8qKiDmtojlpLHml7bnmoTmuJDpmpDml7bpl7Qg5Y2V5L2NcyAqL1xyXG4gICAgZmFkZT86IG51bWJlcjtcclxuICAgIC8qKiDliJ3lp4vkvY3nva4gKi9cclxuICAgIHN0YXJ0PzogY2MuVmVjMjtcclxuICAgIC8qKiDmuJDpmpDov4fnqIvnu4jngrnkvY3nva4gKi9cclxuICAgIGVuZD86IGNjLlZlYzI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlhajlsYDlvLnnqpfnrqHnkIblmahcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkBtZW51KFwiRnJhbWV3b3JrL+WfuuehgOe7hOS7ti9MYXllclwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3Q6IExheWVyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHJpdmF0ZSBtYWluTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIHByaXZhdGUgZGlhbG9nTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIHByaXZhdGUgbG9hZGluZ0xheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSBwcml2YXRlIHRpcExheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvKiog5omT5byATG9hZGluZ+WxguiuoeaVsO+8jOS4ujDml7blhbPpl63vvIzpmLLmraLmn5Dkupvmg4XlhrXlkIzml7bop6blj5HmiZPlvIDlhbPpl61Mb2FkaW5nICovXHJcbiAgICBwcml2YXRlIF9sb2FkaW5nQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAvKiogdGlw6IqC54K55rGgICovXHJcbiAgICBwcml2YXRlIF90aXBQb29sOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIC8qKiDlvZPliY3lrZjlnKjnmoR0aXDmloflrZfmlbDnu4QgKi9cclxuICAgIHByaXZhdGUgX3RpcFRleHRzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEluRWRpdG9yKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNoZWNrTm9kZSA9ICguLi5uYW1lczogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgbmFtZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0ID0gbm9kZS5hZGRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQudG9wID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldC5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiTG9hZGluZ0xheWVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hZGRDb21wb25lbnQoY2MuQmxvY2tJbnB1dEV2ZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNoZWNrTm9kZShcIk1haW5MYXllclwiLCBcIkRpYWxvZ0xheWVyXCIsIFwiTG9hZGluZ0xheWVyXCIsIFwiVGlwTGF5ZXJcIik7XHJcbiAgICAgICAgdGhpcy5tYWluTGF5ZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYWluTGF5ZXJcIik7XHJcbiAgICAgICAgdGhpcy5kaWFsb2dMYXllciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkRpYWxvZ0xheWVyXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0xheWVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiTG9hZGluZ0xheWVyXCIpO1xyXG4gICAgICAgIHRoaXMudGlwTGF5ZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJUaXBMYXllclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIExheWVyLmluc3QgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIExheWVyLmluc3QgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5paH5Lu25ZCN77yI5oiq5Y+WdXJs5pyA5ZCO5LiA5Liq5pac5p2g5ZCO55qE5YaF5a6577yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROYW1lQnlVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZihcIi9cIikgKyAxLCB1cmwubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/m+WFpeaWsOWcuuaZr1xyXG4gICAgICogQGFzeW5jXHJcbiAgICAgKiBAcGFyYW0gc2NlbmVOYW1lIOWcuuaZr+WQjVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZW50ZXJTY2VuZShzY2VuZU5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoc2NlbmVOYW1lLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKGBbTGF5ZXIuZW50ZXJTY2VuZV0gZmFpbGVkIHRvIHByZWxvYWQgc2NlbmU6ICR7c2NlbmVOYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vlhaXluLjpqbvnlYzpnaLvvIzlubbmuIXnqbpkaWFsb2fkuI50aXDvvIjkuI3lkIzkuo5kaWFsb2fvvIzluLjpqbvnlYzpnaLlp4vnu4jmmL7npLrlnKjmnIDlupXlsYLvvIzkuJTlkIzml7blj6rkvJrlrZjlnKjkuIDkuKrvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGVudGVyTWFpbih1cmw6IHN0cmluZyk6IFByb21pc2U8Y2MuTm9kZSB8IG51bGw+IHtcclxuICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgbGV0IHByZWZhYjogY2MuUHJlZmFiID0gUmVzLmdldCh1cmwsIGNjLlByZWZhYikgfHwgYXdhaXQgUmVzLmxvYWQodXJsLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICBpZiAoIXByZWZhYikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgW0xheWVyLmVudGVyTWFpbl0gY2FuIG5vdCBmaW5kIHByZWZhYjogJHt1cmx9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYWluTGF5ZXIuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZ3MoKTtcclxuICAgICAgICB0aGlzLmNsZWFyVGlwcygpO1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gUmVzLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB0aGlzLm1haW5MYXllci5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW8ueeql+e7hOS7tu+8iOi/lOWbnumBjeWOhuWIsOeahOesrOS4gOS4qu+8iVxyXG4gICAgICogQHBhcmFtIHVybCBwcmVmYWLot6/lvoTvvIzop4TliJnlkIxSZXPliqDovb3ot6/lvoRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERpYWxvZyh1cmw6IHN0cmluZyk6IERpYWxvZ0Jhc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWFsb2dMYXllci5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmRpYWxvZ0xheWVyLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgY21wdCA9IG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZ0Jhc2UpO1xyXG4gICAgICAgICAgICBpZiAoIWNtcHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjbXB0LnByZWZhYlVybCA9PT0gdXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY21wdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIO+8iOWQjOatpeaWueazle+8jOmcgOehruS/neS6i+WFiOW3suWKoOi9vemihOWItui1hOa6kO+8ieaJk+W8gOW8ueeql1xyXG4gICAgICogQHBhcmFtIHVybCBwcmVmYWLot6/lvoTvvIzop4TliJnlkIxSZXPliqDovb3ot6/lvoRcclxuICAgICAqIEBwYXJhbSBhcmdzIERpYWxvZ0Jhc2Uub3Blbuiwg+eUqOWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3BlbkRpYWxvZyh1cmw6IHN0cmluZywgLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBsZXQgcHJlZmFiOiBjYy5QcmVmYWIgPSBSZXMuZ2V0KHVybCwgY2MuUHJlZmFiKTtcclxuICAgICAgICBpZiAoIXByZWZhYikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgW0xheWVyLm9wZW5EaWFsb2ddIGNhbiBub3QgZmluZCBkaWFsb2cgcHJlZmFiOiAke3VybH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSBSZXMuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICB0aGlzLmRpYWxvZ0xheWVyLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgbGV0IGNtcHQgPSBub2RlLmdldENvbXBvbmVudChEaWFsb2dCYXNlKTtcclxuICAgICAgICBpZiAoY21wdCkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgY21wdC5fcHJlZmFiVXJsID0gdXJsO1xyXG4gICAgICAgICAgICBjbXB0LnBsYXlPcGVuKCk7XHJcbiAgICAgICAgICAgIGNtcHQub25PcGVuKC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIO+8iOWQjOatpeaWueazle+8jOmcgOehruS/neS6i+WFiOW3suWKoOi9vemihOWItui1hOa6kO+8ieaJk+W8gOWUr+S4gOW8ueeqly0t5ZCM5LiA5by556qX6IqC54K55Y+q6IO95ZCM5pe25a2Y5Zyo5LiA5LiqXHJcbiAgICAgKiBAcGFyYW0gdXJsIHByZWZhYui3r+W+hO+8jOinhOWImeWQjFJlc+WKoOi9vei3r+W+hFxyXG4gICAgICogQHBhcmFtIGFyZ3MgRGlhbG9nQmFzZS5vcGVu6LCD55So5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcGVuVW5pRGlhbG9nKHVybDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmdldERpYWxvZyh1cmwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub3BlbkRpYWxvZyh1cmwsIC4uLmFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5by556qXXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEBwYXJhbSB1cmwgcHJlZmFi6Lev5b6E77yM6KeE5YiZ5ZCMUmVz5Yqg6L296Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gYXJncyBEaWFsb2dCYXNlLm9wZW7osIPnlKjlj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIG9wZW5EaWFsb2dBc3luYyh1cmw6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgbGV0IHByZWZhYjogY2MuUHJlZmFiID0gYXdhaXQgUmVzLmxvYWQodXJsLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICBpZiAoIXByZWZhYikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgW0xheWVyLm9wZW5EaWFsb2dBc3luY10gY2FuIG5vdCBmaW5kIGRpYWxvZyBwcmVmYWI6ICR7dXJsfWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbm9kZSA9IFJlcy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuZGlhbG9nTGF5ZXIuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICBsZXQgY21wdCA9IG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZ0Jhc2UpO1xyXG4gICAgICAgIGlmIChjbXB0KSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBjbXB0Ll9wcmVmYWJVcmwgPSB1cmw7XHJcbiAgICAgICAgICAgIGNtcHQucGxheU9wZW4oKTtcclxuICAgICAgICAgICAgY21wdC5vbk9wZW4oLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5ZSv5LiA5by556qXLS3lkIzkuIDlvLnnqpfoioLngrnlj6rog73lkIzml7blrZjlnKjkuIDkuKpcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHVybCBwcmVmYWLot6/lvoTvvIzop4TliJnlkIxSZXPliqDovb3ot6/lvoRcclxuICAgICAqIEBwYXJhbSBhcmdzIERpYWxvZ0Jhc2Uub3Blbuiwg+eUqOWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlblVuaURpYWxvZ0FzeW5jKHVybDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdldERpYWxvZyh1cmwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMub3BlbkRpYWxvZ0FzeW5jKHVybCwgLi4uYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63pgY3ljobliLDnmoTnrKzkuIDkuKrlvLnnqpdcclxuICAgICAqIEBwYXJhbSB1cmwgcHJlZmFi6Lev5b6E77yM6KeE5YiZ5ZCMUmVz5Yqg6L296Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gcGxheSB0cnVl77ya6LCD55SocGxheUNsb3Nl5pKt5pS+5by556qX5YWz6Zet5Yqo55S777ybZmFsc2XvvJrnm7TmjqXosIPnlKhjbG9zZeWFs+mXreW8ueeql1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvc2VEaWFsb2codXJsOiBzdHJpbmcsIHBsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbXB0ID0gdGhpcy5nZXREaWFsb2codXJsKTtcclxuICAgICAgICBpZiAoIWNtcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwbGF5ID8gY21wdC5wbGF5Q2xvc2UoKSA6IGNtcHQuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreaJgOacieWQjOi3r+W+hOW8ueeql++8jOS4jeS8oOWPguWImeWFs+mXreaJgOacieW8ueeql1xyXG4gICAgICogQHBhcmFtIHVybCBwcmVmYWLot6/lvoTvvIzop4TliJnlkIxSZXPliqDovb3ot6/lvoRcclxuICAgICAqIEBwYXJhbSBwbGF5IHRydWXvvJrosIPnlKhwbGF5Q2xvc2Xmkq3mlL7lvLnnqpflhbPpl63liqjnlLvvvJtmYWxzZe+8muebtOaOpeiwg+eUqGNsb3Nl5YWz6Zet5by556qXXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9zZURpYWxvZ3ModXJsOiBzdHJpbmcgPSBcIlwiLCBwbGF5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5kaWFsb2dMYXllci5jaGlsZHJlbkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmRpYWxvZ0xheWVyLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgY21wdCA9IG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZ0Jhc2UpO1xyXG4gICAgICAgICAgICBpZiAoIWNtcHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdXJsIHx8IGNtcHQucHJlZmFiVXJsID09PSB1cmwpIHtcclxuICAgICAgICAgICAgICAgIHBsYXkgPyBjbXB0LnBsYXlDbG9zZSgpIDogY21wdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byC5q2l562J5b6F5by556qX5YWz6Zet77yI5Y+q562J5b6F6YGN5Y6G5Yiw55qE56ys5LiA5Liq77yJXHJcbiAgICAgKiBAcGFyYW0gdXJsIHByZWZhYui3r+W+hO+8jOinhOWImeWQjFJlc+WKoOi9vei3r+W+hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgd2FpdENsb3NlRGlhbG9nKHVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IGNtcHQgPSB0aGlzLmdldERpYWxvZyh1cmwpO1xyXG4gICAgICAgIGlmICghY21wdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNtcHQuYWRkUmVzb2x2ZShyZXNvbHZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8guatpeetieW+heaJgOacieWQjOi3r+W+hOW8ueeql+WFs+mXrVxyXG4gICAgICogQHBhcmFtIHVybCBwcmVmYWLot6/lvoTvvIzop4TliJnlkIxSZXPliqDovb3ot6/lvoRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHdhaXRDbG9zZURpYWxvZ3ModXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWRbXT4ge1xyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpYWxvZ0xheWVyLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZGlhbG9nTGF5ZXIuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBjbXB0ID0gbm9kZS5nZXRDb21wb25lbnQoRGlhbG9nQmFzZSk7XHJcbiAgICAgICAgICAgIGlmICghY21wdCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNtcHQucHJlZmFiVXJsID09PSB1cmwpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbXB0LmFkZFJlc29sdmUocmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKGFycik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvLnlh7rkuIDmnaHmloflrZfmj5DnpLpcclxuICAgICAqIEBwYXJhbSBkYXRhIFRpcERhdGEgfCBzdHJpbmcg5o+Q56S65pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBzaG93VGlwKGRhdGE6IFRpcERhdGEgfCBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyDlpITnkIZ0aXBEYXRh6buY6K6k5YC8XHJcbiAgICAgICAgbGV0IHRpcERhdGE6IFRpcERhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aXBEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogZGF0YVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcERhdGEgPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRpcERhdGEuaGFzT3duUHJvcGVydHkoXCJ1bmlxdWVcIikpIHtcclxuICAgICAgICAgICAgdGlwRGF0YS51bmlxdWUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aXBEYXRhLmhhc093blByb3BlcnR5KFwiZHVyYXRpb25cIikpIHtcclxuICAgICAgICAgICAgdGlwRGF0YS5kdXJhdGlvbiA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGlwRGF0YS5oYXNPd25Qcm9wZXJ0eShcImZhZGVcIikpIHtcclxuICAgICAgICAgICAgdGlwRGF0YS5mYWRlID0gMC41O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRpcERhdGEuaGFzT3duUHJvcGVydHkoXCJzdGFydFwiKSkge1xyXG4gICAgICAgICAgICB0aXBEYXRhLnN0YXJ0ID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGlwRGF0YS5oYXNPd25Qcm9wZXJ0eShcImVuZFwiKSkge1xyXG4gICAgICAgICAgICB0aXBEYXRhLmVuZCA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5ZSv5LiA5pi+56S6XHJcbiAgICAgICAgaWYgKHRpcERhdGEudW5pcXVlICYmIFRvb2wuYXJyYXlIYXModGhpcy5fdGlwVGV4dHMsIHRpcERhdGEudGV4dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90aXBUZXh0cy5wdXNoKHRpcERhdGEudGV4dCk7XHJcblxyXG4gICAgICAgIC8vIOiOt+WPluiKgueCuVxyXG4gICAgICAgIGxldCB0aXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fdGlwUG9vbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRpcE5vZGUgPSB0aGlzLl90aXBQb29sLnNoaWZ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHByZWZhYjogY2MuUHJlZmFiID0gYXdhaXQgUmVzLmxvYWQoUmVzVXJsLlBSRUZBQi5USVAsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIGlmICghcHJlZmFiKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihgW0xheWVyLnNob3dUaXBdIGNhbiBub3QgbG9hZCBwcmVmYWI6ICR7UmVzVXJsLlBSRUZBQi5USVB9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGlwTm9kZSA9IFJlcy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLnRpcExheWVyLmFkZENoaWxkKHRpcE5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Yqo55S7XHJcbiAgICAgICAgbGV0IGRlbGF5ID0gY2MuZGVsYXlUaW1lKHRpcERhdGEuZHVyYXRpb24pO1xyXG4gICAgICAgIGxldCBmYWRlID0gY2MuZmFkZU91dCh0aXBEYXRhLmZhZGUpO1xyXG4gICAgICAgIGxldCBtb3ZlVG8gPSBjYy5tb3ZlVG8odGlwRGF0YS5mYWRlLCB0aXBEYXRhLmVuZCk7XHJcbiAgICAgICAgbGV0IGNhbGwgPSBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRpcE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpcFBvb2wucHVzaCh0aXBOb2RlKTtcclxuICAgICAgICAgICAgVG9vbC5hcnJheURlbGV0ZSh0aGlzLl90aXBUZXh0cywgdGlwRGF0YS50ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGlwTm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRpcE5vZGUuc2V0UG9zaXRpb24odGlwRGF0YS5zdGFydCk7XHJcbiAgICAgICAgdGlwTm9kZS5zZXRTaWJsaW5nSW5kZXgodGhpcy50aXBMYXllci5jaGlsZHJlbkNvdW50IC0gMSk7XHJcbiAgICAgICAgdGlwTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZGVsYXksIGNjLnNwYXduKGZhZGUsIG1vdmVUbyksIGNhbGwpKTtcclxuXHJcbiAgICAgICAgLy8g5pWw5o2uXHJcbiAgICAgICAgdGlwTm9kZS5nZXRDb21wb25lbnQoVGlwKT8uaW5pdCh0aXBEYXRhLnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF56m65omA5pyJ5o+Q56S6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhclRpcHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGlwUG9vbC5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpcFRleHRzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy50aXBMYXllci5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOWFqOWxgGxvYWRpbmfpga7nvanvvIjmiZPlvIDkuI7lhbPpl63nmoTosIPnlKjlv4XpobvkuIDkuIDlr7nlupTvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dMb2FkaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xvYWRpbmdDb3VudCsrO1xyXG4gICAgICAgIGlmICghdGhpcy5sb2FkaW5nTGF5ZXIuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0xheWVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIOm7mOiupDAuNXPlkI7miY3mmL7npLpsb2FkaW5n5YaF5a65XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5sb2FkaW5nTGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgICAgICBpZiAoY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgVG9vbC53YWl0Q21wdCh0aGlzLCAwLjUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5YWo5bGAbG9hZGluZ+mBrue9qVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZUxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGluZ0NvdW50LS07XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0xheWVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19