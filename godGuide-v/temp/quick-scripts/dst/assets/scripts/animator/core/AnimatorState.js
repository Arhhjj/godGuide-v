
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/core/AnimatorState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1d25xIgn5M3ZaxWIV1n5ii', 'AnimatorState');
// scripts/animator/core/AnimatorState.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatorTransition_1 = require("./AnimatorTransition");
/**
 * 状态管理类
 */
var AnimatorState = /** @class */ (function () {
    function AnimatorState(data, ac) {
        this._name = "";
        this._motion = "";
        this._loop = false;
        this._speed = 1;
        this._multi = "";
        this._transitions = [];
        this._ac = null;
        this._name = data.state;
        this._motion = data.motion || '';
        this._loop = data.loop || false;
        this._speed = data.speed || 1;
        this._multi = data.multiplier || '';
        this._ac = ac;
        for (var i = 0; i < data.transitions.length; i++) {
            var transition = new AnimatorTransition_1.default(data.transitions[i], ac);
            transition.isValid() && this._transitions.push(transition);
        }
    }
    Object.defineProperty(AnimatorState.prototype, "name", {
        /** 状态名 */
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorState.prototype, "motion", {
        /** 动画名 */
        get: function () { return this._motion; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorState.prototype, "loop", {
        /** 动画是否循环播放 */
        get: function () { return this._loop; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorState.prototype, "speed", {
        /** 动画播放速度 */
        get: function () { return this._speed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorState.prototype, "multi", {
        /** 动画播放速度的混合参数 */
        get: function () { return this._multi; },
        enumerable: false,
        configurable: true
    });
    /**
     * 判断各个分支是否满足条件，满足则转换状态
     */
    AnimatorState.prototype.checkAndTrans = function () {
        for (var i = 0; i < this._transitions.length; i++) {
            var transition = this._transitions[i];
            if (transition && transition.check()) {
                transition.doTrans();
                return;
            }
        }
    };
    return AnimatorState;
}());
exports.default = AnimatorState;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXGNvcmVcXEFuaW1hdG9yU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFFdEQ7O0dBRUc7QUFDSDtJQXFCSSx1QkFBWSxJQUFTLEVBQUUsRUFBc0I7UUFwQnJDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixpQkFBWSxHQUF5QixFQUFFLENBQUM7UUFDeEMsUUFBRyxHQUF1QixJQUFJLENBQUM7UUFjbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFFcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxVQUFVLEdBQXVCLElBQUksNEJBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyRixVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBdkJELHNCQUFXLCtCQUFJO1FBRGYsVUFBVTthQUNWLGNBQW9CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXhDLHNCQUFXLGlDQUFNO1FBRGpCLFVBQVU7YUFDVixjQUFzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU1QyxzQkFBVywrQkFBSTtRQURmLGVBQWU7YUFDZixjQUFvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUV4QyxzQkFBVyxnQ0FBSztRQURoQixhQUFhO2FBQ2IsY0FBcUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFMUMsc0JBQVcsZ0NBQUs7UUFEaEIsa0JBQWtCO2FBQ2xCLGNBQXFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBaUIxQzs7T0FFRztJQUNJLHFDQUFhLEdBQXBCO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksVUFBVSxHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDbEMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixPQUFPO2FBQ1Y7U0FDSjtJQUNMLENBQUM7SUFDTCxvQkFBQztBQUFELENBaERBLEFBZ0RDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW5pbWF0b3JDb250cm9sbGVyIGZyb20gXCIuL0FuaW1hdG9yQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgQW5pbWF0b3JUcmFuc2l0aW9uIGZyb20gXCIuL0FuaW1hdG9yVHJhbnNpdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIOeKtuaAgeeuoeeQhuexu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3JTdGF0ZSB7XHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfbW90aW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfc3BlZWQ6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIF9tdWx0aTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwcml2YXRlIF90cmFuc2l0aW9uczogQW5pbWF0b3JUcmFuc2l0aW9uW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2FjOiBBbmltYXRvckNvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuICAgIC8qKiDnirbmgIHlkI0gKi9cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cclxuICAgIC8qKiDliqjnlLvlkI0gKi9cclxuICAgIHB1YmxpYyBnZXQgbW90aW9uKCkgeyByZXR1cm4gdGhpcy5fbW90aW9uOyB9XHJcbiAgICAvKiog5Yqo55S75piv5ZCm5b6q546v5pKt5pS+ICovXHJcbiAgICBwdWJsaWMgZ2V0IGxvb3AoKSB7IHJldHVybiB0aGlzLl9sb29wOyB9XHJcbiAgICAvKiog5Yqo55S75pKt5pS+6YCf5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0IHNwZWVkKCkgeyByZXR1cm4gdGhpcy5fc3BlZWQ7IH1cclxuICAgIC8qKiDliqjnlLvmkq3mlL7pgJ/luqbnmoTmt7flkIjlj4LmlbAgKi9cclxuICAgIHB1YmxpYyBnZXQgbXVsdGkoKSB7IHJldHVybiB0aGlzLl9tdWx0aTsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSwgYWM6IEFuaW1hdG9yQ29udHJvbGxlcikge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBkYXRhLnN0YXRlO1xyXG4gICAgICAgIHRoaXMuX21vdGlvbiA9IGRhdGEubW90aW9uIHx8ICcnO1xyXG4gICAgICAgIHRoaXMuX2xvb3AgPSBkYXRhLmxvb3AgfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBkYXRhLnNwZWVkIHx8IDE7XHJcbiAgICAgICAgdGhpcy5fbXVsdGkgPSBkYXRhLm11bHRpcGxpZXIgfHwgJyc7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjID0gYWM7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS50cmFuc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNpdGlvbjogQW5pbWF0b3JUcmFuc2l0aW9uID0gbmV3IEFuaW1hdG9yVHJhbnNpdGlvbihkYXRhLnRyYW5zaXRpb25zW2ldLCBhYyk7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24uaXNWYWxpZCgpICYmIHRoaXMuX3RyYW5zaXRpb25zLnB1c2godHJhbnNpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5ZCE5Liq5YiG5pSv5piv5ZCm5ruh6Laz5p2h5Lu277yM5ruh6Laz5YiZ6L2s5o2i54q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0FuZFRyYW5zKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdHJhbnNpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb246IEFuaW1hdG9yVHJhbnNpdGlvbiA9IHRoaXMuX3RyYW5zaXRpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbiAmJiB0cmFuc2l0aW9uLmNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uZG9UcmFucygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==