
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/AnimatorSpineSecondary.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXEFuaW1hdG9yU3BpbmVTZWNvbmRhcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBQzVDLG9EQUFvRTtBQUc5RCxJQUFBLEtBQWdELEVBQUUsQ0FBQyxVQUFVLEVBQTNELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUVwRTs7R0FFRztBQUlIO0lBQW9ELDBDQUFZO0lBQWhFO1FBQUEscUVBNERDO1FBM0Q2RCxnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUVqRixXQUFXO1FBQ0gsV0FBSyxHQUFrQixJQUFJLENBQUM7UUFDcEMsY0FBYztRQUNOLFlBQU0sR0FBZ0IsSUFBSSxDQUFDOztJQXNEdkMsQ0FBQztJQXBEYSxzQ0FBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLHVDQUFNLEdBQWI7UUFBYyxjQUFrSDthQUFsSCxVQUFrSCxFQUFsSCxxQkFBa0gsRUFBbEgsSUFBa0g7WUFBbEgseUJBQWtIOztRQUM1SCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLENBQUMsUUFBUSxPQUFiLElBQUksRUFBYSxJQUFJLEVBQUU7UUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLDhDQUFhLEdBQXZCLFVBQXdCLFFBQWdCLEVBQUUsSUFBYTtRQUNuRCxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBMUR5RDtRQUF6RCxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLENBQUM7OERBQXdCO0lBRGhFLHNCQUFzQjtRQUgxQyxPQUFPO1FBQ1AsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsMkNBQTJDLENBQUM7T0FDN0Isc0JBQXNCLENBNEQxQztJQUFELDZCQUFDO0NBNURELEFBNERDLENBNURtRCxzQkFBWSxHQTREL0Q7a0JBNURvQixzQkFBc0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW5pbWF0b3JTcGluZSBmcm9tIFwiLi9BbmltYXRvclNwaW5lXCI7XHJcbmltcG9ydCBBbmltYXRvckJhc2UsIHsgQW5pbWF0aW9uUGxheWVyIH0gZnJvbSBcIi4vY29yZS9BbmltYXRvckJhc2VcIjtcclxuaW1wb3J0IEFuaW1hdG9yU3RhdGVMb2dpYyBmcm9tIFwiLi9jb3JlL0FuaW1hdG9yU3RhdGVMb2dpY1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgcmVxdWlyZUNvbXBvbmVudCwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKiBcclxuICogU3BpbmXnirbmgIHmnLrnu4Tku7bvvIjmrKHnirbmgIHmnLrvvInvvIzlkIzkuIDoioLngrnlj6/mt7vliqDlpJrkuKrvvIznlKjkuo7lnKjkuI3lkIx0cmFja+S4reaSreaUvuWKqOeUu++8jHRyYWNrSW5kZXjlv4XpobvlpKfkuo4wXHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5AcmVxdWlyZUNvbXBvbmVudChzcC5Ta2VsZXRvbilcclxuQG1lbnUoJ0ZyYW1ld29yay9BbmltYXRvci9BbmltYXRvclNwaW5lU2Vjb25kYXJ5JylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3JTcGluZVNlY29uZGFyeSBleHRlbmRzIEFuaW1hdG9yQmFzZSB7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgJ+WKqOeUu+aSreaUvueahHRyYWNrSW5kZXjvvIzlv4XpobvlpKfkuo4wJyB9KSB0cmFja0luZGV4OiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKiDkuLvnirbmgIHmnLogKi9cclxuICAgIHByaXZhdGUgX21haW46IEFuaW1hdG9yU3BpbmUgPSBudWxsO1xyXG4gICAgLyoqIHNwaW5l57uE5Lu2ICovXHJcbiAgICBwcml2YXRlIF9zcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheU9uU3RhcnQgfHwgdGhpcy5faGFzSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hhc0luaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9zcGluZSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLl9tYWluID0gdGhpcy5nZXRDb21wb25lbnQoQW5pbWF0b3JTcGluZSk7XHJcbiAgICAgICAgdGhpcy5fbWFpbi5hZGRTZWNvbmRhcnlMaXN0ZW5lcih0aGlzLm9uQW5pbUZpbmlzaGVkLCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXNzZXRSYXdVcmwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0SnNvbih0aGlzLmFzc2V0UmF3VXJsLmpzb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJi+WKqOWIneWni+WMlueKtuaAgeacuu+8jOWPr+S8oOWFpTAtM+S4quWPguaVsO+8jOexu+Wei+WmguS4i1xyXG4gICAgICogLSBvblN0YXRlQ2hhbmdlQ2FsbCDnirbmgIHliIfmjaLml7bnmoTlm57osINcclxuICAgICAqIC0gc3RhdGVMb2dpY01hcCDlkITkuKrnirbmgIHpgLvovpHmjqfliLZcclxuICAgICAqIC0gYW5pbWF0aW9uUGxheWVyIOiHquWumuS5ieWKqOeUu+aOp+WItlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkluaXQoLi4uYXJnczogQXJyYXk8TWFwPHN0cmluZywgQW5pbWF0b3JTdGF0ZUxvZ2ljPiB8ICgoZnJvbVN0YXRlOiBzdHJpbmcsIHRvU3RhdGU6IHN0cmluZykgPT4gdm9pZCkgfCBBbmltYXRpb25QbGF5ZXI+KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheU9uU3RhcnQgfHwgdGhpcy5faGFzSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2hhc0luaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRBcmdzKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9zcGluZSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLl9tYWluID0gdGhpcy5nZXRDb21wb25lbnQoQW5pbWF0b3JTcGluZSk7XHJcbiAgICAgICAgdGhpcy5fbWFpbi5hZGRTZWNvbmRhcnlMaXN0ZW5lcih0aGlzLm9uQW5pbUZpbmlzaGVkLCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXNzZXRSYXdVcmwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0SnNvbih0aGlzLmFzc2V0UmF3VXJsLmpzb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuWKqOeUu1xyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKiBAcGFyYW0gYW5pbU5hbWUg5Yqo55S75ZCNXHJcbiAgICAgKiBAcGFyYW0gbG9vcCDmmK/lkKblvqrnjq/mkq3mlL5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHBsYXlBbmltYXRpb24oYW5pbU5hbWU6IHN0cmluZywgbG9vcDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChhbmltTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGluZS5zZXRBbmltYXRpb24odGhpcy50cmFja0luZGV4LCBhbmltTmFtZSwgbG9vcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUuY2xlYXJUcmFjayh0aGlzLnRyYWNrSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=