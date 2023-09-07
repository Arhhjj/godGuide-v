"use strict";
cc._RF.push(module, '8f224eiAodM8YIcjrZ0B9zN', 'AnimatorSpine');
// scripts/animator/AnimatorSpine.ts

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
var AnimatorBase_1 = require("./core/AnimatorBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/**
 * Spine状态机组件（主状态机），trackIndex为0
 */
var AnimatorSpine = /** @class */ (function (_super) {
    __extends(AnimatorSpine, _super);
    function AnimatorSpine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** spine组件 */
        _this._spine = null;
        /** 动画完成的回调 */
        _this._completeListenerMap = new Map();
        /** 次状态机注册的回调 */
        _this._secondaryListenerMap = new Map();
        return _this;
    }
    AnimatorSpine.prototype.start = function () {
        if (!this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this._spine = this.getComponent(sp.Skeleton);
        this._spine.setCompleteListener(this.onSpineComplete.bind(this));
        if (this.assetRawUrl !== null) {
            this.initJson(this.assetRawUrl.json);
        }
    };
    /**
     * 手动初始化状态机，可传入0-3个参数，类型如下
     * - onStateChangeCall 状态切换时的回调
     * - stateLogicMap 各个状态逻辑控制
     * - animationPlayer 自定义动画控制
     * @override
     */
    AnimatorSpine.prototype.onInit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this.initArgs.apply(this, args);
        this._spine = this.getComponent(sp.Skeleton);
        this._spine.setCompleteListener(this.onSpineComplete.bind(this));
        if (this.assetRawUrl !== null) {
            this.initJson(this.assetRawUrl.json);
        }
    };
    AnimatorSpine.prototype.onSpineComplete = function (entry) {
        entry.trackIndex === 0 && this.onAnimFinished();
        this._completeListenerMap.forEach(function (target, cb) { target ? cb.call(target, entry) : cb(entry); });
        this._secondaryListenerMap.forEach(function (target, cb) { entry.trackIndex === target.trackIndex && cb.call(target, entry); });
    };
    /**
     * 播放动画
     * @override
     * @param animName 动画名
     * @param loop 是否循环播放
     */
    AnimatorSpine.prototype.playAnimation = function (animName, loop) {
        if (animName) {
            this._spine.setAnimation(0, animName, loop);
        }
        else {
            this._spine.clearTrack(0);
        }
    };
    /**
     * 缩放动画播放速率
     * @override
     * @param scale 缩放倍率
     */
    AnimatorSpine.prototype.scaleTime = function (scale) {
        this._spine.timeScale = scale;
    };
    /**
     * 注册次状态机动画结束的回调（状态机内部方法，不能由外部直接调用）
     */
    AnimatorSpine.prototype.addSecondaryListener = function (cb, target) {
        this._secondaryListenerMap.set(cb, target);
    };
    /**
     * 注册动画完成时的监听
     * @param cb 回调
     * @param target 调用回调的this对象
     */
    AnimatorSpine.prototype.addCompleteListener = function (cb, target) {
        if (target === void 0) { target = null; }
        if (this._completeListenerMap.has(cb)) {
            return;
        }
        this._completeListenerMap.set(cb, target);
    };
    /**
     * 注销动画完成的监听
     * @param cb 回调
     */
    AnimatorSpine.prototype.removeCompleteListener = function (cb) {
        this._completeListenerMap.delete(cb);
    };
    /**
     * 清空动画完成的监听
     */
    AnimatorSpine.prototype.clearCompleteListener = function () {
        this._completeListenerMap.clear;
    };
    AnimatorSpine = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(sp.Skeleton),
        menu('Framework/Animator/AnimatorSpine')
    ], AnimatorSpine);
    return AnimatorSpine;
}(AnimatorBase_1.default));
exports.default = AnimatorSpine;

cc._RF.pop();