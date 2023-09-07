"use strict";
cc._RF.push(module, '388a8dJ3CZNBI9gxOj8fQio', 'GuideTask1');
// scripts/showcase/home/guide/task/GuideTask1.ts

"use strict";
/**主界面任务引导 */
Object.defineProperty(exports, "__esModule", { value: true });
var task = {
    name: 'home',
    debug: false,
    steps: [
        {
            order: 0,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击冒险按钮',
                args: 'MainLayer/Home/bottom/btns/btn1',
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
        },
        {
            order: 1,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '冒险关闭按钮',
                args: 'DialogLayer/DlgLevel/bg/closeButton',
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
        },
        {
            order: 2,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击签到按钮',
                args: 'MainLayer/Home/bottom/btns/btn2',
            },
            delayTime: 0,
            onStart: function (callback) {
                callback();
            },
            onExcute: function (callback) {
                callback();
            },
            onEnd: function (callback) {
                callback();
            }
        },
        {
            order: 3,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '签到关闭按钮',
                args: 'DialogLayer/DlgSign/bg/closeButton',
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
        },
        {
            order: 4,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击角色按钮',
                args: 'MainLayer/Home/bottom/btns/btn3',
            },
            delayTime: 0,
            onStart: function (callback) {
                callback();
            },
            onExcute: function (callback) {
                callback();
            },
            onEnd: function (callback) {
                callback();
            }
        },
        {
            order: 5,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '角色关闭按钮',
                args: 'DialogLayer/DlgRole/bg/closeButton',
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
        },
        {
            order: 6,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击商店按钮',
                args: 'MainLayer/Home/bottom/btns/btn4',
            },
            delayTime: 0,
            onStart: function (callback) {
                callback();
            },
            onExcute: function (callback) {
                callback();
            },
            onEnd: function (callback) {
                callback();
            }
        },
        {
            order: 7,
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '商店关闭按钮',
                args: 'DialogLayer/DlgStore/bg/closeButton',
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
        },
    ]
};
var guideTask = {
    task: task
};
exports.default = guideTask;

cc._RF.pop();