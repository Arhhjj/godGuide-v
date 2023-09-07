
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/hack/ButtonHack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxoYWNrXFxCdXR0b25IYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7OztBQUUvQixJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDdkIsYUFBYTtJQUNiLGdFQUE2QyxDQUFBO0FBQ2pELENBQUMsRUFIVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUcxQjtBQUVELElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUNuQixpREFBVSxDQUFBO0lBQ1YsK0NBQVMsQ0FBQTtJQUNULG1EQUFXLENBQUE7SUFDWCxxREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFMVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUt0QjtBQUVELGFBQWE7QUFDYixFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLEtBQVU7SUFDdkQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxJQUFJLFVBQVUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDM0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RDO1NBQU0sSUFBSSxVQUFVLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ25ELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN2QztTQUFNLElBQUksVUFBVSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtRQUNsRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7SUFFRCxTQUFTO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyDln7rkuo5Db2Nvc0NyZWF0b3IyLngg5oyJ6ZKu57uE5Lu2aGFja+S7o+eggVxyXG5cclxuZXhwb3J0IGVudW0gQnV0dG9uSGFja0V2ZW50IHtcclxuICAgIC8qKiDmjInpkq7nirbmgIHlj5jmm7QgKi9cclxuICAgIFNUQVRFX0NIQU5HRSA9IFwiQnV0dG9uSGFja0V2ZW50LVNUQVRFX0NIQU5HRVwiLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCdXR0b25TdGF0ZSB7XHJcbiAgICBOT1JNQUwgPSAwLFxyXG4gICAgSE9WRVIgPSAxLFxyXG4gICAgUFJFU1NFRCA9IDIsXHJcbiAgICBESVNBQkxFRCA9IDMsXHJcbn1cclxuXHJcbi8vIEB0cy1pZ25vcmVcclxuY2MuQnV0dG9uLnByb3RvdHlwZS5fYXBwbHlUcmFuc2l0aW9uID0gZnVuY3Rpb24gKHN0YXRlOiBhbnkpIHtcclxuICAgIGxldCB0cmFuc2l0aW9uID0gdGhpcy50cmFuc2l0aW9uO1xyXG4gICAgaWYgKHRyYW5zaXRpb24gPT09IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLkNPTE9SKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29sb3JUcmFuc2l0aW9uKHN0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvbiA9PT0gY2MuQnV0dG9uLlRyYW5zaXRpb24uU1BSSVRFKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU3ByaXRlVHJhbnNpdGlvbihzdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb24gPT09IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU2NhbGVUcmFuc2l0aW9uKHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDnirbmgIHlj5jmm7TpgJrnn6VcclxuICAgIHRoaXMubm9kZS5lbWl0KEJ1dHRvbkhhY2tFdmVudC5TVEFURV9DSEFOR0UsIHN0YXRlKTtcclxufTtcclxuIl19