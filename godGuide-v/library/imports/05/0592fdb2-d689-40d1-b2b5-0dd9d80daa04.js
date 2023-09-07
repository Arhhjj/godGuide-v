"use strict";
cc._RF.push(module, '0592f2y1olA0bK1DdnYDaoE', 'AnimatorDragonBones');
// scripts/animator/AnimatorDragonBones.ts

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
 * DragonBones状态机组件
 */
var AnimatorDragonBones = /** @class */ (function (_super) {
    __extends(AnimatorDragonBones, _super);
    function AnimatorDragonBones() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** DragonBones组件 */
        _this._dragonBones = null;
        return _this;
    }
    AnimatorDragonBones.prototype.start = function () {
        if (!this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this._dragonBones = this.getComponent(dragonBones.ArmatureDisplay);
        this._dragonBones.addEventListener(dragonBones.EventObject.COMPLETE, this.onAnimFinished, this);
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
    AnimatorDragonBones.prototype.onInit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this.initArgs.apply(this, args);
        this._dragonBones = this.getComponent(dragonBones.ArmatureDisplay);
        this._dragonBones.addEventListener(dragonBones.EventObject.COMPLETE, this.onAnimFinished, this);
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
    AnimatorDragonBones.prototype.playAnimation = function (animName, loop) {
        animName && this._dragonBones.playAnimation(animName, loop ? 0 : -1);
    };
    /**
     * 缩放动画播放速率
     * @override
     * @param scale 缩放倍率
     */
    AnimatorDragonBones.prototype.scaleTime = function (scale) {
        this._dragonBones.timeScale = scale;
    };
    AnimatorDragonBones = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(dragonBones.ArmatureDisplay),
        menu('Framework/Animator/AnimatorDragonBones')
    ], AnimatorDragonBones);
    return AnimatorDragonBones;
}(AnimatorBase_1.default));
exports.default = AnimatorDragonBones;

cc._RF.pop();