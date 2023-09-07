
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/core/AnimatorController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'de785Aa4lpFH59CMCV1Eb74', 'AnimatorController');
// scripts/animator/core/AnimatorController.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatorParams_1 = require("./AnimatorParams");
var AnimatorState_1 = require("./AnimatorState");
/**
 * 状态机控制类
 */
var AnimatorController = /** @class */ (function () {
    function AnimatorController(player, json) {
        this._jsonData = null;
        this._animator = null;
        this._params = null;
        this._states = null;
        this._anyState = null;
        this._curState = null;
        /** 状态切换次数 */
        this._changeCount = 0;
        /** 对应animComplete的状态 */
        this.animCompleteState = null;
        /** 动画播放完毕的标记 */
        this.animComplete = false;
        this._animator = player;
        this._jsonData = json;
        this._states = new Map();
        this._params = new AnimatorParams_1.default(json.parameters);
        this.init(json);
    }
    Object.defineProperty(AnimatorController.prototype, "curState", {
        /** 当前运行的状态 */
        get: function () { return this._curState; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimatorController.prototype, "params", {
        get: function () { return this._params; },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化状态机所有动画状态
     */
    AnimatorController.prototype.init = function (json) {
        if (json.states.length <= 0) {
            cc.error("[AnimatorController.init] \u72B6\u6001\u673Ajson\u9519\u8BEF");
            return;
        }
        this._anyState = new AnimatorState_1.default(json.anyState, this);
        for (var i = 0; i < json.states.length; i++) {
            var state = new AnimatorState_1.default(json.states[i], this);
            this._states.set(state.name, state);
        }
    };
    AnimatorController.prototype.updateState = function () {
        this._curState.checkAndTrans();
        if (this._curState !== this._anyState && this._anyState !== null) {
            this._anyState.checkAndTrans();
        }
    };
    /**
     * 更新状态机逻辑
     */
    AnimatorController.prototype.updateAnimator = function () {
        // 重置计数
        this._changeCount = 0;
        this.updateState();
        // 重置动画完成标记
        if (this.animComplete && this.animCompleteState.loop) {
            this.animComplete = false;
        }
        // 重置autoTrigger
        this.params.resetAllAutoTrigger();
    };
    AnimatorController.prototype.onAnimationComplete = function () {
        this.animComplete = true;
        this.animCompleteState = this._curState;
        // cc.log(`animation complete: ${this._curState.name}`);
    };
    /**
     * 无视条件直接跳转状态，如果当前已处于此状态则重置状态
     * @param 状态名
     */
    AnimatorController.prototype.play = function (stateName) {
        if (!this._states.has(stateName)) {
            return;
        }
        // 重置动画完成标记
        this.animComplete = false;
        var oldState = this._curState;
        this._curState = this._states.get(stateName);
        this._animator.onStateChange(oldState, this._curState);
        this.updateState();
    };
    /**
     * 切换动画状态
     */
    AnimatorController.prototype.changeState = function (stateName) {
        this._changeCount++;
        if (this._changeCount > 1000) {
            cc.error('[AnimatorController.changeState] error: 状态切换递归调用超过1000次，transition设置可能出错!');
            return;
        }
        if (this._states.has(stateName) && (this._curState === null || this._curState.name !== stateName)) {
            var oldState = this._curState;
            this._curState = this._states.get(stateName);
            this._animator.onStateChange(oldState, this._curState);
            this.updateState();
        }
        else {
            cc.error("[AnimatorController.changeState] error state: " + stateName);
        }
    };
    return AnimatorController;
}());
exports.default = AnimatorController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXGNvcmVcXEFuaW1hdG9yQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUE4QztBQUM5QyxpREFBNEM7QUFFNUM7O0dBRUc7QUFDSDtJQW1CSSw0QkFBWSxNQUFvQixFQUFFLElBQVM7UUFsQm5DLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsY0FBUyxHQUFpQixJQUFJLENBQUM7UUFFL0IsWUFBTyxHQUFtQixJQUFJLENBQUM7UUFDL0IsWUFBTyxHQUErQixJQUFJLENBQUM7UUFDM0MsY0FBUyxHQUFrQixJQUFJLENBQUM7UUFDaEMsY0FBUyxHQUFrQixJQUFJLENBQUM7UUFFeEMsYUFBYTtRQUNMLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ2pDLHdCQUF3QjtRQUNqQixzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBQy9DLGdCQUFnQjtRQUNULGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBTWpDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHdCQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQVRELHNCQUFXLHdDQUFRO1FBRG5CLGNBQWM7YUFDZCxjQUF1QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMvRCxzQkFBVyxzQ0FBTTthQUFqQixjQUFzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQVU1RDs7T0FFRztJQUNLLGlDQUFJLEdBQVosVUFBYSxJQUFTO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3pCLEVBQUUsQ0FBQyxLQUFLLENBQUMsOERBQXFDLENBQUMsQ0FBQztZQUNoRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksdUJBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLEtBQUssR0FBa0IsSUFBSSx1QkFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFTyx3Q0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLDJDQUFjLEdBQXJCO1FBQ0ksT0FBTztRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixXQUFXO1FBQ1gsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFDRCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxnREFBbUIsR0FBMUI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4Qyx3REFBd0Q7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGlDQUFJLEdBQVgsVUFBWSxTQUFpQjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDOUIsT0FBTztTQUNWO1FBRUQsV0FBVztRQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSSx3Q0FBVyxHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksRUFBRTtZQUMxQixFQUFFLENBQUMsS0FBSyxDQUFDLDJFQUEyRSxDQUFDLENBQUM7WUFDdEYsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxFQUFFO1lBQy9GLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU3QyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0gsRUFBRSxDQUFDLEtBQUssQ0FBQyxtREFBaUQsU0FBVyxDQUFDLENBQUM7U0FDMUU7SUFDTCxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQS9HQSxBQStHQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFuaW1hdG9yQmFzZSBmcm9tIFwiLi9BbmltYXRvckJhc2VcIjtcclxuaW1wb3J0IEFuaW1hdG9yUGFyYW1zIGZyb20gXCIuL0FuaW1hdG9yUGFyYW1zXCI7XHJcbmltcG9ydCBBbmltYXRvclN0YXRlIGZyb20gXCIuL0FuaW1hdG9yU3RhdGVcIjtcclxuXHJcbi8qKlxyXG4gKiDnirbmgIHmnLrmjqfliLbnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdG9yQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF9qc29uRGF0YTogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2FuaW1hdG9yOiBBbmltYXRvckJhc2UgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3BhcmFtczogQW5pbWF0b3JQYXJhbXMgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVzOiBNYXA8c3RyaW5nLCBBbmltYXRvclN0YXRlPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9hbnlTdGF0ZTogQW5pbWF0b3JTdGF0ZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXJTdGF0ZTogQW5pbWF0b3JTdGF0ZSA9IG51bGw7XHJcblxyXG4gICAgLyoqIOeKtuaAgeWIh+aNouasoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBfY2hhbmdlQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAvKiog5a+55bqUYW5pbUNvbXBsZXRl55qE54q25oCBICovXHJcbiAgICBwdWJsaWMgYW5pbUNvbXBsZXRlU3RhdGU6IEFuaW1hdG9yU3RhdGUgPSBudWxsO1xyXG4gICAgLyoqIOWKqOeUu+aSreaUvuWujOavleeahOagh+iusCAqL1xyXG4gICAgcHVibGljIGFuaW1Db21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOW9k+WJjei/kOihjOeahOeKtuaAgSAqL1xyXG4gICAgcHVibGljIGdldCBjdXJTdGF0ZSgpOiBBbmltYXRvclN0YXRlIHsgcmV0dXJuIHRoaXMuX2N1clN0YXRlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHBhcmFtcygpOiBBbmltYXRvclBhcmFtcyB7IHJldHVybiB0aGlzLl9wYXJhbXM7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6IEFuaW1hdG9yQmFzZSwganNvbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0b3IgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5fanNvbkRhdGEgPSBqc29uO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBBbmltYXRvclN0YXRlPigpO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtcyA9IG5ldyBBbmltYXRvclBhcmFtcyhqc29uLnBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHRoaXMuaW5pdChqc29uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlueKtuaAgeacuuaJgOacieWKqOeUu+eKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXQoanNvbjogYW55KSB7XHJcbiAgICAgICAgaWYgKGpzb24uc3RhdGVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGBbQW5pbWF0b3JDb250cm9sbGVyLmluaXRdIOeKtuaAgeacumpzb27plJnor69gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYW55U3RhdGUgPSBuZXcgQW5pbWF0b3JTdGF0ZShqc29uLmFueVN0YXRlLCB0aGlzKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpzb24uc3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZTogQW5pbWF0b3JTdGF0ZSA9IG5ldyBBbmltYXRvclN0YXRlKGpzb24uc3RhdGVzW2ldLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGVzLnNldChzdGF0ZS5uYW1lLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY3VyU3RhdGUuY2hlY2tBbmRUcmFucygpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJTdGF0ZSAhPT0gdGhpcy5fYW55U3RhdGUgJiYgdGhpcy5fYW55U3RhdGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW55U3RhdGUuY2hlY2tBbmRUcmFucygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeKtuaAgeacuumAu+i+kVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQW5pbWF0b3IoKSB7XHJcbiAgICAgICAgLy8g6YeN572u6K6h5pWwXHJcbiAgICAgICAgdGhpcy5fY2hhbmdlQ291bnQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XHJcblxyXG4gICAgICAgIC8vIOmHjee9ruWKqOeUu+WujOaIkOagh+iusFxyXG4gICAgICAgIGlmICh0aGlzLmFuaW1Db21wbGV0ZSAmJiB0aGlzLmFuaW1Db21wbGV0ZVN0YXRlLmxvb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6YeN572uYXV0b1RyaWdnZXJcclxuICAgICAgICB0aGlzLnBhcmFtcy5yZXNldEFsbEF1dG9UcmlnZ2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQW5pbWF0aW9uQ29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXBsZXRlU3RhdGUgPSB0aGlzLl9jdXJTdGF0ZTtcclxuICAgICAgICAvLyBjYy5sb2coYGFuaW1hdGlvbiBjb21wbGV0ZTogJHt0aGlzLl9jdXJTdGF0ZS5uYW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5peg6KeG5p2h5Lu255u05o6l6Lez6L2s54q25oCB77yM5aaC5p6c5b2T5YmN5bey5aSE5LqO5q2k54q25oCB5YiZ6YeN572u54q25oCBXHJcbiAgICAgKiBAcGFyYW0g54q25oCB5ZCNXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5KHN0YXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlTmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6YeN572u5Yqo55S75a6M5oiQ5qCH6K6wXHJcbiAgICAgICAgdGhpcy5hbmltQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkU3RhdGUgPSB0aGlzLl9jdXJTdGF0ZTtcclxuICAgICAgICB0aGlzLl9jdXJTdGF0ZSA9IHRoaXMuX3N0YXRlcy5nZXQoc3RhdGVOYW1lKTtcclxuICAgICAgICB0aGlzLl9hbmltYXRvci5vblN0YXRlQ2hhbmdlKG9sZFN0YXRlLCB0aGlzLl9jdXJTdGF0ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiH5o2i5Yqo55S754q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VTdGF0ZShzdGF0ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZUNvdW50Kys7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZUNvdW50ID4gMTAwMCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcignW0FuaW1hdG9yQ29udHJvbGxlci5jaGFuZ2VTdGF0ZV0gZXJyb3I6IOeKtuaAgeWIh+aNoumAkuW9kuiwg+eUqOi2hei/hzEwMDDmrKHvvIx0cmFuc2l0aW9u6K6+572u5Y+v6IO95Ye66ZSZIScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZU5hbWUpICYmICh0aGlzLl9jdXJTdGF0ZSA9PT0gbnVsbCB8fCB0aGlzLl9jdXJTdGF0ZS5uYW1lICE9PSBzdGF0ZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRTdGF0ZSA9IHRoaXMuX2N1clN0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJTdGF0ZSA9IHRoaXMuX3N0YXRlcy5nZXQoc3RhdGVOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLm9uU3RhdGVDaGFuZ2Uob2xkU3RhdGUsIHRoaXMuX2N1clN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgW0FuaW1hdG9yQ29udHJvbGxlci5jaGFuZ2VTdGF0ZV0gZXJyb3Igc3RhdGU6ICR7c3RhdGVOYW1lfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=