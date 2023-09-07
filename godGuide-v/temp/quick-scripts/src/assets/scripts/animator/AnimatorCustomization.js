"use strict";
cc._RF.push(module, '32e01QIrwtP4buKMSAxTJmr', 'AnimatorCustomization');
// scripts/animator/AnimatorCustomization.ts

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
 * 自定义动画控制的状态机组件
 */
var AnimatorCustomization = /** @class */ (function (_super) {
    __extends(AnimatorCustomization, _super);
    function AnimatorCustomization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 此组件必须主动调用onInit初始化 */
        _this.playOnStart = false;
        return _this;
    }
    /**
     * 手动初始化状态机，可传入0-3个参数，类型如下
     * - onStateChangeCall 状态切换时的回调
     * - stateLogicMap 各个状态逻辑控制
     * - animationPlayer 自定义动画控制
     * @override
     */
    AnimatorCustomization.prototype.onInit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._hasInit) {
            return;
        }
        this._hasInit = true;
        this.initArgs.apply(this, args);
        if (this.assetRawUrl !== null) {
            this.initJson(this.assetRawUrl.json);
        }
    };
    /**
     * 播放动画
     * @override
     * @param animName 动画名
     * @param loop 是否循环播放
     */
    AnimatorCustomization.prototype.playAnimation = function (animName, loop) {
        if (this._animationPlayer && animName) {
            this._animationPlayer.playAnimation(animName, loop);
        }
    };
    /**
     * 缩放动画播放速率
     * @override
     * @param scale 缩放倍率
     */
    AnimatorCustomization.prototype.scaleTime = function (scale) {
        if (this._animationPlayer) {
            this._animationPlayer.scaleTime(scale);
        }
    };
    __decorate([
        property({ override: true, visible: false })
    ], AnimatorCustomization.prototype, "playOnStart", void 0);
    AnimatorCustomization = __decorate([
        ccclass,
        disallowMultiple,
        menu('Framework/Animator/AnimatorCustomization')
    ], AnimatorCustomization);
    return AnimatorCustomization;
}(AnimatorBase_1.default));
exports.default = AnimatorCustomization;

cc._RF.pop();