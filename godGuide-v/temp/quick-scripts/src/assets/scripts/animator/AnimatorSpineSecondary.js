"use strict";
cc._RF.push(module, '2488934/SlBPY9ngsu8UqWo', 'AnimatorSpineSecondary');
// scripts/animator/AnimatorSpineSecondary.ts

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
var AnimatorSpine_1 = require("./AnimatorSpine");
var AnimatorBase_1 = require("./core/AnimatorBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, menu = _a.menu;
/**
 * Spine状态机组件（次状态机），同一节点可添加多个，用于在不同track中播放动画，trackIndex必须大于0
 */
var AnimatorSpineSecondary = /** @class */ (function (_super) {
    __extends(AnimatorSpineSecondary, _super);
    function AnimatorSpineSecondary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.trackIndex = 1;
        /** 主状态机 */
        _this._main = null;
        /** spine组件 */
        _this._spine = null;
        return _this;
    }
    AnimatorSpineSecondary.prototype.start = function () {
        if (!this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this._spine = this.getComponent(sp.Skeleton);
        this._main = this.getComponent(AnimatorSpine_1.default);
        this._main.addSecondaryListener(this.onAnimFinished, this);
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
    AnimatorSpineSecondary.prototype.onInit = function () {
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
        this._main = this.getComponent(AnimatorSpine_1.default);
        this._main.addSecondaryListener(this.onAnimFinished, this);
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
    AnimatorSpineSecondary.prototype.playAnimation = function (animName, loop) {
        if (animName) {
            this._spine.setAnimation(this.trackIndex, animName, loop);
        }
        else {
            this._spine.clearTrack(this.trackIndex);
        }
    };
    __decorate([
        property({ tooltip: CC_DEV && '动画播放的trackIndex，必须大于0' })
    ], AnimatorSpineSecondary.prototype, "trackIndex", void 0);
    AnimatorSpineSecondary = __decorate([
        ccclass,
        requireComponent(sp.Skeleton),
        menu('Framework/Animator/AnimatorSpineSecondary')
    ], AnimatorSpineSecondary);
    return AnimatorSpineSecondary;
}(AnimatorBase_1.default));
exports.default = AnimatorSpineSecondary;

cc._RF.pop();