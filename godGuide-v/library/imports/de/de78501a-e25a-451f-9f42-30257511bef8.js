"use strict";
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