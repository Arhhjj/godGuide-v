
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/guide/task/GuideTask1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXGd1aWRlXFx0YXNrXFxHdWlkZVRhc2sxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxhQUFhOztBQUViLElBQU0sSUFBSSxHQUFHO0lBQ1QsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsS0FBSztJQUNaLEtBQUssRUFBRTtRQUNIO1lBQ0ksS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsWUFBWTtZQUNsQixPQUFPLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxpQ0FBaUM7YUFDMUM7WUFDRCxTQUFTLEVBQUUsR0FBRztZQUNkLE9BQU8sWUFBQyxRQUFRO2dCQUNaLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQztZQUNELFFBQVEsWUFBQyxRQUFRO2dCQUNiLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQztZQUNELEtBQUssWUFBQyxRQUFRO2dCQUNWLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQztTQUNKO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksRUFBRSxZQUFZO1lBQ2xCLE9BQU8sRUFBRTtnQkFDTCxHQUFHLEVBQUUsWUFBWTtnQkFDakIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLHFDQUFxQzthQUM5QztZQUNELFNBQVMsRUFBRSxHQUFHO1lBQ2QsT0FBTyxZQUFDLFFBQVE7Z0JBQ1osUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDO1lBQ0QsUUFBUSxZQUFDLFFBQVE7Z0JBQ2IsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDO1lBQ0QsS0FBSyxZQUFDLFFBQVE7Z0JBQ1YsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDO1NBQ0o7UUFDRDtZQUNJLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsT0FBTyxFQUFFO2dCQUNM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S0FDSjtDQUNKLENBQUE7QUFFRCxJQUFNLFNBQVMsR0FBRztJQUNkLElBQUksRUFBRSxJQUFJO0NBQ2IsQ0FBQTtBQUVELGtCQUFlLFNBQVMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKirkuLvnlYzpnaLku7vliqHlvJXlr7wgKi9cclxuXHJcbmNvbnN0IHRhc2sgPSB7XHJcbiAgICBuYW1lOiAnaG9tZScsXHJcbiAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICBzdGVwczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3JkZXI6IDAsICAvL+aVsOe7hOe0ouW8leS4ujBcclxuICAgICAgICAgICAgbmFtZTogJ0d1aWRlVGFzazEnLFxyXG4gICAgICAgICAgICBjb21tYW5kOiB7XHJcbiAgICAgICAgICAgICAgICBjbWQ6ICdtb3ZlZmluZ2VyJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfngrnlh7vlhpLpmanmjInpkq4nLFxyXG4gICAgICAgICAgICAgICAgYXJnczogJ01haW5MYXllci9Ib21lL2JvdHRvbS9idG5zL2J0bjEnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAuNSxcclxuICAgICAgICAgICAgb25TdGFydChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FeGN1dGUoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRW5kKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9yZGVyOiAxLCAgLy/mlbDnu4TntKLlvJXkuLowXHJcbiAgICAgICAgICAgIG5hbWU6ICdHdWlkZVRhc2sxJyxcclxuICAgICAgICAgICAgY29tbWFuZDoge1xyXG4gICAgICAgICAgICAgICAgY21kOiAnbW92ZWZpbmdlcicsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5YaS6Zmp5YWz6Zet5oyJ6ZKuJyxcclxuICAgICAgICAgICAgICAgIGFyZ3M6ICdEaWFsb2dMYXllci9EbGdMZXZlbC9iZy9jbG9zZUJ1dHRvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGF5VGltZTogMC41LFxyXG4gICAgICAgICAgICBvblN0YXJ0KGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkV4Y3V0ZShjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FbmQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3JkZXI6IDIsICAvL+aVsOe7hOe0ouW8leS4ujBcclxuICAgICAgICAgICAgbmFtZTogJ0d1aWRlVGFzazEnLFxyXG4gICAgICAgICAgICBjb21tYW5kOiB7XHJcbiAgICAgICAgICAgICAgICBjbWQ6ICdtb3ZlZmluZ2VyJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfngrnlh7vnrb7liLDmjInpkq4nLFxyXG4gICAgICAgICAgICAgICAgYXJnczogJ01haW5MYXllci9Ib21lL2JvdHRvbS9idG5zL2J0bjInLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAsXHJcbiAgICAgICAgICAgIG9uU3RhcnQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRXhjdXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVuZChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvcmRlcjogMywgIC8v5pWw57uE57Si5byV5Li6MFxyXG4gICAgICAgICAgICBuYW1lOiAnR3VpZGVUYXNrMScsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IHtcclxuICAgICAgICAgICAgICAgIGNtZDogJ21vdmVmaW5nZXInLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+etvuWIsOWFs+mXreaMiemSricsXHJcbiAgICAgICAgICAgICAgICBhcmdzOiAnRGlhbG9nTGF5ZXIvRGxnU2lnbi9iZy9jbG9zZUJ1dHRvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGF5VGltZTogMC41LFxyXG4gICAgICAgICAgICBvblN0YXJ0KGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkV4Y3V0ZShjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FbmQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3JkZXI6IDQsICAvL+aVsOe7hOe0ouW8leS4ujBcclxuICAgICAgICAgICAgbmFtZTogJ0d1aWRlVGFzazEnLFxyXG4gICAgICAgICAgICBjb21tYW5kOiB7XHJcbiAgICAgICAgICAgICAgICBjbWQ6ICdtb3ZlZmluZ2VyJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfngrnlh7vop5LoibLmjInpkq4nLFxyXG4gICAgICAgICAgICAgICAgYXJnczogJ01haW5MYXllci9Ib21lL2JvdHRvbS9idG5zL2J0bjMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAsXHJcbiAgICAgICAgICAgIG9uU3RhcnQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRXhjdXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVuZChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvcmRlcjogNSwgIC8v5pWw57uE57Si5byV5Li6MFxyXG4gICAgICAgICAgICBuYW1lOiAnR3VpZGVUYXNrMScsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IHtcclxuICAgICAgICAgICAgICAgIGNtZDogJ21vdmVmaW5nZXInLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+inkuiJsuWFs+mXreaMiemSricsXHJcbiAgICAgICAgICAgICAgICBhcmdzOiAnRGlhbG9nTGF5ZXIvRGxnUm9sZS9iZy9jbG9zZUJ1dHRvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGF5VGltZTogMC41LFxyXG4gICAgICAgICAgICBvblN0YXJ0KGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkV4Y3V0ZShjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FbmQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3JkZXI6IDYsICAvL+aVsOe7hOe0ouW8leS4ujBcclxuICAgICAgICAgICAgbmFtZTogJ0d1aWRlVGFzazEnLFxyXG4gICAgICAgICAgICBjb21tYW5kOiB7XHJcbiAgICAgICAgICAgICAgICBjbWQ6ICdtb3ZlZmluZ2VyJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfngrnlh7vllYblupfmjInpkq4nLFxyXG4gICAgICAgICAgICAgICAgYXJnczogJ01haW5MYXllci9Ib21lL2JvdHRvbS9idG5zL2J0bjQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAsXHJcbiAgICAgICAgICAgIG9uU3RhcnQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRXhjdXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVuZChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvcmRlcjogNywgIC8v5pWw57uE57Si5byV5Li6MFxyXG4gICAgICAgICAgICBuYW1lOiAnR3VpZGVUYXNrMScsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IHtcclxuICAgICAgICAgICAgICAgIGNtZDogJ21vdmVmaW5nZXInLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WVhuW6l+WFs+mXreaMiemSricsXHJcbiAgICAgICAgICAgICAgICBhcmdzOiAnRGlhbG9nTGF5ZXIvRGxnU3RvcmUvYmcvY2xvc2VCdXR0b24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAuNSxcclxuICAgICAgICAgICAgb25TdGFydChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FeGN1dGUoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRW5kKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIF1cclxufVxyXG5cclxuY29uc3QgZ3VpZGVUYXNrID0ge1xyXG4gICAgdGFzazogdGFza1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBndWlkZVRhc2siXX0=