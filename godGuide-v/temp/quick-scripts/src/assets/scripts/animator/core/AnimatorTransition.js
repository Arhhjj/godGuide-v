"use strict";
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