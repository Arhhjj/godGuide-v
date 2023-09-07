
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/core/AnimatorBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXGNvcmVcXEFuaW1hdG9yQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0Q7QUFJaEQsSUFBQSxLQUF3QyxFQUFFLENBQUMsVUFBVSxFQUFuRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxjQUFjLG9CQUFrQixDQUFDO0FBYzVEOztHQUVHO0FBR0g7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUE4TkM7UUE1TmEsaUJBQVcsR0FBaUIsSUFBSSxDQUFDO1FBR2pDLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRXJDLFlBQVk7UUFDRixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQ3BDLFlBQVk7UUFDRixTQUFHLEdBQXVCLElBQUksQ0FBQztRQUV6Qyx1QkFBdUI7UUFDYixvQkFBYyxHQUFvQyxJQUFJLENBQUM7UUFDakUsZUFBZTtRQUNMLHdCQUFrQixHQUFpRCxJQUFJLENBQUM7UUFDbEYsa0JBQWtCO1FBQ1Isc0JBQWdCLEdBQW9CLElBQUksQ0FBQztRQUV6QyxpQkFBVyxHQUFXLENBQUMsQ0FBQzs7SUF3TXRDLENBQUM7SUF0TUcsc0JBQVcsb0NBQVU7UUFEckIsc0JBQXNCO2FBQ3RCLGNBQWtDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDNUQsVUFBc0IsQ0FBUztZQUMzQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BUDJEO0lBVTVELHNCQUFXLHNDQUFZO1FBRHZCLFlBQVk7YUFDWixjQUFvQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsUUFB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UUFBUSxFQUFFO1lBQ2hCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUEzTkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLFdBQVcsRUFBRSxDQUFDO3FEQUN0QjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsQ0FBQztxREFDZDtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsQ0FBQztvREFDcEI7SUFScEIsWUFBWTtRQUZoQyxPQUFPO1FBQ1AsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDO09BQ0QsWUFBWSxDQThOaEM7SUFBRCxtQkFBQztDQTlORCxBQThOQyxDQTlOeUMsRUFBRSxDQUFDLFNBQVMsR0E4TnJEO2tCQTlOb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbmltYXRvckNvbnRyb2xsZXIgZnJvbSBcIi4vQW5pbWF0b3JDb250cm9sbGVyXCI7XHJcbmltcG9ydCBBbmltYXRvclN0YXRlIGZyb20gXCIuL0FuaW1hdG9yU3RhdGVcIjtcclxuaW1wb3J0IEFuaW1hdG9yU3RhdGVMb2dpYyBmcm9tIFwiLi9BbmltYXRvclN0YXRlTG9naWNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGlvbk9yZGVyIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOiHquWumuS5ieaOp+WItuWKqOeUu+aSreaUvueahOaOpeWPo1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25QbGF5ZXIge1xyXG4gICAgLyoqIOiuvue9ruWKqOeUu+aSreaUvue7k+adn+eahOWbnuiwgyAqL1xyXG4gICAgc2V0RmluaXNoZWRDYWxsYmFjayhjYWxsYmFjazogKCkgPT4gdm9pZCwgdGFyZ2V0OiBhbnkpOiB2b2lkO1xyXG4gICAgLyoqIOaSreaUvuWKqOeUuyAqL1xyXG4gICAgcGxheUFuaW1hdGlvbihhbmltTmFtZTogc3RyaW5nLCBsb29wOiBib29sZWFuKTogdm9pZDtcclxuICAgIC8qKiDnvKnmlL7liqjnlLvmkq3mlL7pgJ/njocgKi9cclxuICAgIHNjYWxlVGltZShzY2FsZTogbnVtYmVyKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOeKtuaAgeacuue7hOS7tuWfuuexuyDkvJjlhYjmiafooYznlJ/lkb3lkajmnJ9cclxuICovXHJcbkBjY2NsYXNzXHJcbkBleGVjdXRpb25PcmRlcigtMTAwMClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3JCYXNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkpzb25Bc3NldCwgdG9vbHRpcDogQ0NfREVWICYmICfnirbmgIHmnLpqc29u5paH5Lu2JyB9KVxyXG4gICAgcHJvdGVjdGVkIGFzc2V0UmF3VXJsOiBjYy5Kc29uQXNzZXQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IENDX0RFViAmJiAn5piv5ZCm5Zyoc3RhcnTkuK3oh6rliqjlkK/liqjnirbmgIHmnLonIH0pXHJcbiAgICBwcm90ZWN0ZWQgcGxheU9uU3RhcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IENDX0RFViAmJiAn5piv5ZCm5ZyodXBkYXRl5Lit6Ieq5Yqo6Kem5Y+R54q25oCB5py66YC76L6R5pu05pawJyB9KVxyXG4gICAgcHJvdGVjdGVkIGF1dG9VcGRhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKiDmmK/lkKbliJ3lp4vljJYgKi9cclxuICAgIHByb3RlY3RlZCBfaGFzSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOeKtuaAgeacuuaOp+WItiAqL1xyXG4gICAgcHJvdGVjdGVkIF9hYzogQW5pbWF0b3JDb250cm9sbGVyID0gbnVsbDtcclxuXHJcbiAgICAvKiog5ZCE5Liq54q25oCB6YC76L6R5o6n5Yi277yMa2V55Li654q25oCB5ZCNICovXHJcbiAgICBwcm90ZWN0ZWQgX3N0YXRlTG9naWNNYXA6IE1hcDxzdHJpbmcsIEFuaW1hdG9yU3RhdGVMb2dpYz4gPSBudWxsO1xyXG4gICAgLyoqIOeKtuaAgeWIh+aNouaXtueahOWbnuiwgyAqL1xyXG4gICAgcHJvdGVjdGVkIF9vblN0YXRlQ2hhbmdlQ2FsbDogKGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcpID0+IHZvaWQgPSBudWxsO1xyXG4gICAgLyoqIOiHquWumuS5ieeahOWKqOeUu+aSreaUvuaOp+WItuWZqCAqL1xyXG4gICAgcHJvdGVjdGVkIF9hbmltYXRpb25QbGF5ZXI6IEFuaW1hdGlvblBsYXllciA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9leHRyYU11bHRpOiBudW1iZXIgPSAxO1xyXG4gICAgLyoqIOe7n+S4gOaOp+WItuaJgOacieWKqOeUu+aSreaUvumAn+W6pueahOWPguaVsCAqL1xyXG4gICAgcHVibGljIGdldCBleHRyYU11bHRpKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9leHRyYU11bHRpOyB9XHJcbiAgICBwdWJsaWMgc2V0IGV4dHJhTXVsdGkodjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4dHJhTXVsdGkgPT09IHYpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9leHRyYU11bHRpID0gdjtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlTcGVlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvZPliY3nirbmgIHlkI0gKi9cclxuICAgIHB1YmxpYyBnZXQgY3VyU3RhdGVOYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9hYy5jdXJTdGF0ZS5uYW1lOyB9XHJcbiAgICAvKiog5b2T5YmN5Yqo55S75ZCNICovXHJcbiAgICBwdWJsaWMgZ2V0IGN1clN0YXRlTW90aW9uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9hYy5jdXJTdGF0ZS5tb3Rpb247IH1cclxuICAgIC8qKiDlvZPliY3liqjnlLvmmK/lkKbmkq3mlL7lrozmr5UgKi9cclxuICAgIHB1YmxpYyBnZXQgYW5pbUNvbXBsZXRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWMuYW5pbUNvbXBsZXRlOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYvliqjliJ3lp4vljJbnirbmgIHmnLrvvIzlj6/kvKDlhaUwLTPkuKrlj4LmlbDvvIznsbvlnovlpoLkuItcclxuICAgICAqIC0gb25TdGF0ZUNoYW5nZUNhbGwg54q25oCB5YiH5o2i5pe255qE5Zue6LCDXHJcbiAgICAgKiAtIHN0YXRlTG9naWNNYXAg5ZCE5Liq54q25oCB6YC76L6R5o6n5Yi2XHJcbiAgICAgKiAtIGFuaW1hdGlvblBsYXllciDoh6rlrprkuYnliqjnlLvmjqfliLZcclxuICAgICAqIEB2aXJ0dWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkluaXQoLi4uYXJnczogQXJyYXk8TWFwPHN0cmluZywgQW5pbWF0b3JTdGF0ZUxvZ2ljPiB8ICgoZnJvbVN0YXRlOiBzdHJpbmcsIHRvU3RhdGU6IHN0cmluZykgPT4gdm9pZCkgfCBBbmltYXRpb25QbGF5ZXI+KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpITnkIbliJ3lp4vljJblj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXRBcmdzKC4uLmFyZ3M6IEFycmF5PE1hcDxzdHJpbmcsIEFuaW1hdG9yU3RhdGVMb2dpYz4gfCAoKGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcpID0+IHZvaWQpIHwgQW5pbWF0aW9uUGxheWVyPikge1xyXG4gICAgICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYXJnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uU3RhdGVDaGFuZ2VDYWxsID0gYXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgTWFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGVMb2dpY01hcCA9IGFyZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUGxheWVyID0gYXJnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvblBsYXllci5zZXRGaW5pc2hlZENhbGxiYWNrKHRoaXMub25BbmltRmluaXNoZWQsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDliqjnlLvmkq3mlL7pgJ/luqZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQbGF5U3BlZWQoKSB7XHJcbiAgICAgICAgLy8g5re35ZCI5b2T5YmN5Yqo55S75pKt5pS+6YCf5bqmXHJcbiAgICAgICAgbGV0IHBsYXlTcGVlZCA9IHRoaXMuX2FjLmN1clN0YXRlLnNwZWVkICogdGhpcy5leHRyYU11bHRpO1xyXG4gICAgICAgIGlmICh0aGlzLl9hYy5jdXJTdGF0ZS5tdWx0aSkge1xyXG4gICAgICAgICAgICBwbGF5U3BlZWQgKj0gdGhpcy5fYWMucGFyYW1zLmdldE51bWJlcih0aGlzLl9hYy5jdXJTdGF0ZS5tdWx0aSkgfHwgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2FsZVRpbWUocGxheVNwZWVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUFuaW1hdG9yKCkge1xyXG4gICAgICAgIC8vIOabtOaWsOWKqOeUu+aSreaUvumAn+W6plxyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheVNwZWVkKCk7XHJcblxyXG4gICAgICAgIC8vIOabtOaWsEFuaW1hdG9yU3RhdGVMb2dpY1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZUxvZ2ljTWFwKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJMb2dpYyA9IHRoaXMuX3N0YXRlTG9naWNNYXAuZ2V0KHRoaXMuX2FjLmN1clN0YXRlLm5hbWUpO1xyXG4gICAgICAgICAgICBjdXJMb2dpYyAmJiBjdXJMb2dpYy5vblVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5pu05paw54q25oCB5py66YC76L6RXHJcbiAgICAgICAgdGhpcy5fYWMudXBkYXRlQW5pbWF0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9oYXNJbml0ICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFuaW1hdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omL5Yqo6LCD55So5pu05pawXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtYW51YWxVcGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0luaXQgJiYgIXRoaXMuYXV0b1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFuaW1hdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kej5p6Q54q25oCB5py6anNvbuaWh+S7tlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdEpzb24oanNvbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fYWMgPSBuZXcgQW5pbWF0b3JDb250cm9sbGVyKHRoaXMsIGpzb24pO1xyXG4gICAgICAgIC8vIOaJp+ihjOm7mOiupOeKtuaAgVxyXG4gICAgICAgIHRoaXMuX2FjLmNoYW5nZVN0YXRlKGpzb24uZGVmYXVsdFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKqOeUu+e7k+adn+eahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25BbmltRmluaXNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fYWMub25BbmltYXRpb25Db21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5Yqo55S7XHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICogQHBhcmFtIGFuaW1OYW1lIOWKqOeUu+WQjVxyXG4gICAgICogQHBhcmFtIGxvb3Ag5piv5ZCm5b6q546v5pKt5pS+XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwbGF5QW5pbWF0aW9uKGFuaW1OYW1lOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4pIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8qeaUvuWKqOeUu+aSreaUvumAn+eOh1xyXG4gICAgICogQHZpcnR1YWxcclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7lgI3njodcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNjYWxlVGltZShzY2FsZTogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICog54q25oCB5YiH5o2i5pe255qE6YC76L6R77yI54q25oCB5py65YaF6YOo5pa55rOV77yM5LiN6IO955Sx5aSW6YOo55u05o6l6LCD55So77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblN0YXRlQ2hhbmdlKGZyb21TdGF0ZTogQW5pbWF0b3JTdGF0ZSwgdG9TdGF0ZTogQW5pbWF0b3JTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbih0b1N0YXRlLm1vdGlvbiwgdG9TdGF0ZS5sb29wKTtcclxuXHJcbiAgICAgICAgbGV0IGZyb21TdGF0ZU5hbWUgPSBmcm9tU3RhdGUgPyBmcm9tU3RhdGUubmFtZSA6ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc3RhdGVMb2dpY01hcCkge1xyXG4gICAgICAgICAgICBsZXQgZnJvbUxvZ2ljID0gdGhpcy5fc3RhdGVMb2dpY01hcC5nZXQoZnJvbVN0YXRlTmFtZSk7XHJcbiAgICAgICAgICAgIGZyb21Mb2dpYyAmJiBmcm9tTG9naWMub25FeGl0KCk7XHJcbiAgICAgICAgICAgIGxldCB0b0xvZ2ljID0gdGhpcy5fc3RhdGVMb2dpY01hcC5nZXQodG9TdGF0ZS5uYW1lKTtcclxuICAgICAgICAgICAgdG9Mb2dpYyAmJiB0b0xvZ2ljLm9uRW50cnkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29uU3RhdGVDaGFuZ2VDYWxsICYmIHRoaXMuX29uU3RhdGVDaGFuZ2VDYWxsKGZyb21TdGF0ZU5hbWUsIHRvU3RhdGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5ib29sZWFu57G75Z6L5Y+C5pWw55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRCb29sKGtleTogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2FjLnBhcmFtcy5zZXRCb29sKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WYm9vbGVhbuexu+Wei+WPguaVsOeahOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Qm9vbChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hYy5wYXJhbXMuZ2V0Qm9vbChrZXkpICE9PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572ubnVtYmVy57G75Z6L5Y+C5pWw55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROdW1iZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hYy5wYXJhbXMuc2V0TnVtYmVyKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbnVtYmVy57G75Z6L5Y+C5pWw55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROdW1iZXIoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hYy5wYXJhbXMuZ2V0TnVtYmVyKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva50cmlnZ2Vy57G75Z6L5Y+C5pWw55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUcmlnZ2VyKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fYWMucGFyYW1zLnNldFRyaWdnZXIoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjee9rnRyaWdnZXLnsbvlnovlj4LmlbDnmoTlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0VHJpZ2dlcihrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FjLnBhcmFtcy5yZXNldFRyaWdnZXIoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rmF1dG9UcmlnZ2Vy57G75Z6L5Y+C5pWw55qE5YC877yIYXV0b1RyaWdnZXLnsbvlnovlj4LmlbDkuI3pnIDopoHkuLvliqhyZXNldO+8jOavj+asoeeKtuaAgeacuuabtOaWsOe7k+adn+WQjuS8muiHquWKqHJlc2V077yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdXRvVHJpZ2dlcihrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FjLnBhcmFtcy5hdXRvVHJpZ2dlcihrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5peg6KeG5p2h5Lu255u05o6l6Lez6L2s54q25oCB77yM5aaC5p6c5b2T5YmN5bey5aSE5LqO5q2k54q25oCB5YiZ6YeN572u54q25oCBXHJcbiAgICAgKiBAcGFyYW0g54q25oCB5ZCNXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5KHN0YXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNJbml0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWMucGxheShzdGF0ZU5hbWUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==