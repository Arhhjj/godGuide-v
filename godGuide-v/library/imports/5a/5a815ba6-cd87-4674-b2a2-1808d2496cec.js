"use strict";
cc._RF.push(module, '5a815umzYdGdLKiGAjSSWzs', 'GuideTask2');
// scripts/showcase/home/guide/task/GuideTask2.ts

"use strict";
/**xx任务引导 */
Object.defineProperty(exports, "__esModule", { value: true });
var task = {
    name: 'xx',
    debug: false,
    steps: [
        {
            order: 0,
            name: 'GuideTask2',
            command: {
                cmd: 'movefinger',
                text: '点击冒险按钮',
                args: 'bottom/btns/btn1',
            },
            delayTime: 0.5,
            onStart: function (callback) {
                callback();
            },
            onExcute: function (callback) {
                callback();
            },
            onEnd: function (callback) {
                callback();
            }
        }
    ]
};
var guideTask = {
    task: task
};
exports.default = guideTask;

cc._RF.pop();