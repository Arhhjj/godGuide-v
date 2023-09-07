"use strict";
cc._RF.push(module, '67f80RtpchPbbZr6OYBU8NI', 'AnimatorStateLogic');
// scripts/animator/core/AnimatorStateLogic.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 状态逻辑基类
 */
var AnimatorStateLogic = /** @class */ (function () {
    function AnimatorStateLogic() {
    }
    /**
     * 进入状态时调用
     * @virtual
     */
    AnimatorStateLogic.prototype.onEntry = function () {
    };
    /**
     * 每次状态机逻辑更新时调用
     * @virtual
     */
    AnimatorStateLogic.prototype.onUpdate = function () {
    };
    /**
     * 离开状态时调用
     * @virtual
     */
    AnimatorStateLogic.prototype.onExit = function () {
    };
    return AnimatorStateLogic;
}());
exports.default = AnimatorStateLogic;

cc._RF.pop();