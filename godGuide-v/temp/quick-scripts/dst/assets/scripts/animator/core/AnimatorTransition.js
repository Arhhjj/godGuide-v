
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/core/AnimatorTransition.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '34b08BDtkZDiLlsqDHQh7XT', 'AnimatorTransition');
// scripts/animator/core/AnimatorTransition.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatorCondition_1 = require("./AnimatorCondition");
/**
 * 状态过渡类
 */
var AnimatorTransition = /** @class */ (function () {
    function AnimatorTransition(data, ac) {
        this._toStateName = '';
        this._hasExitTime = false;
        this._conditions = [];
        this._ac = null;
        this._toStateName = data.toState;
        this._hasExitTime = data.hasExitTime;
        this._ac = ac;
        for (var i = 0; i < data.conditions.length; i++) {
            var condition = new AnimatorCondition_1.default(data.conditions[i], ac);
            this._conditions.push(condition);
        }
    }
    /**
     * 返回该transition是否有效，当未勾选hasExitTime以及没有添加任何condition时此transition无效并忽略
     */
    AnimatorTransition.prototype.isValid = function () {
        return this._hasExitTime || this._conditions.length > 0;
    };
    /**
     * 判断是否满足所有转换条件
     */
    AnimatorTransition.prototype.check = function () {
        if (this._toStateName === this._ac.curState.name) {
            return false;
        }
        if (this._hasExitTime && (this._ac.curState !== this._ac.animCompleteState || !this._ac.animComplete)) {
            return false;
        }
        for (var i = 0; i < this._conditions.length; i++) {
            if (!this._conditions[i].check()) {
                return false;
            }
        }
        return true;
    };
    /**
     * 转换状态
     */
    AnimatorTransition.prototype.doTrans = function () {
        // 满足条件时重置动画播完标记
        if (this._hasExitTime) {
            this._ac.animComplete = false;
        }
        // 满足状态转换条件时重置trigger和autoTrigger
        for (var i = 0; i < this._conditions.length; i++) {
            var type = this._conditions[i].getParamType();
            var name = this._conditions[i].getParamName();
            if (type === AnimatorCondition_1.ParamType.TRIGGER) {
                this._ac.params.resetTrigger(name);
            }
            else if (type === AnimatorCondition_1.ParamType.AUTO_TRIGGER) {
                this._ac.params.resetAutoTrigger(name);
            }
        }
        this._ac.changeState(this._toStateName);
    };
    return AnimatorTransition;
}());
exports.default = AnimatorTransition;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXGNvcmVcXEFuaW1hdG9yVHJhbnNpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFtRTtBQUduRTs7R0FFRztBQUNIO0lBTUksNEJBQVksSUFBUyxFQUFFLEVBQXNCO1FBTHJDLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGdCQUFXLEdBQXdCLEVBQUUsQ0FBQztRQUN0QyxRQUFHLEdBQXVCLElBQUksQ0FBQztRQUduQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksU0FBUyxHQUFzQixJQUFJLDJCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQ0FBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrQ0FBSyxHQUFaO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUM5QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25HLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM5QixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0NBQU8sR0FBZDtRQUNJLGdCQUFnQjtRQUNoQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO1FBQ0QsaUNBQWlDO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzlDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDOUMsSUFBSSxJQUFJLEtBQUssNkJBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QztpQkFBTSxJQUFJLElBQUksS0FBSyw2QkFBUyxDQUFDLFlBQVksRUFBRTtnQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7U0FDSjtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQWhFQSxBQWdFQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFuaW1hdG9yQ29uZGl0aW9uLCB7IFBhcmFtVHlwZSB9IGZyb20gXCIuL0FuaW1hdG9yQ29uZGl0aW9uXCI7XHJcbmltcG9ydCBBbmltYXRvckNvbnRyb2xsZXIgZnJvbSBcIi4vQW5pbWF0b3JDb250cm9sbGVyXCI7XHJcblxyXG4vKipcclxuICog54q25oCB6L+H5rih57G7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRvclRyYW5zaXRpb24ge1xyXG4gICAgcHJpdmF0ZSBfdG9TdGF0ZU5hbWU6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfaGFzRXhpdFRpbWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2NvbmRpdGlvbnM6IEFuaW1hdG9yQ29uZGl0aW9uW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2FjOiBBbmltYXRvckNvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSwgYWM6IEFuaW1hdG9yQ29udHJvbGxlcikge1xyXG4gICAgICAgIHRoaXMuX3RvU3RhdGVOYW1lID0gZGF0YS50b1N0YXRlO1xyXG4gICAgICAgIHRoaXMuX2hhc0V4aXRUaW1lID0gZGF0YS5oYXNFeGl0VGltZTtcclxuICAgICAgICB0aGlzLl9hYyA9IGFjO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5jb25kaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb25kaXRpb246IEFuaW1hdG9yQ29uZGl0aW9uID0gbmV3IEFuaW1hdG9yQ29uZGl0aW9uKGRhdGEuY29uZGl0aW9uc1tpXSwgYWMpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25kaXRpb25zLnB1c2goY29uZGl0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57or6V0cmFuc2l0aW9u5piv5ZCm5pyJ5pWI77yM5b2T5pyq5Yu+6YCJaGFzRXhpdFRpbWXku6Xlj4rmsqHmnInmt7vliqDku7vkvZVjb25kaXRpb27ml7bmraR0cmFuc2l0aW9u5peg5pWI5bm25b+955WlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNFeGl0VGltZSB8fCB0aGlzLl9jb25kaXRpb25zLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbmu6HotrPmiYDmnInovazmjaLmnaHku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl90b1N0YXRlTmFtZSA9PT0gdGhpcy5fYWMuY3VyU3RhdGUubmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faGFzRXhpdFRpbWUgJiYgKHRoaXMuX2FjLmN1clN0YXRlICE9PSB0aGlzLl9hYy5hbmltQ29tcGxldGVTdGF0ZSB8fCAhdGhpcy5fYWMuYW5pbUNvbXBsZXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbmRpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jb25kaXRpb25zW2ldLmNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOaNoueKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9UcmFucygpIHtcclxuICAgICAgICAvLyDmu6HotrPmnaHku7bml7bph43nva7liqjnlLvmkq3lrozmoIforrBcclxuICAgICAgICBpZiAodGhpcy5faGFzRXhpdFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWMuYW5pbUNvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOa7oei2s+eKtuaAgei9rOaNouadoeS7tuaXtumHjee9rnRyaWdnZXLlkoxhdXRvVHJpZ2dlclxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29uZGl0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMuX2NvbmRpdGlvbnNbaV0uZ2V0UGFyYW1UeXBlKCk7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5fY29uZGl0aW9uc1tpXS5nZXRQYXJhbU5hbWUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFBhcmFtVHlwZS5UUklHR0VSKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hYy5wYXJhbXMucmVzZXRUcmlnZ2VyKG5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFBhcmFtVHlwZS5BVVRPX1RSSUdHRVIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjLnBhcmFtcy5yZXNldEF1dG9UcmlnZ2VyKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hYy5jaGFuZ2VTdGF0ZSh0aGlzLl90b1N0YXRlTmFtZSk7XHJcbiAgICB9XHJcbn1cclxuIl19