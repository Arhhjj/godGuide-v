"use strict";
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