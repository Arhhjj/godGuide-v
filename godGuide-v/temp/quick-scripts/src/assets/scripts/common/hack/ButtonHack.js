"use strict";
cc._RF.push(module, '2aaa36JkjVLWItbzIIr6kKk', 'ButtonHack');
// scripts/common/hack/ButtonHack.ts

"use strict";
// 基于CocosCreator2.x 按钮组件hack代码
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonState = exports.ButtonHackEvent = void 0;
var ButtonHackEvent;
(function (ButtonHackEvent) {
    /** 按钮状态变更 */
    ButtonHackEvent["STATE_CHANGE"] = "ButtonHackEvent-STATE_CHANGE";
})(ButtonHackEvent = exports.ButtonHackEvent || (exports.ButtonHackEvent = {}));
var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["NORMAL"] = 0] = "NORMAL";
    ButtonState[ButtonState["HOVER"] = 1] = "HOVER";
    ButtonState[ButtonState["PRESSED"] = 2] = "PRESSED";
    ButtonState[ButtonState["DISABLED"] = 3] = "DISABLED";
})(ButtonState = exports.ButtonState || (exports.ButtonState = {}));
// @ts-ignore
cc.Button.prototype._applyTransition = function (state) {
    var transition = this.transition;
    if (transition === cc.Button.Transition.COLOR) {
        this._updateColorTransition(state);
    }
    else if (transition === cc.Button.Transition.SPRITE) {
        this._updateSpriteTransition(state);
    }
    else if (transition === cc.Button.Transition.SCALE) {
        this._updateScaleTransition(state);
    }
    // 状态变更通知
    this.node.emit(ButtonHackEvent.STATE_CHANGE, state);
};

cc._RF.pop();