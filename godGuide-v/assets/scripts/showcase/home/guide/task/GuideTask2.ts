
/**xx任务引导 */

const task = {
    name: 'xx',
    debug: false,
    steps: [
        {
            order: 0,  //数组索引为0
            name: 'GuideTask2',
            command: {
                cmd: 'movefinger',
                text: '点击冒险按钮',
                args: 'bottom/btns/btn1',
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
        }
    ]
}

const guideTask = {
    task: task
}

export default guideTask