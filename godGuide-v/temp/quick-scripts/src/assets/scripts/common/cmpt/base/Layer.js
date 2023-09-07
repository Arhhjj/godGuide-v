"use strict";
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