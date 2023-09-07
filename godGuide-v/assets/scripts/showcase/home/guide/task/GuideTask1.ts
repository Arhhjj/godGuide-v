
/**主界面任务引导 */

const task = {
    name: 'home',
    debug: false,
    steps: [
        {
            order: 0,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击冒险按钮',
                args: 'MainLayer/Home/bottom/btns/btn1',
            },
            delayTime: 0.5,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
        {
            order: 1,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '冒险关闭按钮',
                args: 'DialogLayer/DlgLevel/bg/closeButton',
            },
            delayTime: 0.5,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
        {
            order: 2,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击签到按钮',
                args: 'MainLayer/Home/bottom/btns/btn2',
            },
            delayTime: 0,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
        {
            order: 3,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '签到关闭按钮',
                args: 'DialogLayer/DlgSign/bg/closeButton',
            },
            delayTime: 0.5,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
        {
            order: 4,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击角色按钮',
                args: 'MainLayer/Home/bottom/btns/btn3',
            },
            delayTime: 0,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
        {
            order: 5,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '角色关闭按钮',
                args: 'DialogLayer/DlgRole/bg/closeButton',
            },
            delayTime: 0.5,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
        {
            order: 6,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '点击商店按钮',
                args: 'MainLayer/Home/bottom/btns/btn4',
            },
            delayTime: 0,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
        {
            order: 7,  //数组索引为0
            name: 'GuideTask1',
            command: {
                cmd: 'movefinger',
                text: '商店关闭按钮',
                args: 'DialogLayer/DlgStore/bg/closeButton',
            },
            delayTime: 0.5,
            onStart(callback) {
                callback();
            },
            onExcute(callback) {
                callback();
            },
            onEnd(callback) {
                callback();
            }
        },
    ]
}

const guideTask = {
    task: task
}

export default guideTask