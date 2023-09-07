
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/AnimatorDragonBones.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXEFuaW1hdG9yRHJhZ29uQm9uZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQW9FO0FBRzlELElBQUEsS0FBa0UsRUFBRSxDQUFDLFVBQVUsRUFBN0UsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBRXRGOztHQUVHO0FBS0g7SUFBaUQsdUNBQVk7SUFBN0Q7UUFBQSxxRUEyREM7UUExREcsb0JBQW9CO1FBQ1osa0JBQVksR0FBZ0MsSUFBSSxDQUFDOztJQXlEN0QsQ0FBQztJQXZEYSxtQ0FBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxvQ0FBTSxHQUFiO1FBQWMsY0FBa0g7YUFBbEgsVUFBa0gsRUFBbEgscUJBQWtILEVBQWxILElBQWtIO1lBQWxILHlCQUFrSDs7UUFDNUgsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsSUFBSSxDQUFDLFFBQVEsT0FBYixJQUFJLEVBQWEsSUFBSSxFQUFFO1FBRXZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWhHLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sMkNBQWEsR0FBdkIsVUFBd0IsUUFBZ0IsRUFBRSxJQUFhO1FBQ25ELFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyx1Q0FBUyxHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBMURnQixtQkFBbUI7UUFKdkMsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1FBQzdDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQztPQUMxQixtQkFBbUIsQ0EyRHZDO0lBQUQsMEJBQUM7Q0EzREQsQUEyREMsQ0EzRGdELHNCQUFZLEdBMkQ1RDtrQkEzRG9CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbmltYXRvckJhc2UsIHsgQW5pbWF0aW9uUGxheWVyIH0gZnJvbSBcIi4vY29yZS9BbmltYXRvckJhc2VcIjtcclxuaW1wb3J0IEFuaW1hdG9yU3RhdGVMb2dpYyBmcm9tIFwiLi9jb3JlL0FuaW1hdG9yU3RhdGVMb2dpY1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgcmVxdWlyZUNvbXBvbmVudCwgZGlzYWxsb3dNdWx0aXBsZSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKiBcclxuICogRHJhZ29uQm9uZXPnirbmgIHmnLrnu4Tku7ZcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkByZXF1aXJlQ29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuQG1lbnUoJ0ZyYW1ld29yay9BbmltYXRvci9BbmltYXRvckRyYWdvbkJvbmVzJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3JEcmFnb25Cb25lcyBleHRlbmRzIEFuaW1hdG9yQmFzZSB7XHJcbiAgICAvKiogRHJhZ29uQm9uZXPnu4Tku7YgKi9cclxuICAgIHByaXZhdGUgX2RyYWdvbkJvbmVzOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheU9uU3RhcnQgfHwgdGhpcy5faGFzSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hhc0luaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9kcmFnb25Cb25lcyA9IHRoaXMuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XHJcbiAgICAgICAgdGhpcy5fZHJhZ29uQm9uZXMuYWRkRXZlbnRMaXN0ZW5lcihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgdGhpcy5vbkFuaW1GaW5pc2hlZCwgdGhpcyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFzc2V0UmF3VXJsICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEpzb24odGhpcy5hc3NldFJhd1VybC5qc29uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYvliqjliJ3lp4vljJbnirbmgIHmnLrvvIzlj6/kvKDlhaUwLTPkuKrlj4LmlbDvvIznsbvlnovlpoLkuItcclxuICAgICAqIC0gb25TdGF0ZUNoYW5nZUNhbGwg54q25oCB5YiH5o2i5pe255qE5Zue6LCDXHJcbiAgICAgKiAtIHN0YXRlTG9naWNNYXAg5ZCE5Liq54q25oCB6YC76L6R5o6n5Yi2XHJcbiAgICAgKiAtIGFuaW1hdGlvblBsYXllciDoh6rlrprkuYnliqjnlLvmjqfliLZcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Jbml0KC4uLmFyZ3M6IEFycmF5PE1hcDxzdHJpbmcsIEFuaW1hdG9yU3RhdGVMb2dpYz4gfCAoKGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcpID0+IHZvaWQpIHwgQW5pbWF0aW9uUGxheWVyPikge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlPblN0YXJ0IHx8IHRoaXMuX2hhc0luaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9oYXNJbml0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0QXJncyguLi5hcmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhZ29uQm9uZXMgPSB0aGlzLmdldENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpO1xyXG4gICAgICAgIHRoaXMuX2RyYWdvbkJvbmVzLmFkZEV2ZW50TGlzdGVuZXIoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUsIHRoaXMub25BbmltRmluaXNoZWQsIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hc3NldFJhd1VybCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRKc29uKHRoaXMuYXNzZXRSYXdVcmwuanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5Yqo55S7XHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqIEBwYXJhbSBhbmltTmFtZSDliqjnlLvlkI1cclxuICAgICAqIEBwYXJhbSBsb29wIOaYr+WQpuW+queOr+aSreaUvlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcGxheUFuaW1hdGlvbihhbmltTmFtZTogc3RyaW5nLCBsb29wOiBib29sZWFuKSB7XHJcbiAgICAgICAgYW5pbU5hbWUgJiYgdGhpcy5fZHJhZ29uQm9uZXMucGxheUFuaW1hdGlvbihhbmltTmFtZSwgbG9vcCA/IDAgOiAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvKnmlL7liqjnlLvmkq3mlL7pgJ/njodcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuWAjeeOh1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2NhbGVUaW1lKHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9kcmFnb25Cb25lcy50aW1lU2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxufVxyXG4iXX0=