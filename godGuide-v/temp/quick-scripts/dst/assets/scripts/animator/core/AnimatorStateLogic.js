
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/core/AnimatorStateLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXGNvcmVcXEFuaW1hdG9yU3RhdGVMb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0g7SUFBQTtJQXFCQSxDQUFDO0lBcEJHOzs7T0FHRztJQUNJLG9DQUFPLEdBQWQ7SUFDQSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUNBQVEsR0FBZjtJQUNBLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQ0FBTSxHQUFiO0lBQ0EsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDnirbmgIHpgLvovpHln7rnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdG9yU3RhdGVMb2dpYyB7XHJcbiAgICAvKipcclxuICAgICAqIOi/m+WFpeeKtuaAgeaXtuiwg+eUqFxyXG4gICAgICogQHZpcnR1YWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRW50cnkoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/mrKHnirbmgIHmnLrpgLvovpHmm7TmlrDml7bosIPnlKhcclxuICAgICAqIEB2aXJ0dWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblVwZGF0ZSgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOemu+W8gOeKtuaAgeaXtuiwg+eUqFxyXG4gICAgICogQHZpcnR1YWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRXhpdCgpIHtcclxuICAgIH1cclxufVxyXG4iXX0=