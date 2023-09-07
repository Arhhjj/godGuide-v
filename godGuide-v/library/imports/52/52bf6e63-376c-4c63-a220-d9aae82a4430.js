"use strict";
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