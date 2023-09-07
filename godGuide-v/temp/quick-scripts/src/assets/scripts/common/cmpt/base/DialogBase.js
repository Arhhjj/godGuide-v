"use strict";
cc._RF.push(module, '9b83e2KZopKTb+TLQZNTspz', 'DialogBase');
// scripts/common/cmpt/base/DialogBase.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var EditorTool_1 = require("../../util/EditorTool");
var Tool_1 = require("../../util/Tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/**
 * 弹窗基类
 */
var DialogBase = /** @class */ (function (_super) {
    __extends(DialogBase, _super);
    function DialogBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dlgAnim = null;
        _this.openClip = null;
        _this.closeClip = null;
        /** 外部的resolve函数，在弹窗close时调用 */
        _this._resolveList = [];
        _this._prefabUrl = "";
        return _this;
    }
    Object.defineProperty(DialogBase.prototype, "prefabUrl", {
        /** 弹窗prefab路径，规则同Res加载路径 */
        get: function () { return this._prefabUrl; },
        enumerable: false,
        configurable: true
    });
    DialogBase.prototype.onLoad = function () {
        if (this.dlgAnim) {
            this.openClip && this.dlgAnim.addClip(this.openClip);
            this.closeClip && this.dlgAnim.addClip(this.closeClip);
            this.dlgAnim.on(cc.Animation.EventType.FINISHED, this.onAnimFinished, this);
        }
    };
    DialogBase.prototype.resetInEditor = function () {
        var _this = this;
        if (!CC_EDITOR) {
            return;
        }
        // 动画
        for (var i = 0; i < this.node.childrenCount; i++) {
            var anim = this.node.children[i].getComponent(cc.Animation);
            if (anim) {
                this.dlgAnim = anim;
                EditorTool_1.default.load("res/animation/dialog/open.anim").then(function (v) { _this.openClip = v; });
                EditorTool_1.default.load("res/animation/dialog/close.anim").then(function (v) { _this.closeClip = v; });
                break;
            }
        }
        // 触摸拦截
        if (this.node.childrenCount <= 0 || !this.node.children[0].getComponent(cc.BlockInputEvents)) {
            var block = new cc.Node("Block");
            this.node.addChild(block);
            block.setSiblingIndex(0);
            block.setContentSize(this.node.getContentSize());
            block.addComponent(cc.BlockInputEvents);
            var widget = block.addComponent(cc.Widget);
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
        }
    };
    DialogBase.prototype.onAnimFinished = function () {
        if (this.dlgAnim.currentClip === this.closeClip) {
            this.close();
        }
    };
    /**
     * 打开动画
     */
    DialogBase.prototype.playOpen = function () {
        if (this.dlgAnim && this.openClip) {
            this.dlgAnim.play(this.openClip.name);
        }
    };
    /**
     * 关闭动画，动画结束回调中会调用close销毁
     */
    DialogBase.prototype.playClose = function () {
        if (this.dlgAnim && this.closeClip) {
            if (this.dlgAnim.getAnimationState(this.closeClip.name).isPlaying) {
                return;
            }
            this.dlgAnim.play(this.closeClip.name);
        }
        else {
            this.close();
        }
    };
    /**
     * 打开弹窗时的处理
     * @virtual
     */
    DialogBase.prototype.onOpen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * 关闭弹窗时的处理
     * @virtual
     */
    DialogBase.prototype.onClose = function () {
    };
    /**
     * 销毁弹窗节点时的处理。
     * - 必须使用此接口销毁，子类重写时请调用super.close()
     * @virtual
     */
    DialogBase.prototype.close = function () {
        this.onClose();
        this._resolveList.forEach(function (resolve) { resolve(); });
        this.node.removeFromParent();
        this.node.destroy();
    };
    /**
     * 关闭按钮回调
     * @virtual
     */
    DialogBase.prototype.onClickClose = function () {
        this.playClose();
    };
    /**
     * 添加外部resolve函数，在弹窗close时调用
     */
    DialogBase.prototype.addResolve = function (resolve) {
        Tool_1.default.arrayAdd(this._resolveList, resolve);
    };
    /** 弹窗prefab路径，规则同Res加载路径 */
    DialogBase.pUrl = "";
    __decorate([
        property(cc.Animation)
    ], DialogBase.prototype, "dlgAnim", void 0);
    __decorate([
        property({
            type: cc.AnimationClip,
            tooltip: CC_DEV && "打开弹窗的动画",
            visible: function () { return !!this.dlgAnim; }
        })
    ], DialogBase.prototype, "openClip", void 0);
    __decorate([
        property({
            type: cc.AnimationClip,
            tooltip: CC_DEV && "关闭弹窗的动画",
            visible: function () { return !!this.dlgAnim; }
        })
    ], DialogBase.prototype, "closeClip", void 0);
    DialogBase = __decorate([
        ccclass,
        disallowMultiple,
        menu("Framework/基础组件/DialogBase")
    ], DialogBase);
    return DialogBase;
}(cc.Component));
exports.default = DialogBase;

cc._RF.pop();