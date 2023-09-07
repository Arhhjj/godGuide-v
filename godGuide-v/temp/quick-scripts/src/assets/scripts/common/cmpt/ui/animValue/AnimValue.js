"use strict";
cc._RF.push(module, 'cfe49J1R7JHxIqVge927Yqj', 'AnimValue');
// scripts/common/cmpt/ui/animValue/AnimValue.ts

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
var Tween_1 = require("../../../util/Tween");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
/**
 * 数值变化类型
 */
var AnimType;
(function (AnimType) {
    /** 以速度计算变化时长 */
    AnimType[AnimType["SPEED"] = 0] = "SPEED";
    /** 固定时长 */
    AnimType[AnimType["DURATION"] = 1] = "DURATION";
})(AnimType || (AnimType = {}));
/**
 * 固定时长时的缓动类型
 */
var EasingType;
(function (EasingType) {
    EasingType[EasingType["NONE"] = 0] = "NONE";
    EasingType[EasingType["IN"] = 1] = "IN";
    EasingType[EasingType["OUT"] = 2] = "OUT";
    EasingType[EasingType["IN_OUT"] = 3] = "IN_OUT";
})(EasingType || (EasingType = {}));
/**
 * 数值渐变组件基类，可根据此组件拓展各种数值渐变的组件
 */
var AnimValue = /** @class */ (function (_super) {
    __extends(AnimValue, _super);
    function AnimValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._endValue = 0;
        _this._curValue = 0;
        _this.animType = AnimType.SPEED;
        _this.speed = 1;
        _this.duration = 1;
        _this.easingType = EasingType.NONE;
        _this.timeScale = false;
        _this._tween = null;
        _this._isAdd = false;
        return _this;
    }
    Object.defineProperty(AnimValue.prototype, "initValue", {
        get: function () { return this._endValue; },
        set: function (v) {
            this._curValue = v;
            this._endValue = v;
            this.setValueImmediately(this._endValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimValue.prototype, "isAdd", {
        /** 当前是否为增量变化 */
        get: function () { return this._isAdd; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimValue.prototype, "endValue", {
        /** 变化的目标值 */
        get: function () { return this._endValue; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimValue.prototype, "curValue", {
        /** 变化过程的当前值 */
        get: function () { return this._curValue; },
        enumerable: false,
        configurable: true
    });
    /**
     * @virtual
     */
    AnimValue.prototype.onAnimStart = function () {
    };
    /**
     * @virtual
     */
    AnimValue.prototype.onAnimUpdate = function () {
    };
    /**
     * @virtual
     */
    AnimValue.prototype.onAnimComplete = function () {
        if (this._animResolve) {
            this._animResolve();
            this._animResolve = null;
        }
        if (this._tween) {
            this._tween.stop();
            this._tween = null;
        }
    };
    /**
     * 立即设置value，不执行动画
     * @virtual
     */
    AnimValue.prototype.setValueImmediately = function (end) {
        this._isAdd = this._endValue - this._curValue > 0;
        this._endValue = end;
        this._curValue = end;
        this.onAnimStart();
        this.onAnimUpdate();
        this.onAnimComplete();
    };
    /**
     * 设置进度值。进度动画结束后resolve
     * @virtual
     * @param end 目标进度值
     * @param anim 是否执行动画，默认true
     */
    AnimValue.prototype.setValue = function (end, anim) {
        var _this = this;
        if (anim === void 0) { anim = true; }
        return new Promise(function (resolve, reject) {
            var _a;
            if (!anim) {
                _this.setValueImmediately(end);
                resolve();
                return;
            }
            _this._animResolve = resolve;
            _this._endValue = end;
            _this._isAdd = _this._endValue - _this._curValue > 0;
            (_a = _this._tween) === null || _a === void 0 ? void 0 : _a.stop();
            _this._tween = _this.timeScale ? new Tween_1.Tween(_this, Tween_1.SCALE_TWEEN) : new Tween_1.Tween(_this);
            var duration = _this.animType === AnimType.DURATION ? _this.duration : Math.abs(_this._endValue - _this._curValue) / _this.speed;
            switch (_this.easingType) {
                case EasingType.IN:
                    _this._tween.easing(Tween_1.Easing.Quadratic.In);
                    break;
                case EasingType.OUT:
                    _this._tween.easing(Tween_1.Easing.Quadratic.Out);
                    break;
                case EasingType.IN_OUT:
                    _this._tween.easing(Tween_1.Easing.Quadratic.InOut);
                    break;
                default:
                    break;
            }
            _this._tween.to({ _curValue: _this._endValue }, duration * 1000)
                .onStart(function () {
                _this.onAnimStart();
            })
                .onUpdate(function () {
                _this.onAnimUpdate();
            })
                .onComplete(function () {
                _this.onAnimComplete();
            })
                .start();
        });
    };
    /**
     * 停止动画，并中止之前未结束的Promise
     * @virtual
     */
    AnimValue.prototype.stop = function () {
        if (this._animResolve) {
            this._animResolve = null;
        }
        if (this._tween) {
            this._tween.stop();
            this._tween = null;
        }
    };
    __decorate([
        property
    ], AnimValue.prototype, "_endValue", void 0);
    __decorate([
        property
    ], AnimValue.prototype, "_curValue", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "初始值"
        })
    ], AnimValue.prototype, "initValue", null);
    __decorate([
        property({
            type: cc.Enum(AnimType),
            tooltip: CC_DEV && "数值变化类型\nSPEED：以速度计算变化时长\nDURATION：固定时长"
        })
    ], AnimValue.prototype, "animType", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "每秒数值变化速度",
            visible: function () { return this.animType === AnimType.SPEED; }
        })
    ], AnimValue.prototype, "speed", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "数值变化的总时长",
            visible: function () { return this.animType === AnimType.DURATION; }
        })
    ], AnimValue.prototype, "duration", void 0);
    __decorate([
        property({
            type: cc.Enum(EasingType),
            tooltip: CC_DEV && "变化的缓动类型"
        })
    ], AnimValue.prototype, "easingType", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "变化速度是否受到timeScale的影响"
        })
    ], AnimValue.prototype, "timeScale", void 0);
    AnimValue = __decorate([
        ccclass,
        executeInEditMode,
        menu("Framework/UI组件/AnimValue")
    ], AnimValue);
    return AnimValue;
}(cc.Component));
exports.default = AnimValue;

cc._RF.pop();