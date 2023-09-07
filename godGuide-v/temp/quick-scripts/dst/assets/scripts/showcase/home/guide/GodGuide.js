
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/guide/GodGuide.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXGd1aWRlXFxHb2RHdWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQTREO0FBQzVELHNEQUFtRTtBQUVuRSx3REFBK0M7QUFFekMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsd0NBQXdDO0FBQ3hDLGdDQUFnQztBQUVoQyw2QkFBOEI7QUFHOUI7SUFBOEIsNEJBQVk7SUFBMUM7UUFBQSxxRUFrUUM7UUFoUUcsV0FBVztRQUNVLGtCQUFZLEdBQWMsSUFBSSxDQUFBO1FBRTNDLGFBQU8sR0FBWSxJQUFJLENBQUE7UUFDdkIsV0FBSyxHQUFZLElBQUksQ0FBQTtRQUNyQixpQkFBVyxHQUFRLElBQUksQ0FBQSxDQUFBLHNCQUFzQjs7SUEyUHpELENBQUM7aUJBbFFZLFFBQVE7SUFTakIseUJBQU0sR0FBTjtRQUNJLGdCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXJCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQiwwQ0FBMEM7WUFFMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtZQUMzQixtRUFBbUU7U0FDdEU7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxF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LElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsNkVBQTZFO1FBQzdFLFFBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7SUE1UG9CO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUErQjtJQWtDbkQ7UUFEQyxxQkFBWSxDQUFDLHFCQUFTLENBQUMsaUJBQWlCLENBQUM7bURBa0J6QztJQXREUSxRQUFRO1FBRHBCLE9BQU87T0FDSyxRQUFRLENBa1FwQjtJQUFELGVBQUM7Q0FsUUQsQUFrUUMsQ0FsUTZCLEVBQUUsQ0FBQyxTQUFTLEdBa1F6QztBQWxRWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29uc3QvRXZlbnROYW1lXCI7XHJcbmltcG9ydCBFdmVudHMsIHsgcHJlbG9hZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi91dGlsL0V2ZW50c1wiO1xyXG5pbXBvcnQgUmVzIGZyb20gXCIuLi8uLi8uLi9jb21tb24vdXRpbC9SZXNcIjtcclxuaW1wb3J0IGd1aWRlVGFza3MgZnJvbSBcIi4vdGFzay9HdWlkZVRhc2tJbmRleFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuLy8gZGVjbGFyZSBsZXQgcmVxdWlyZTogKHN0cmluZykgPT4gYW55O1xyXG4vLyBsZXQgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpO1xyXG5cclxuaW1wb3J0ICogYXMgYXN5bmMgZnJvbSAnYXN5bmMnXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgR29kR3VpZGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8qKuaJi+aMh+mihOWItuS7tiAqL1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYikgZmluZ2VyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBfZmluZ2VyOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfbWFzazogY2MuTWFzayA9IG51bGxcclxuICAgIHByaXZhdGUgX3RhcmdldE5vZGU6IGFueSA9IG51bGwvL+W8leWvvOeahOebruagh++8iOS5n+WwseaYr+imgeW8leWvvOeOqeWutuaTjeS9nOeahOebruagh++8iVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T24odGhpcylcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmluZ2VyUHJlZmFiKSB7XHJcbiAgICAgICAgICAgIC8qKuiLpeimgei/m+ihjOi1hOa6kOW8leeUqOiuoeaVsOeuoeeQhiDlupTkvb/nlKhSZXPkuK3nmoRpbnN0YW50aWF0Zei/m+ihjOWKoOi9vSAqL1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmluZ2VyID0gY2MuaW5zdGFudGlhdGUodGhpcy5maW5nZXJQcmVmYWIpXHJcbiAgICAgICAgICAgIHRoaXMuX2Zpbmdlci5wYXJlbnQgPSB0aGlzLm5vZGVcclxuICAgICAgICAgICAgdGhpcy5fZmluZ2VyLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIC8vdGhpcy5fZmluZ2VyLmdldENvbXBvbmVudChcIkd1aWRlRmluZ2VyXCIpLnN0b3BBbmltKCkgLy/miYvmjIflj6/ku6XmjILkuIDkupvliqjnlLvohJrmnKxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShjYy53aW5TaXplKVxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5hZGRTZXRTd2FsbG93VG91Y2hlc0V2ZW50TGlzdGVuZXIsIHRoaXMpXHJcblxyXG4gICAgICAgIHRoaXMuX21hc2sgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5NYXNrKVxyXG4gICAgICAgIHRoaXMuX21hc2subm9kZS5hY3RpdmUgPSBmYWxzZSAvL21hc2vpga7mjKHpnaLmnb/pu5jorqTkuI3lvIDlkK/vvIzlj6rmnInlnKjlvJXlr7zml7blnKjlvIDlkK9cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50cy50YXJnZXRPZmYodGhpcylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUseS6i+S7tui/m+ihjOa0vuWPkeeahOW8leWvvOWkhOeQhlxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIEBwcmVsb2FkRXZlbnQoRXZlbnROYW1lLkVYQ1VURV9HVUlERV9UQVNLKVxyXG4gICAgZXhjdXRlR3VpZGVUYXNrKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeaUtueahOW8leWvvOaVsOaNrlwiLCBkYXRhKTtcclxuICAgICAgICB0aGlzLl9tYXNrLm5vZGUuYWN0aXZlID0gdHJ1ZTsgIC8v5byV5a+85YmN5byA5ZCv6YGu5oyh6Z2i5p2/XHJcblxyXG4gICAgICAgIGxldCBmbGllID0gZ3VpZGVUYXNrc1tgJHtkYXRhfWBdXHJcbiAgICAgICAgbGV0IHRhc2sgPSBmbGllLnRhc2tcclxuXHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0Tm9kZSA9IG51bGw7IC8v5q+P5qyh5byV5a+85omn6KGM5YmN77yM6YO95bCG5LmL5YmN55qE5byV5a+855uu5qCH5riF56m6XHJcblxyXG4gICAgICAgIGFzeW5jLmVhY2hTZXJpZXModGFzay5zdGVwcywgKHN0ZXAsIGNiKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NTdGVwKHN0ZXAsIGNiKVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFzay5fZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFzay5ub2RlLmFjdGl2ZSA9IGZhbHNlOy8v5YWz6Zet6YGu5oyh6Z2i5p2/XHJcbiAgICAgICAgICAgIHRoaXMuX2Zpbmdlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirmiafooYzlvJXlr7zmraXpqqQgKi9cclxuICAgIF9wcm9jZXNzU3RlcChzdGVwLCBjYWxsYmFjaykge1xyXG4gICAgICAgIC8v6LCD55SoYXN5bmMuc2VyaWVz5p2l5omn6KGM5byV5a+855qE5q2l6aqkXHJcbiAgICAgICAgYXN5bmMuc2VyaWVzKHtcclxuICAgICAgICAgICAgc3RlcFN0YXJ0KG1hcmtvbkNiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5vblN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5vblN0YXJ0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya29uQ2IoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya29uQ2IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RlcEV4Y3V0ZTogKG1hcmtvbkNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5vbkV4Y3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAub25FeGN1dGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY21kID0gR29kR3VpZGVbc3RlcC5jb21tYW5kLmNtZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY21kKHRoaXMsIHN0ZXAsIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrb25DYihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHN0ZXAuZGVsYXlUaW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrb25DYigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdGVwRW5kOiAobWFya29uQ2IpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGVwLm9uRW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5vbkVuZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtvbkNiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtvbkNiKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5a2Y5Zyo5oSP5aSW57uI5q2iIGRvU29tZXRoaW5n44CC44CC44CC44CCXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+W8leWvvOaJp+ihjOWujOavlVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6i+S7tueahOWQnuayoeWkhOeQhuacuuWItlxyXG4gICAgICovXHJcbiAgICBhZGRTZXRTd2FsbG93VG91Y2hlc0V2ZW50TGlzdGVuZXIoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hc2subm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX3RhcmdldE5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl90YXJnZXROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5fdGFyZ2V0Tm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcclxuICAgICAgICBpZiAocmVjdC5jb250YWlucyhldmVudC5nZXRMb2NhdGlvbigpKSkge1xyXG4gICAgICAgICAgICAvL+WmguaenOeOqeWutueCueWHu+S6huinhOWumueahOWMuuWfn++8jOWImeiuqeS6i+S7tuW+gOS4i+a0vuWPkVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG1vdmVmaW5nZXIoZ3VpZGVUYXNrTWdyOiBHb2RHdWlkZSwgc3RlcCwgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0gc3RlcC5jb21tYW5kO1xyXG4gICAgICAgIGd1aWRlVGFza01nci5fdGFyZ2V0Tm9kZSA9IG51bGw7IC8v5YWI572u56m65LmL5YmN5p+l5om+55qE55uu5qCH6IqC54K5XHJcblxyXG4gICAgICAgIC8v5byA5aeL5p+l5om+5paw55qE55uu5qCH6IqC54K5XHJcbiAgICAgICAgZ3VpZGVUYXNrTWdyLmZpbmQocGFyYW1zLmFyZ3MsIChub2RlLCByZWN0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvL+afpeaJvuWIsOS5i+WQjuW5tuS4lOiBmueEpui/h+WOu1xyXG4gICAgICAgICAgICBndWlkZVRhc2tNZ3IuZmluZ2VyVG9Ob2RlKG5vZGUsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBndWlkZVRhc2tNZ3IuX3RhcmdldE5vZGUgPSBub2RlOyAvL+i1i+WAvOaWsOeahOafpeaJvuWIsOeahOebruagh+iKgueCuVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUub25jZShjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi54K55Ye755uu5qCH6IqC54K55oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKuW3peWFt+mbhuWHveaVsCoqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+l5om+6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgXHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZCh2YWx1ZSwgY2I/KSB7XHJcbiAgICAgICAgbGV0IHJvb3QgPSBjYy5maW5kKCdDYW52YXMnKTtcclxuICAgICAgICAvLyBsZXQgcm9vdCA9IHRoaXMubm9kZS5wYXJlbnRcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGVOb2RlKHJvb3QsIHZhbHVlLCAoZXJyb3IsIG5vZGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuafpeaJvuiKgueCueWksei0pVwiLCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IHRoaXMuX2ZvY3VzVG9Ob2RlKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5p+l5om+6IqC54K55oiQ5YqfXCIsIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgY2Iobm9kZSwgcmVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOi3r+W+hOeJueauiuWtl+espuS9v+eUqOato+WImeihqOi+vuW8j+i/m+ihjOaLhuWIhlxyXG4gICAgKiBAcGFyYW0gbG9jYXRvciDmn6Xor6LnmoTot6/lvoTphY3nva7vvIzlvaLlpoLvvJonYm90dG9tL2JhZy9iYWdDb250ZW50L2Nhc3RpbmcnLFxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2UobG9jYXRvcikge1xyXG4gICAgICAgIGxldCBuYW1lcyA9IGxvY2F0b3Iuc3BsaXQoL1suLC8vLD4sI10vZyk7XHJcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gbmFtZXMubWFwKGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGxvY2F0b3IuaW5kZXhPZihuYW1lKTtcclxuICAgICAgICAgICAgbGV0IHN5bWJvbCA9IGxvY2F0b3JbaW5kZXggLSAxXSB8fCAnLyc7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN5bWJvbDogc3ltYm9sLCBuYW1lOiBuYW1lLnRyaW0oKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZWdtZW50cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOagueaNruafpeaJvui3r+W+hOWSjOagueiKgueCueWumuS9jeimgeafpeaJvueahOebruagh+iKgueCuVxyXG4gICAgKiBAcGFyYW0gcm9vdCBcclxuICAgICogQHBhcmFtIGxvY2F0b3IgXHJcbiAgICAqIEBwYXJhbSBjYiBcclxuICAgICovXHJcbiAgICBwcml2YXRlIGxvY2F0ZU5vZGUocm9vdCwgbG9jYXRvciwgY2I/KSB7XHJcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gdGhpcy5wYXJzZShsb2NhdG9yKTtcclxuICAgICAgICBsZXQgY2hpbGQgPSBudWxsLCBub2RlID0gcm9vdDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlZ21lbnRzW2ldO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uc3ltYm9sKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoaXRlbS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUgPSBjaGlsZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5hY3RpdmUgJiYgY2IpIHtcclxuICAgICAgICAgICAgY2IobnVsbCwgbm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2IobG9jYXRvcilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6IGa54Sm5Yiw55uu5qCH6IqC54K55bm257uY5Yi25Zu+5b2iXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDmn6Xmib7nmoToioLngrlcclxuICAgICAqL1xyXG4gICAgX2ZvY3VzVG9Ob2RlKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLl9tYXNrLl9ncmFwaGljcy5jbGVhcigpO1xyXG5cclxuICAgICAgICBsZXQgcmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XHJcbiAgICAgICAgbGV0IHAgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocmVjdC5vcmlnaW4pO1xyXG4gICAgICAgIHJlY3QueCA9IHAueDtcclxuICAgICAgICByZWN0LnkgPSBwLnk7XHJcbiAgICAgICAgdGhpcy5fbWFzay5fZ3JhcGhpY3MuZmlsbFJlY3QocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gcmVjdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqjmiYvmjIfliLDnm67moIfoioLngrlcclxuICAgICAqIEBwYXJhbSBub2RlIFxyXG4gICAgICogQHBhcmFtIG1hcmtvbkNiIFxyXG4gICAgICovXHJcbiAgICBmaW5nZXJUb05vZGUobm9kZSwgbWFya29uQ2IpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2Zpbmdlcikge1xyXG4gICAgICAgICAgICBtYXJrb25DYigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maW5nZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9maW5nZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBsZXQgcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIHRoaXMuX2Zpbmdlci5zZXRQb3NpdGlvbihjYy52MyhwLnggKyAxMDAsIHAueSkpO1xyXG4gICAgICAgIC8vdGhpcy5fZmluZ2VyLmdldENvbXBvbmVudChcIkd1aWRlRmluZ2VyXCIpLnBsYXlBbmltKCk7IC8v5omL5oyH5Y+v5Lul5oyC5LiA5Lqb5Yqo55S76ISa5pys77yM55So5p2l5o6n5Yi25Yqo55S75pKt5pS+XHJcbiAgICAgICAgbWFya29uQ2IoKTtcclxuICAgIH1cclxuXHJcblxyXG59Il19