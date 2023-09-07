
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/guide/task/GuideTask2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXGd1aWRlXFx0YXNrXFxHdWlkZVRhc2syLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxZQUFZOztBQUVaLElBQU0sSUFBSSxHQUFHO0lBQ1QsSUFBSSxFQUFFLElBQUk7SUFDVixLQUFLLEVBQUUsS0FBSztJQUNaLEtBQUssRUFBRTtRQUNIO1lBQ0ksS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsWUFBWTtZQUNsQixPQUFPLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxrQkFBa0I7YUFDM0I7WUFDRCxTQUFTLEVBQUUsR0FBRztZQUNkLE9BQU8sWUFBQyxRQUFRO2dCQUNaLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQztZQUNELFFBQVEsWUFBQyxRQUFRO2dCQUNiLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQztZQUNELEtBQUssWUFBQyxRQUFRO2dCQUNWLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQztTQUNKO0tBQ0o7Q0FDSixDQUFBO0FBRUQsSUFBTSxTQUFTLEdBQUc7SUFDZCxJQUFJLEVBQUUsSUFBSTtDQUNiLENBQUE7QUFFRCxrQkFBZSxTQUFTLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqeHjku7vliqHlvJXlr7wgKi9cclxuXHJcbmNvbnN0IHRhc2sgPSB7XHJcbiAgICBuYW1lOiAneHgnLFxyXG4gICAgZGVidWc6IGZhbHNlLFxyXG4gICAgc3RlcHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9yZGVyOiAwLCAgLy/mlbDnu4TntKLlvJXkuLowXHJcbiAgICAgICAgICAgIG5hbWU6ICdHdWlkZVRhc2syJyxcclxuICAgICAgICAgICAgY29tbWFuZDoge1xyXG4gICAgICAgICAgICAgICAgY21kOiAnbW92ZWZpbmdlcicsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn54K55Ye75YaS6Zmp5oyJ6ZKuJyxcclxuICAgICAgICAgICAgICAgIGFyZ3M6ICdib3R0b20vYnRucy9idG4xJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsYXlUaW1lOiAwLjUsXHJcbiAgICAgICAgICAgIG9uU3RhcnQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRXhjdXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVuZChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufVxyXG5cclxuY29uc3QgZ3VpZGVUYXNrID0ge1xyXG4gICAgdGFzazogdGFza1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBndWlkZVRhc2siXX0=