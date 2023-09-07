
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValue.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYW5pbVZhbHVlXFxBbmltVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWlFO0FBRTNELElBQUEsS0FBaUQsRUFBRSxDQUFDLFVBQVUsRUFBNUQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsaUJBQWlCLHVCQUFrQixDQUFDO0FBRXJFOztHQUVHO0FBQ0gsSUFBSyxRQUtKO0FBTEQsV0FBSyxRQUFRO0lBQ1QsZ0JBQWdCO0lBQ2hCLHlDQUFLLENBQUE7SUFDTCxXQUFXO0lBQ1gsK0NBQVEsQ0FBQTtBQUNaLENBQUMsRUFMSSxRQUFRLEtBQVIsUUFBUSxRQUtaO0FBRUQ7O0dBRUc7QUFDSCxJQUFLLFVBS0o7QUFMRCxXQUFLLFVBQVU7SUFDWCwyQ0FBSSxDQUFBO0lBQ0osdUNBQUUsQ0FBQTtJQUNGLHlDQUFHLENBQUE7SUFDSCwrQ0FBTSxDQUFBO0FBQ1YsQ0FBQyxFQUxJLFVBQVUsS0FBVixVQUFVLFFBS2Q7QUFFRDs7R0FFRztBQUlIO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBMEpDO1FBekpxQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFnQmpDLGNBQVEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDO1FBTXBDLFdBQUssR0FBVyxDQUFDLENBQUM7UUFNbEIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQU1yQixnQkFBVSxHQUFlLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFLekMsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUkxQixZQUFNLEdBQWdCLElBQUksQ0FBQztRQUMzQixZQUFNLEdBQVksS0FBSyxDQUFDOztJQTRHcEMsQ0FBQztJQW5KRyxzQkFBWSxnQ0FBUzthQUFyQixjQUFrQyxPQUFPLElBQUksQ0FBQyxTQUFTLENB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c291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFYXNpbmcsIFNDQUxFX1RXRUVOLCBUd2VlbiB9IGZyb20gXCIuLi8uLi8uLi91dGlsL1R3ZWVuXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCBleGVjdXRlSW5FZGl0TW9kZSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDmlbDlgLzlj5jljJbnsbvlnotcclxuICovXHJcbmVudW0gQW5pbVR5cGUge1xyXG4gICAgLyoqIOS7pemAn+W6puiuoeeul+WPmOWMluaXtumVvyAqL1xyXG4gICAgU1BFRUQsXHJcbiAgICAvKiog5Zu65a6a5pe26ZW/ICovXHJcbiAgICBEVVJBVElPTixcclxufVxyXG5cclxuLyoqXHJcbiAqIOWbuuWumuaXtumVv+aXtueahOe8k+WKqOexu+Wei1xyXG4gKi9cclxuZW51bSBFYXNpbmdUeXBlIHtcclxuICAgIE5PTkUsXHJcbiAgICBJTixcclxuICAgIE9VVCxcclxuICAgIElOX09VVCxcclxufVxyXG5cclxuLyoqXHJcbiAqIOaVsOWAvOa4kOWPmOe7hOS7tuWfuuexu++8jOWPr+agueaNruatpOe7hOS7tuaLk+WxleWQhOenjeaVsOWAvOa4kOWPmOeahOe7hOS7tlxyXG4gKi9cclxuQGNjY2xhc3NcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbkBtZW51KFwiRnJhbWV3b3JrL1VJ57uE5Lu2L0FuaW1WYWx1ZVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltVmFsdWUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5IHByaXZhdGUgX2VuZFZhbHVlOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5IHByaXZhdGUgX2N1clZhbHVlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5Yid5aeL5YC8XCJcclxuICAgIH0pXHJcbiAgICBwcml2YXRlIGdldCBpbml0VmFsdWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2VuZFZhbHVlOyB9XHJcbiAgICBwcml2YXRlIHNldCBpbml0VmFsdWUodjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fY3VyVmFsdWUgPSB2O1xyXG4gICAgICAgIHRoaXMuX2VuZFZhbHVlID0gdjtcclxuICAgICAgICB0aGlzLnNldFZhbHVlSW1tZWRpYXRlbHkodGhpcy5fZW5kVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bShBbmltVHlwZSksXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5pWw5YC85Y+Y5YyW57G75Z6LXFxuU1BFRUTvvJrku6XpgJ/luqborqHnrpflj5jljJbml7bplb9cXG5EVVJBVElPTu+8muWbuuWumuaXtumVv1wiXHJcbiAgICB9KVxyXG4gICAgcHVibGljIGFuaW1UeXBlOiBBbmltVHlwZSA9IEFuaW1UeXBlLlNQRUVEO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5q+P56eS5pWw5YC85Y+Y5YyW6YCf5bqmXCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMuYW5pbVR5cGUgPT09IEFuaW1UeXBlLlNQRUVEOyB9XHJcbiAgICB9KVxyXG4gICAgcHVibGljIHNwZWVkOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5pWw5YC85Y+Y5YyW55qE5oC75pe26ZW/XCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMuYW5pbVR5cGUgPT09IEFuaW1UeXBlLkRVUkFUSU9OOyB9XHJcbiAgICB9KVxyXG4gICAgcHVibGljIGR1cmF0aW9uOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bShFYXNpbmdUeXBlKSxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgXCLlj5jljJbnmoTnvJPliqjnsbvlnotcIlxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBlYXNpbmdUeXBlOiBFYXNpbmdUeXBlID0gRWFzaW5nVHlwZS5OT05FO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5Y+Y5YyW6YCf5bqm5piv5ZCm5Y+X5YiwdGltZVNjYWxl55qE5b2x5ZONXCJcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgdGltZVNjYWxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIOe8k+WtmOWKqOeUu+eahHJlc29sdmUgKi9cclxuICAgIHByaXZhdGUgX2FuaW1SZXNvbHZlOiAodmFsdWU6IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPikgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX3R3ZWVuOiBUd2Vlbjx0aGlzPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pc0FkZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOW9k+WJjeaYr+WQpuS4uuWinumHj+WPmOWMliAqL1xyXG4gICAgcHVibGljIGdldCBpc0FkZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzQWRkOyB9XHJcblxyXG4gICAgLyoqIOWPmOWMlueahOebruagh+WAvCAqL1xyXG4gICAgcHVibGljIGdldCBlbmRWYWx1ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZW5kVmFsdWU7IH1cclxuICAgIC8qKiDlj5jljJbov4fnqIvnmoTlvZPliY3lgLwgKi9cclxuICAgIHB1YmxpYyBnZXQgY3VyVmFsdWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2N1clZhbHVlOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25BbmltU3RhcnQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25BbmltVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHZpcnR1YWxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQW5pbUNvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9hbmltUmVzb2x2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltUmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltUmVzb2x2ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl90d2Vlbikge1xyXG4gICAgICAgICAgICB0aGlzLl90d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3ZWVuID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnq4vljbPorr7nva52YWx1Ze+8jOS4jeaJp+ihjOWKqOeUu1xyXG4gICAgICogQHZpcnR1YWxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldFZhbHVlSW1tZWRpYXRlbHkoZW5kOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0FkZCA9IHRoaXMuX2VuZFZhbHVlIC0gdGhpcy5fY3VyVmFsdWUgPiAwO1xyXG4gICAgICAgIHRoaXMuX2VuZFZhbHVlID0gZW5kO1xyXG4gICAgICAgIHRoaXMuX2N1clZhbHVlID0gZW5kO1xyXG4gICAgICAgIHRoaXMub25BbmltU3RhcnQoKTtcclxuICAgICAgICB0aGlzLm9uQW5pbVVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMub25BbmltQ29tcGxldGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui/m+W6puWAvOOAgui/m+W6puWKqOeUu+e7k+adn+WQjnJlc29sdmVcclxuICAgICAqIEB2aXJ0dWFsXHJcbiAgICAgKiBAcGFyYW0gZW5kIOebruagh+i/m+W6puWAvFxyXG4gICAgICogQHBhcmFtIGFuaW0g5piv5ZCm5omn6KGM5Yqo55S777yM6buY6K6kdHJ1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VmFsdWUoZW5kOiBudW1iZXIsIGFuaW06IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFhbmltKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlSW1tZWRpYXRlbHkoZW5kKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fYW5pbVJlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRWYWx1ZSA9IGVuZDtcclxuICAgICAgICAgICAgdGhpcy5faXNBZGQgPSB0aGlzLl9lbmRWYWx1ZSAtIHRoaXMuX2N1clZhbHVlID4gMDtcclxuICAgICAgICAgICAgdGhpcy5fdHdlZW4/LnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5fdHdlZW4gPSB0aGlzLnRpbWVTY2FsZSA/IG5ldyBUd2Vlbih0aGlzLCBTQ0FMRV9UV0VFTikgOiBuZXcgVHdlZW4odGhpcyk7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IHRoaXMuYW5pbVR5cGUgPT09IEFuaW1UeXBlLkRVUkFUSU9OID8gdGhpcy5kdXJhdGlvbiA6IE1hdGguYWJzKHRoaXMuX2VuZFZhbHVlIC0gdGhpcy5fY3VyVmFsdWUpIC8gdGhpcy5zcGVlZDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmVhc2luZ1R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRWFzaW5nVHlwZS5JTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90d2Vlbi5lYXNpbmcoRWFzaW5nLlF1YWRyYXRpYy5Jbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVhc2luZ1R5cGUuT1VUOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3R3ZWVuLmVhc2luZyhFYXNpbmcuUXVhZHJhdGljLk91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVhc2luZ1R5cGUuSU5fT1VUOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3R3ZWVuLmVhc2luZyhFYXNpbmcuUXVhZHJhdGljLkluT3V0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fdHdlZW4udG8oeyBfY3VyVmFsdWU6IHRoaXMuX2VuZFZhbHVlIH0sIGR1cmF0aW9uICogMTAwMClcclxuICAgICAgICAgICAgICAgIC5vblN0YXJ0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQW5pbVN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQW5pbVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQW5pbUNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLliqjnlLvvvIzlubbkuK3mraLkuYvliY3mnKrnu5PmnZ/nmoRQcm9taXNlXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYW5pbVJlc29sdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbVJlc29sdmUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdHdlZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fdHdlZW4uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLl90d2VlbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==