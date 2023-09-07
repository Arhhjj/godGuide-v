
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/AnimatorAnimation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ddcbcHQdPFOfY+mAxuSRJ7E', 'AnimatorAnimation');
// scripts/animator/AnimatorAnimation.ts

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
 * Cocos Animation状态机组件
 */
var AnimatorAnimation = /** @class */ (function (_super) {
    __extends(AnimatorAnimation, _super);
    function AnimatorAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Animation组件 */
        _this._animation = null;
        /** 当前的动画实例 */
        _this._animState = null;
        /** 记录初始的wrapmode */
        _this._wrapModeMap = new Map();
        return _this;
    }
    AnimatorAnimation.prototype.start = function () {
        if (!this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this._animation = this.getComponent(cc.Animation);
        this._animation.on(cc.Animation.EventType.FINISHED, this.onAnimFinished, this);
        this._animation.on(cc.Animation.EventType.LASTFRAME, this.onAnimFinished, this);
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
    AnimatorAnimation.prototype.onInit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this.initArgs.apply(this, args);
        this._animation = this.getComponent(cc.Animation);
        this._animation.on(cc.Animation.EventType.FINISHED, this.onAnimFinished, this);
        this._animation.on(cc.Animation.EventType.LASTFRAME, this.onAnimFinished, this);
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
    AnimatorAnimation.prototype.playAnimation = function (animName, loop) {
        if (!animName) {
            return;
        }
        this._animState = this._animation.play(animName);
        if (!this._animState) {
            return;
        }
        if (!this._wrapModeMap.has(this._animState)) {
            this._wrapModeMap.set(this._animState, this._animState.wrapMode);
        }
        this._animState.wrapMode = loop ? cc.WrapMode.Loop : this._wrapModeMap.get(this._animState);
    };
    /**
     * 缩放动画播放速率
     * @override
     * @param scale 缩放倍率
     */
    AnimatorAnimation.prototype.scaleTime = function (scale) {
        if (this._animState) {
            this._animState.speed = scale;
        }
    };
    AnimatorAnimation = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(cc.Animation),
        menu('Framework/Animator/AnimatorAnimation')
    ], AnimatorAnimation);
    return AnimatorAnimation;
}(AnimatorBase_1.default));
exports.default = AnimatorAnimation;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXEFuaW1hdG9yQW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFvRTtBQUc5RCxJQUFBLEtBQWtFLEVBQUUsQ0FBQyxVQUFVLEVBQTdFLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUV0Rjs7R0FFRztBQUtIO0lBQStDLHFDQUFZO0lBQTNEO1FBQUEscUVBOEVDO1FBN0VHLGtCQUFrQjtRQUNWLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUN4QyxjQUFjO1FBQ04sZ0JBQVUsR0FBc0IsSUFBSSxDQUFDO1FBQzdDLG9CQUFvQjtRQUNaLGtCQUFZLEdBQXdDLElBQUksR0FBRyxFQUFFLENBQUM7O0lBd0UxRSxDQUFDO0lBdEVhLGlDQUFLLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3BDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEYsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksa0NBQU0sR0FBYjtRQUFjLGNBQWtIO2FBQWxILFVBQWtILEVBQWxILHFCQUFrSCxFQUFsSCxJQUFrSDtZQUFsSCx5QkFBa0g7O1FBQzVILElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25DLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxRQUFRLE9BQWIsSUFBSSxFQUFhLElBQUksRUFBRTtRQUV2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWhGLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08seUNBQWEsR0FBdkIsVUFBd0IsUUFBZ0IsRUFBRSxJQUFhO1FBQ25ELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRDs7OztPQUlHO0lBQ08scUNBQVMsR0FBbkIsVUFBb0IsS0FBYTtRQUM3QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQTdFZ0IsaUJBQWlCO1FBSnJDLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUM5QixJQUFJLENBQUMsc0NBQXNDLENBQUM7T0FDeEIsaUJBQWlCLENBOEVyQztJQUFELHdCQUFDO0NBOUVELEFBOEVDLENBOUU4QyxzQkFBWSxHQThFMUQ7a0JBOUVvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW5pbWF0b3JCYXNlLCB7IEFuaW1hdGlvblBsYXllciB9IGZyb20gXCIuL2NvcmUvQW5pbWF0b3JCYXNlXCI7XHJcbmltcG9ydCBBbmltYXRvclN0YXRlTG9naWMgZnJvbSBcIi4vY29yZS9BbmltYXRvclN0YXRlTG9naWNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIHJlcXVpcmVDb21wb25lbnQsIGRpc2FsbG93TXVsdGlwbGUsIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKiogXHJcbiAqIENvY29zIEFuaW1hdGlvbueKtuaAgeacuue7hOS7tlxyXG4gKi9cclxuQGNjY2xhc3NcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuQW5pbWF0aW9uKVxyXG5AbWVudSgnRnJhbWV3b3JrL0FuaW1hdG9yL0FuaW1hdG9yQW5pbWF0aW9uJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3JBbmltYXRpb24gZXh0ZW5kcyBBbmltYXRvckJhc2Uge1xyXG4gICAgLyoqIEFuaW1hdGlvbue7hOS7tiAqL1xyXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xyXG4gICAgLyoqIOW9k+WJjeeahOWKqOeUu+WunuS+iyAqL1xyXG4gICAgcHJpdmF0ZSBfYW5pbVN0YXRlOiBjYy5BbmltYXRpb25TdGF0ZSA9IG51bGw7XHJcbiAgICAvKiog6K6w5b2V5Yid5aeL55qEd3JhcG1vZGUgKi9cclxuICAgIHByaXZhdGUgX3dyYXBNb2RlTWFwOiBNYXA8Y2MuQW5pbWF0aW9uU3RhdGUsIGNjLldyYXBNb2RlPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlPblN0YXJ0IHx8IHRoaXMuX2hhc0luaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9oYXNJbml0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb24ub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgdGhpcy5vbkFuaW1GaW5pc2hlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuTEFTVEZSQU1FLCB0aGlzLm9uQW5pbUZpbmlzaGVkLCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXNzZXRSYXdVcmwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0SnNvbih0aGlzLmFzc2V0UmF3VXJsLmpzb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJi+WKqOWIneWni+WMlueKtuaAgeacuu+8jOWPr+S8oOWFpTAtM+S4quWPguaVsO+8jOexu+Wei+WmguS4i1xyXG4gICAgICogLSBvblN0YXRlQ2hhbmdlQ2FsbCDnirbmgIHliIfmjaLml7bnmoTlm57osINcclxuICAgICAqIC0gc3RhdGVMb2dpY01hcCDlkITkuKrnirbmgIHpgLvovpHmjqfliLZcclxuICAgICAqIC0gYW5pbWF0aW9uUGxheWVyIOiHquWumuS5ieWKqOeUu+aOp+WItlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkluaXQoLi4uYXJnczogQXJyYXk8TWFwPHN0cmluZywgQW5pbWF0b3JTdGF0ZUxvZ2ljPiB8ICgoZnJvbVN0YXRlOiBzdHJpbmcsIHRvU3RhdGU6IHN0cmluZykgPT4gdm9pZCkgfCBBbmltYXRpb25QbGF5ZXI+KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheU9uU3RhcnQgfHwgdGhpcy5faGFzSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hhc0luaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRBcmdzKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCB0aGlzLm9uQW5pbUZpbmlzaGVkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb24ub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5MQVNURlJBTUUsIHRoaXMub25BbmltRmluaXNoZWQsIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hc3NldFJhd1VybCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRKc29uKHRoaXMuYXNzZXRSYXdVcmwuanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5Yqo55S7XHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqIEBwYXJhbSBhbmltTmFtZSDliqjnlLvlkI1cclxuICAgICAqIEBwYXJhbSBsb29wIOaYr+WQpuW+queOr+aSreaUvlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcGxheUFuaW1hdGlvbihhbmltTmFtZTogc3RyaW5nLCBsb29wOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCFhbmltTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hbmltU3RhdGUgPSB0aGlzLl9hbmltYXRpb24ucGxheShhbmltTmFtZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hbmltU3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX3dyYXBNb2RlTWFwLmhhcyh0aGlzLl9hbmltU3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dyYXBNb2RlTWFwLnNldCh0aGlzLl9hbmltU3RhdGUsIHRoaXMuX2FuaW1TdGF0ZS53cmFwTW9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FuaW1TdGF0ZS53cmFwTW9kZSA9IGxvb3AgPyBjYy5XcmFwTW9kZS5Mb29wIDogdGhpcy5fd3JhcE1vZGVNYXAuZ2V0KHRoaXMuX2FuaW1TdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvKnmlL7liqjnlLvmkq3mlL7pgJ/njodcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuWAjeeOh1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2NhbGVUaW1lKHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fYW5pbVN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1TdGF0ZS5zcGVlZCA9IHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=