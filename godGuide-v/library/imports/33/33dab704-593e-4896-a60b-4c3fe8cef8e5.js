"use strict";
cc._RF.push(module, '33dabcEWT5IlqYLTD/ozvjl', 'AnimatorBase');
// scripts/animator/core/AnimatorBase.ts

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
var AnimatorController_1 = require("./AnimatorController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
/**
 * 状态机组件基类 优先执行生命周期
 */
var AnimatorBase = /** @class */ (function (_super) {
    __extends(AnimatorBase, _super);
    function AnimatorBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.assetRawUrl = null;
        _this.playOnStart = true;
        _this.autoUpdate = true;
        /** 是否初始化 */
        _this._hasInit = false;
        /** 状态机控制 */
        _this._ac = null;
        /** 各个状态逻辑控制，key为状态名 */
        _this._stateLogicMap = null;
        /** 状态切换时的回调 */
        _this._onStateChangeCall = null;
        /** 自定义的动画播放控制器 */
        _this._animationPlayer = null;
        _this._extraMulti = 1;
        return _this;
    }
    Object.defineProperty(AnimatorBase.prototype, "extraMulti", {
        /** 统一控制所有动画播放速度的参数 */
        get: function () { return this._extraMulti; },
        set: function (v) {
            if (this._extraMulti === v) {
                return;
            }
            this._extraMulti = v;
            this.updatePlaySpeed();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorBase.prototype, "curStateName", {
        /** 当前状态名 */
        get: function () { return this._ac.curState.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorBase.prototype, "curStateMotion", {
        /** 当前动画名 */
        get: function () { return this._ac.curState.motion; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorBase.prototype, "animComplete", {
        /** 当前动画是否播放完毕 */
        get: function () { return this._ac.animComplete; },
        enumerable: false,
        configurable: true
    });
    /**
     * 手动初始化状态机，可传入0-3个参数，类型如下
     * - onStateChangeCall 状态切换时的回调
     * - stateLogicMap 各个状态逻辑控制
     * - animationPlayer 自定义动画控制
     * @virtual
     */
    AnimatorBase.prototype.onInit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * 处理初始化参数
     */
    AnimatorBase.prototype.initArgs = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (arg) {
            if (!arg) {
                return;
            }
            if (typeof arg === 'function') {
                _this._onStateChangeCall = arg;
            }
            else if (typeof arg === 'object') {
                if (arg instanceof Map) {
                    _this._stateLogicMap = arg;
                }
                else {
                    _this._animationPlayer = arg;
                    _this._animationPlayer.setFinishedCallback(_this.onAnimFinished, _this);
                }
            }
        });
    };
    /**
     * 更新动画播放速度
     */
    AnimatorBase.prototype.updatePlaySpeed = function () {
        // 混合当前动画播放速度
        var playSpeed = this._ac.curState.speed * this.extraMulti;
        if (this._ac.curState.multi) {
            playSpeed *= this._ac.params.getNumber(this._ac.curState.multi) || 1;
        }
        this.scaleTime(playSpeed);
    };
    AnimatorBase.prototype.updateAnimator = function () {
        // 更新动画播放速度
        this.updatePlaySpeed();
        // 更新AnimatorStateLogic
        if (this._stateLogicMap) {
            var curLogic = this._stateLogicMap.get(this._ac.curState.name);
            curLogic && curLogic.onUpdate();
        }
        // 更新状态机逻辑
        this._ac.updateAnimator();
    };
    AnimatorBase.prototype.update = function () {
        if (this._hasInit && this.autoUpdate) {
            this.updateAnimator();
        }
    };
    /**
     * 手动调用更新
     */
    AnimatorBase.prototype.manualUpdate = function () {
        if (this._hasInit && !this.autoUpdate) {
            this.updateAnimator();
        }
    };
    /**
     * 解析状态机json文件
     */
    AnimatorBase.prototype.initJson = function (json) {
        this._ac = new AnimatorController_1.default(this, json);
        // 执行默认状态
        this._ac.changeState(json.defaultState);
    };
    /**
     * 动画结束的回调
     */
    AnimatorBase.prototype.onAnimFinished = function () {
        this._ac.onAnimationComplete();
    };
    /**
     * 播放动画
     * @virtual
     * @param animName 动画名
     * @param loop 是否循环播放
     */
    AnimatorBase.prototype.playAnimation = function (animName, loop) {
    };
    /**
     * 缩放动画播放速率
     * @virtual
     * @param scale 缩放倍率
     */
    AnimatorBase.prototype.scaleTime = function (scale) {
    };
    /**
     * 状态切换时的逻辑（状态机内部方法，不能由外部直接调用）
     */
    AnimatorBase.prototype.onStateChange = function (fromState, toState) {
        this.playAnimation(toState.motion, toState.loop);
        var fromStateName = fromState ? fromState.name : '';
        if (this._stateLogicMap) {
            var fromLogic = this._stateLogicMap.get(fromStateName);
            fromLogic && fromLogic.onExit();
            var toLogic = this._stateLogicMap.get(toState.name);
            toLogic && toLogic.onEntry();
        }
        this._onStateChangeCall && this._onStateChangeCall(fromStateName, toState.name);
    };
    /**
     * 设置boolean类型参数的值
     */
    AnimatorBase.prototype.setBool = function (key, value) {
        this._ac.params.setBool(key, value);
    };
    /**
     * 获取boolean类型参数的值
     */
    AnimatorBase.prototype.getBool = function (key) {
        return this._ac.params.getBool(key) !== 0;
    };
    /**
     * 设置number类型参数的值
     */
    AnimatorBase.prototype.setNumber = function (key, value) {
        this._ac.params.setNumber(key, value);
    };
    /**
     * 获取number类型参数的值
     */
    AnimatorBase.prototype.getNumber = function (key) {
        return this._ac.params.getNumber(key);
    };
    /**
     * 设置trigger类型参数的值
     */
    AnimatorBase.prototype.setTrigger = function (key) {
        this._ac.params.setTrigger(key);
    };
    /**
     * 重置trigger类型参数的值
     */
    AnimatorBase.prototype.resetTrigger = function (key) {
        this._ac.params.resetTrigger(key);
    };
    /**
     * 设置autoTrigger类型参数的值（autoTrigger类型参数不需要主动reset，每次状态机更新结束后会自动reset）
     */
    AnimatorBase.prototype.autoTrigger = function (key) {
        this._ac.params.autoTrigger(key);
    };
    /**
     * 无视条件直接跳转状态，如果当前已处于此状态则重置状态
     * @param 状态名
     */
    AnimatorBase.prototype.play = function (stateName) {
        if (!this._hasInit) {
            return;
        }
        this._ac.play(stateName);
    };
    __decorate([
        property({ type: cc.JsonAsset, tooltip: CC_DEV && '状态机json文件' })
    ], AnimatorBase.prototype, "assetRawUrl", void 0);
    __decorate([
        property({ tooltip: CC_DEV && '是否在start中自动启动状态机' })
    ], AnimatorBase.prototype, "playOnStart", void 0);
    __decorate([
        property({ tooltip: CC_DEV && '是否在update中自动触发状态机逻辑更新' })
    ], AnimatorBase.prototype, "autoUpdate", void 0);
    AnimatorBase = __decorate([
        ccclass,
        executionOrder(-1000)
    ], AnimatorBase);
    return AnimatorBase;
}(cc.Component));
exports.default = AnimatorBase;

cc._RF.pop();