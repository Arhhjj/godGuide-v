
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/AnimatorCustomization.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXEFuaW1hdG9yQ3VzdG9taXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBb0U7QUFHOUQsSUFBQSxLQUFrRSxFQUFFLENBQUMsVUFBVSxFQUE3RSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFdEY7O0dBRUc7QUFJSDtJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQStDQztRQTlDRyx5QkFBeUI7UUFFZixpQkFBVyxHQUFZLEtBQUssQ0FBQzs7SUE0QzNDLENBQUM7SUExQ0c7Ozs7OztPQU1HO0lBQ0ksc0NBQU0sR0FBYjtRQUFjLGNBQWtIO2FBQWxILFVBQWtILEVBQWxILHFCQUFrSCxFQUFsSCxJQUFrSDtZQUFsSCx5QkFBa0g7O1FBQzVILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxRQUFRLE9BQWIsSUFBSSxFQUFhLElBQUksRUFBRTtRQUV2QixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLDZDQUFhLEdBQXZCLFVBQXdCLFFBQWdCLEVBQUUsSUFBYTtRQUNuRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxRQUFRLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkQ7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLHlDQUFTLEdBQW5CLFVBQW9CLEtBQWE7UUFDN0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUEzQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs4REFDTjtJQUh0QixxQkFBcUI7UUFIekMsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsMENBQTBDLENBQUM7T0FDNUIscUJBQXFCLENBK0N6QztJQUFELDRCQUFDO0NBL0NELEFBK0NDLENBL0NrRCxzQkFBWSxHQStDOUQ7a0JBL0NvQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW5pbWF0b3JCYXNlLCB7IEFuaW1hdGlvblBsYXllciB9IGZyb20gXCIuL2NvcmUvQW5pbWF0b3JCYXNlXCI7XHJcbmltcG9ydCBBbmltYXRvclN0YXRlTG9naWMgZnJvbSBcIi4vY29yZS9BbmltYXRvclN0YXRlTG9naWNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIHJlcXVpcmVDb21wb25lbnQsIGRpc2FsbG93TXVsdGlwbGUsIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKiogXHJcbiAqIOiHquWumuS5ieWKqOeUu+aOp+WItueahOeKtuaAgeacuue7hOS7tlxyXG4gKi9cclxuQGNjY2xhc3NcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuQG1lbnUoJ0ZyYW1ld29yay9BbmltYXRvci9BbmltYXRvckN1c3RvbWl6YXRpb24nKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRvckN1c3RvbWl6YXRpb24gZXh0ZW5kcyBBbmltYXRvckJhc2Uge1xyXG4gICAgLyoqIOatpOe7hOS7tuW/hemhu+S4u+WKqOiwg+eUqG9uSW5pdOWIneWni+WMliAqL1xyXG4gICAgQHByb3BlcnR5KHsgb3ZlcnJpZGU6IHRydWUsIHZpc2libGU6IGZhbHNlIH0pXHJcbiAgICBwcm90ZWN0ZWQgcGxheU9uU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJi+WKqOWIneWni+WMlueKtuaAgeacuu+8jOWPr+S8oOWFpTAtM+S4quWPguaVsO+8jOexu+Wei+WmguS4i1xyXG4gICAgICogLSBvblN0YXRlQ2hhbmdlQ2FsbCDnirbmgIHliIfmjaLml7bnmoTlm57osINcclxuICAgICAqIC0gc3RhdGVMb2dpY01hcCDlkITkuKrnirbmgIHpgLvovpHmjqfliLZcclxuICAgICAqIC0gYW5pbWF0aW9uUGxheWVyIOiHquWumuS5ieWKqOeUu+aOp+WItlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkluaXQoLi4uYXJnczogQXJyYXk8TWFwPHN0cmluZywgQW5pbWF0b3JTdGF0ZUxvZ2ljPiB8ICgoZnJvbVN0YXRlOiBzdHJpbmcsIHRvU3RhdGU6IHN0cmluZykgPT4gdm9pZCkgfCBBbmltYXRpb25QbGF5ZXI+KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0luaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9oYXNJbml0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0QXJncyguLi5hcmdzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXNzZXRSYXdVcmwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0SnNvbih0aGlzLmFzc2V0UmF3VXJsLmpzb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuWKqOeUu1xyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKiBAcGFyYW0gYW5pbU5hbWUg5Yqo55S75ZCNXHJcbiAgICAgKiBAcGFyYW0gbG9vcCDmmK/lkKblvqrnjq/mkq3mlL5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHBsYXlBbmltYXRpb24oYW5pbU5hbWU6IHN0cmluZywgbG9vcDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25QbGF5ZXIgJiYgYW5pbU5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUGxheWVyLnBsYXlBbmltYXRpb24oYW5pbU5hbWUsIGxvb3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8qeaUvuWKqOeUu+aSreaUvumAn+eOh1xyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5YCN546HXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzY2FsZVRpbWUoc2NhbGU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25QbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUGxheWVyLnNjYWxlVGltZShzY2FsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==