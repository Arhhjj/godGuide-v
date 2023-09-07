
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/const/EventName.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '52bf65jN2xMY6Ig2aroKkQw', 'EventName');
// scripts/common/const/EventName.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventName = void 0;
/**
 * 事件名
 */
var EventName;
(function (EventName) {
    /** cc.view 调整视窗尺寸的事件，仅在 Web 平台下有效 */
    EventName[EventName["RESIZE"] = 0] = "RESIZE";
    /** 更新多语言组件 */
    EventName[EventName["UPDATE_LOCALIZED_CMPT"] = 1] = "UPDATE_LOCALIZED_CMPT";
    /** 游戏暂停 */
    EventName[EventName["GAME_PAUSE"] = 2] = "GAME_PAUSE";
    /** 游戏恢复 */
    EventName[EventName["GAME_RESUME"] = 3] = "GAME_RESUME";
    /** 游戏时间缩放值修改 */
    EventName[EventName["TIME_SCALE"] = 4] = "TIME_SCALE";
    /** 相机移动 */
    EventName[EventName["CAMERA_MOVE"] = 5] = "CAMERA_MOVE";
    EventName[EventName["EVENT_TEST1"] = 6] = "EVENT_TEST1";
    EventName[EventName["EVENT_TEST2"] = 7] = "EVENT_TEST2";
    /************************************ */
    EventName[EventName["UPDATE_COIN"] = 8] = "UPDATE_COIN";
    EventName[EventName["ADD_COIN"] = 9] = "ADD_COIN";
    EventName[EventName["REDUCE_COIN"] = 10] = "REDUCE_COIN";
    EventName[EventName["JUDG_RESULT"] = 11] = "JUDG_RESULT";
    EventName[EventName["EXCUTE_GUIDE_TASK"] = 12] = "EXCUTE_GUIDE_TASK";
})(EventName = exports.EventName || (exports.EventName = {}));
;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjb25zdFxcRXZlbnROYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsSUFBWSxTQTZCWDtBQTdCRCxXQUFZLFNBQVM7SUFDcEIscUNBQXFDO0lBQ3JDLDZDQUFNLENBQUE7SUFDTixjQUFjO0lBQ2QsMkVBQXFCLENBQUE7SUFFckIsV0FBVztJQUNYLHFEQUFVLENBQUE7SUFDVixXQUFXO0lBQ1gsdURBQVcsQ0FBQTtJQUNYLGdCQUFnQjtJQUNoQixxREFBVSxDQUFBO0lBRVYsV0FBVztJQUNYLHVEQUFXLENBQUE7SUFFWCx1REFBVyxDQUFBO0lBQ1gsdURBQVcsQ0FBQTtJQUVYLHdDQUF3QztJQUV4Qyx1REFBVyxDQUFBO0lBQ1gsaURBQVEsQ0FBQTtJQUNSLHdEQUFXLENBQUE7SUFFWCx3REFBVyxDQUFBO0lBRVgsb0VBQWlCLENBQUE7QUFFbEIsQ0FBQyxFQTdCVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQTZCcEI7QUFBQSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOS6i+S7tuWQjVxyXG4gKi9cclxuZXhwb3J0IGVudW0gRXZlbnROYW1lIHtcclxuXHQvKiogY2MudmlldyDosIPmlbTop4bnqpflsLrlr7jnmoTkuovku7bvvIzku4XlnKggV2ViIOW5s+WPsOS4i+acieaViCAqL1xyXG5cdFJFU0laRSxcclxuXHQvKiog5pu05paw5aSa6K+t6KiA57uE5Lu2ICovXHJcblx0VVBEQVRFX0xPQ0FMSVpFRF9DTVBULFxyXG5cclxuXHQvKiog5ri45oiP5pqC5YGcICovXHJcblx0R0FNRV9QQVVTRSxcclxuXHQvKiog5ri45oiP5oGi5aSNICovXHJcblx0R0FNRV9SRVNVTUUsXHJcblx0LyoqIOa4uOaIj+aXtumXtOe8qeaUvuWAvOS/ruaUuSAqL1xyXG5cdFRJTUVfU0NBTEUsXHJcblxyXG5cdC8qKiDnm7jmnLrnp7vliqggKi9cclxuXHRDQU1FUkFfTU9WRSxcclxuXHJcblx0RVZFTlRfVEVTVDEsXHJcblx0RVZFTlRfVEVTVDIsXHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0VVBEQVRFX0NPSU4sXHJcblx0QUREX0NPSU4sXHJcblx0UkVEVUNFX0NPSU4sXHJcblxyXG5cdEpVREdfUkVTVUxULFxyXG5cclxuXHRFWENVVEVfR1VJREVfVEFTS1xyXG5cclxufTtcclxuIl19