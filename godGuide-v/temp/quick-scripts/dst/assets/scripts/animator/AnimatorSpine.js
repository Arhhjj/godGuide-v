
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/AnimatorSpine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f224eiAodM8YIcjrZ0B9zN', 'AnimatorSpine');
// scripts/animator/AnimatorSpine.ts

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
 * Spine状态机组件（主状态机），trackIndex为0
 */
var AnimatorSpine = /** @class */ (function (_super) {
    __extends(AnimatorSpine, _super);
    function AnimatorSpine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** spine组件 */
        _this._spine = null;
        /** 动画完成的回调 */
        _this._completeListenerMap = new Map();
        /** 次状态机注册的回调 */
        _this._secondaryListenerMap = new Map();
        return _this;
    }
    AnimatorSpine.prototype.start = function () {
        if (!this.playOnStart || this._hasInit) {
            return;
        }
        this._hasInit = true;
        this._spine = this.getComponent(sp.Skeleton);
        this._spine.setCompleteListener(this.onSpineComplete.bind(this));
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
    AnimatorSpine.prototype.onInit = function () {
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
        this._spine.setCompleteListener(this.onSpineComplete.bind(this));
        if (this.assetRawUrl !== null) {
            this.initJson(this.assetRawUrl.json);
        }
    };
    AnimatorSpine.prototype.onSpineComplete = function (entry) {
        entry.trackIndex === 0 && this.onAnimFinished();
        this._completeListenerMap.forEach(function (target, cb) { target ? cb.call(target, entry) : cb(entry); });
        this._secondaryListenerMap.forEach(function (target, cb) { entry.trackIndex === target.trackIndex && cb.call(target, entry); });
    };
    /**
     * 播放动画
     * @override
     * @param animName 动画名
     * @param loop 是否循环播放
     */
    AnimatorSpine.prototype.playAnimation = function (animName, loop) {
        if (animName) {
            this._spine.setAnimation(0, animName, loop);
        }
        else {
            this._spine.clearTrack(0);
        }
    };
    /**
     * 缩放动画播放速率
     * @override
     * @param scale 缩放倍率
     */
    AnimatorSpine.prototype.scaleTime = function (scale) {
        this._spine.timeScale = scale;
    };
    /**
     * 注册次状态机动画结束的回调（状态机内部方法，不能由外部直接调用）
     */
    AnimatorSpine.prototype.addSecondaryListener = function (cb, target) {
        this._secondaryListenerMap.set(cb, target);
    };
    /**
     * 注册动画完成时的监听
     * @param cb 回调
     * @param target 调用回调的this对象
     */
    AnimatorSpine.prototype.addCompleteListener = function (cb, target) {
        if (target === void 0) { target = null; }
        if (this._completeListenerMap.has(cb)) {
            return;
        }
        this._completeListenerMap.set(cb, target);
    };
    /**
     * 注销动画完成的监听
     * @param cb 回调
     */
    AnimatorSpine.prototype.removeCompleteListener = function (cb) {
        this._completeListenerMap.delete(cb);
    };
    /**
     * 清空动画完成的监听
     */
    AnimatorSpine.prototype.clearCompleteListener = function () {
        this._completeListenerMap.clear;
    };
    AnimatorSpine = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(sp.Skeleton),
        menu('Framework/Animator/AnimatorSpine')
    ], AnimatorSpine);
    return AnimatorSpine;
}(AnimatorBase_1.default));
exports.default = AnimatorSpine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXEFuaW1hdG9yU3BpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQW9FO0FBRzlELElBQUEsS0FBa0UsRUFBRSxDQUFDLFVBQVUsRUFBN0UsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBRXRGOztHQUVHO0FBS0g7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUEyR0M7UUExR0csY0FBYztRQUNOLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBQ25DLGNBQWM7UUFDTiwwQkFBb0IsR0FBb0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMxRSxnQkFBZ0I7UUFDUiwyQkFBcUIsR0FBdUQsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7SUFxR2xHLENBQUM7SUFuR2EsNkJBQUssR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDcEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFakUsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksOEJBQU0sR0FBYjtRQUFjLGNBQWtI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QU87UUFDUCxnQkFBZ0I7UUFDaEIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsa0NBQWtDLENBQUM7T0FDcEIsYUFBYSxDQTJHakM7SUFBRCxvQkFBQztDQTNHRCxBQTJHQyxDQTNHMEMsc0JBQVksR0EyR3REO2tCQTNHb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbmltYXRvclNwaW5lU2Vjb25kYXJ5IGZyb20gXCIuL0FuaW1hdG9yU3BpbmVTZWNvbmRhcnlcIjtcclxuaW1wb3J0IEFuaW1hdG9yQmFzZSwgeyBBbmltYXRpb25QbGF5ZXIgfSBmcm9tIFwiLi9jb3JlL0FuaW1hdG9yQmFzZVwiO1xyXG5pbXBvcnQgQW5pbWF0b3JTdGF0ZUxvZ2ljIGZyb20gXCIuL2NvcmUvQW5pbWF0b3JTdGF0ZUxvZ2ljXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCByZXF1aXJlQ29tcG9uZW50LCBkaXNhbGxvd011bHRpcGxlLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqIFxyXG4gKiBTcGluZeeKtuaAgeacuue7hOS7tu+8iOS4u+eKtuaAgeacuu+8ie+8jHRyYWNrSW5kZXjkuLowXHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5AZGlzYWxsb3dNdWx0aXBsZVxyXG5AcmVxdWlyZUNvbXBvbmVudChzcC5Ta2VsZXRvbilcclxuQG1lbnUoJ0ZyYW1ld29yay9BbmltYXRvci9BbmltYXRvclNwaW5lJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3JTcGluZSBleHRlbmRzIEFuaW1hdG9yQmFzZSB7XHJcbiAgICAvKiogc3BpbmXnu4Tku7YgKi9cclxuICAgIHByaXZhdGUgX3NwaW5lOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICAvKiog5Yqo55S75a6M5oiQ55qE5Zue6LCDICovXHJcbiAgICBwcml2YXRlIF9jb21wbGV0ZUxpc3RlbmVyTWFwOiBNYXA8KGVudHJ5PzogYW55KSA9PiB2b2lkLCBhbnk+ID0gbmV3IE1hcCgpO1xyXG4gICAgLyoqIOasoeeKtuaAgeacuuazqOWGjOeahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBfc2Vjb25kYXJ5TGlzdGVuZXJNYXA6IE1hcDwoZW50cnk/OiBhbnkpID0+IHZvaWQsIEFuaW1hdG9yU3BpbmVTZWNvbmRhcnk+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheU9uU3RhcnQgfHwgdGhpcy5faGFzSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hhc0luaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9zcGluZSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLl9zcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKHRoaXMub25TcGluZUNvbXBsZXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hc3NldFJhd1VybCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRKc29uKHRoaXMuYXNzZXRSYXdVcmwuanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omL5Yqo5Yid5aeL5YyW54q25oCB5py677yM5Y+v5Lyg5YWlMC0z5Liq5Y+C5pWw77yM57G75Z6L5aaC5LiLXHJcbiAgICAgKiAtIG9uU3RhdGVDaGFuZ2VDYWxsIOeKtuaAgeWIh+aNouaXtueahOWbnuiwg1xyXG4gICAgICogLSBzdGF0ZUxvZ2ljTWFwIOWQhOS4queKtuaAgemAu+i+keaOp+WItlxyXG4gICAgICogLSBhbmltYXRpb25QbGF5ZXIg6Ieq5a6a5LmJ5Yqo55S75o6n5Yi2XHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uSW5pdCguLi5hcmdzOiBBcnJheTxNYXA8c3RyaW5nLCBBbmltYXRvclN0YXRlTG9naWM+IHwgKChmcm9tU3RhdGU6IHN0cmluZywgdG9TdGF0ZTogc3RyaW5nKSA9PiB2b2lkKSB8IEFuaW1hdGlvblBsYXllcj4pIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5T25TdGFydCB8fCB0aGlzLl9oYXNJbml0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faGFzSW5pdCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdEFyZ3MoLi4uYXJncyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NwaW5lID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuX3NwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIodGhpcy5vblNwaW5lQ29tcGxldGUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFzc2V0UmF3VXJsICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEpzb24odGhpcy5hc3NldFJhd1VybC5qc29uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNwaW5lQ29tcGxldGUoZW50cnk6IGFueSkge1xyXG4gICAgICAgIGVudHJ5LnRyYWNrSW5kZXggPT09IDAgJiYgdGhpcy5vbkFuaW1GaW5pc2hlZCgpO1xyXG4gICAgICAgIHRoaXMuX2NvbXBsZXRlTGlzdGVuZXJNYXAuZm9yRWFjaCgodGFyZ2V0LCBjYikgPT4geyB0YXJnZXQgPyBjYi5jYWxsKHRhcmdldCwgZW50cnkpIDogY2IoZW50cnkpOyB9KTtcclxuICAgICAgICB0aGlzLl9zZWNvbmRhcnlMaXN0ZW5lck1hcC5mb3JFYWNoKCh0YXJnZXQsIGNiKSA9PiB7IGVudHJ5LnRyYWNrSW5kZXggPT09IHRhcmdldC50cmFja0luZGV4ICYmIGNiLmNhbGwodGFyZ2V0LCBlbnRyeSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5Yqo55S7XHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqIEBwYXJhbSBhbmltTmFtZSDliqjnlLvlkI1cclxuICAgICAqIEBwYXJhbSBsb29wIOaYr+WQpuW+queOr+aSreaUvlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcGxheUFuaW1hdGlvbihhbmltTmFtZTogc3RyaW5nLCBsb29wOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGFuaW1OYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaW5lLnNldEFuaW1hdGlvbigwLCBhbmltTmFtZSwgbG9vcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvKnmlL7liqjnlLvmkq3mlL7pgJ/njodcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuWAjeeOh1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2NhbGVUaW1lKHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zcGluZS50aW1lU2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOazqOWGjOasoeeKtuaAgeacuuWKqOeUu+e7k+adn+eahOWbnuiwg++8iOeKtuaAgeacuuWGhemDqOaWueazle+8jOS4jeiDveeUseWklumDqOebtOaOpeiwg+eUqO+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2Vjb25kYXJ5TGlzdGVuZXIoY2I6IChlbnRyeT86IGFueSkgPT4gdm9pZCwgdGFyZ2V0OiBBbmltYXRvclNwaW5lU2Vjb25kYXJ5KSB7XHJcbiAgICAgICAgdGhpcy5fc2Vjb25kYXJ5TGlzdGVuZXJNYXAuc2V0KGNiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rOo5YaM5Yqo55S75a6M5oiQ5pe255qE55uR5ZCsXHJcbiAgICAgKiBAcGFyYW0gY2Ig5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOiwg+eUqOWbnuiwg+eahHRoaXPlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZENvbXBsZXRlTGlzdGVuZXIoY2I6IChlbnRyeT86IGFueSkgPT4gdm9pZCwgdGFyZ2V0OiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbXBsZXRlTGlzdGVuZXJNYXAuaGFzKGNiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbXBsZXRlTGlzdGVuZXJNYXAuc2V0KGNiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rOo6ZSA5Yqo55S75a6M5oiQ55qE55uR5ZCsXHJcbiAgICAgKiBAcGFyYW0gY2Ig5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVDb21wbGV0ZUxpc3RlbmVyKGNiOiAoZW50cnk/OiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl9jb21wbGV0ZUxpc3RlbmVyTWFwLmRlbGV0ZShjYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnqbrliqjnlLvlrozmiJDnmoTnm5HlkKxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyQ29tcGxldGVMaXN0ZW5lcigpIHtcclxuICAgICAgICB0aGlzLl9jb21wbGV0ZUxpc3RlbmVyTWFwLmNsZWFyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==