"use strict";
cc._RF.push(module, 'ef198yB6J9HNLLc2uAV3Rwx', 'GodGuide');
// scripts/showcase/home/guide/GodGuide.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GodGuide = void 0;
var EventName_1 = require("../../../common/const/EventName");
var Events_1 = require("../../../common/util/Events");
var GuideTaskIndex_1 = require("./task/GuideTaskIndex");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// declare let require: (string) => any;
// let async = require('async');
var async = require("async");
var GodGuide = /** @class */ (function (_super) {
    __extends(GodGuide, _super);
    function GodGuide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**手指预制件 */
        _this.fingerPrefab = null;
        _this._finger = null;
        _this._mask = null;
        _this._targetNode = null; //引导的目标（也就是要引导玩家操作的目标）
        return _this;
    }
    GodGuide_1 = GodGuide;
    GodGuide.prototype.onLoad = function () {
        Events_1.default.targetOn(this);
        if (this.fingerPrefab) {
            /**若要进行资源引用计数管理 应使用Res中的instantiate进行加载 */
            this._finger = cc.instantiate(this.fingerPrefab);
            this._finger.parent = this.node;
            this._finger.active = false;
            //this._finger.getComponent("GuideFinger").stopAnim() //手指可以挂一些动画脚本
        }
        this.node.setContentSize(cc.winSize);
        this.node.on(cc.Node.EventType.TOUCH_START, this.addSetSwallowTouchesEventListener, this);
        this._mask = this.node.getComponentInChildren(cc.Mask);
        this._mask.node.active = false; //mask遮挡面板默认不开启，只有在引导时在开启
    };
    GodGuide.prototype.onDestroy = function () {
        Events_1.default.targetOff(this);
    };
    /**
     * 由事件进行派发的引导处理
     * @param data
     */
    GodGuide.prototype.excuteGuideTask = function (data) {
        var _this = this;
        console.log("接收的引导数据", data);
        this._mask.node.active = true; //引导前开启遮挡面板
        var flie = GuideTaskIndex_1.default["" + data];
        var task = flie.task;
        this._targetNode = null; //每次引导执行前，都将之前的引导目标清空
        async.eachSeries(task.steps, function (step, cb) {
            _this._processStep(step, cb);
        }, function () {
            _this._mask._graphics.clear();
            _this._mask.node.active = false; //关闭遮挡面板
            _this._finger.active = false;
        });
    };
    /**执行引导步骤 */
    GodGuide.prototype._processStep = function (step, callback) {
        var _this = this;
        //调用async.series来执行引导的步骤
        async.series({
            stepStart: function (markonCb) {
                if (step.onStart) {
                    step.onStart(function () {
                        markonCb();
                    });
                }
                else {
                    markonCb();
                }
            },
            stepExcute: function (markonCb) {
                if (step.onExcute) {
                    step.onExcute(function () {
                        _this.scheduleOnce(function () {
                            var cmd = GodGuide_1[step.command.cmd];
                            if (cmd) {
                                cmd(_this, step, function (error) {
                                    markonCb(error);
                                });
                            }
                        }, step.delayTime || 0);
                    });
                }
                else {
                    markonCb();
                }
            },
            stepEnd: function (markonCb) {
                if (step.onEnd) {
                    step.onEnd(function () {
                        markonCb();
                    });
                }
                else {
                    markonCb();
                }
            },
        }, function (error, result) {
            if (error) {
                //如果存在意外终止 doSomething。。。。
                return;
            }
            //引导执行完毕
            callback();
        });
    };
    /**
     * 事件的吞没处理机制
     */
    GodGuide.prototype.addSetSwallowTouchesEventListener = function (event) {
        if (!this._mask.node.active) {
            this.node._touchListener.setSwallowTouches(false);
            return;
        }
        if (!this._targetNode) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        if (!cc.isValid(this._targetNode)) {
            return;
        }
        var rect = this._targetNode.getBoundingBoxToWorld();
        if (rect.contains(event.getLocation())) {
            //如果玩家点击了规定的区域，则让事件往下派发
            this.node._touchListener.setSwallowTouches(false);
        }
        else {
            this.node._touchListener.setSwallowTouches(true);
        }
    };
    GodGuide.movefinger = function (guideTaskMgr, step, callback) {
        var params = step.command;
        guideTaskMgr._targetNode = null; //先置空之前查找的目标节点
        //开始查找新的目标节点
        guideTaskMgr.find(params.args, function (node, rect) {
            //查找到之后并且聚焦过去
            guideTaskMgr.fingerToNode(node, function () {
                guideTaskMgr._targetNode = node; //赋值新的查找到的目标节点
                node.once(cc.Node.EventType.TOUCH_END, function () {
                    callback();
                    console.log("点击目标节点成功");
                });
            });
        });
    };
    //******************工具集函数********************* */
    /**
     * 查找节点
     * @param value
     * @param cb
     */
    GodGuide.prototype.find = function (value, cb) {
        var _this = this;
        var root = cc.find('Canvas');
        // let root = this.node.parent
        this.locateNode(root, value, function (error, node) {
            if (error) {
                console.log("查找节点失败", value);
                return;
            }
            var rect = _this._focusToNode(node);
            if (cb) {
                console.log("查找节点成功", value);
                cb(node, rect);
            }
        });
    };
    /**
    * 路径特殊字符使用正则表达式进行拆分
    * @param locator 查询的路径配置，形如：'bottom/bag/bagContent/casting',
    */
    GodGuide.prototype.parse = function (locator) {
        var names = locator.split(/[.,//,>,#]/g);
        var segments = names.map(function (name) {
            var index = locator.indexOf(name);
            var symbol = locator[index - 1] || '/';
            return { symbol: symbol, name: name.trim() };
        });
        return segments;
    };
    /**
    * 根据查找路径和根节点定位要查找的目标节点
    * @param root
    * @param locator
    * @param cb
    */
    GodGuide.prototype.locateNode = function (root, locator, cb) {
        var segments = this.parse(locator);
        var child = null, node = root;
        for (var i = 0; i < segments.length; i++) {
            var item = segments[i];
            switch (item.symbol) {
                case '/':
                    child = node.getChildByName(item.name);
                    break;
            }
            if (!child) {
                node = null;
                break;
            }
            node = child;
        }
        if (node && node.active && cb) {
            cb(null, node);
        }
        else {
            cb(locator);
        }
        return node;
    };
    /**
     * 聚焦到目标节点并绘制图形
     * @param node 查找的节点
     */
    GodGuide.prototype._focusToNode = function (node) {
        this._mask._graphics.clear();
        var rect = node.getBoundingBoxToWorld();
        var p = this.node.convertToNodeSpaceAR(rect.origin);
        rect.x = p.x;
        rect.y = p.y;
        this._mask._graphics.fillRect(rect.x, rect.y, rect.width, rect.height);
        return rect;
    };
    /**
     * 移动手指到目标节点
     * @param node
     * @param markonCb
     */
    GodGuide.prototype.fingerToNode = function (node, markonCb) {
        if (!this._finger) {
            markonCb();
        }
        this._finger.active = true;
        this._finger.stopAllActions();
        var p = this.node.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.position));
        this._finger.setPosition(cc.v3(p.x + 100, p.y));
        //this._finger.getComponent("GuideFinger").playAnim(); //手指可以挂一些动画脚本，用来控制动画播放
        markonCb();
    };
    var GodGuide_1;
    __decorate([
        property(cc.Prefab)
    ], GodGuide.prototype, "fingerPrefab", void 0);
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.EXCUTE_GUIDE_TASK)
    ], GodGuide.prototype, "excuteGuideTask", null);
    GodGuide = GodGuide_1 = __decorate([
        ccclass
    ], GodGuide);
    return GodGuide;
}(cc.Component));
exports.GodGuide = GodGuide;

cc._RF.pop();