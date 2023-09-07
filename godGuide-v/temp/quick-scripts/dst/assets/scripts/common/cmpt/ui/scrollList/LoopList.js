
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/scrollList/LoopList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47957NchK9M3pnXr5DdUH/B', 'LoopList');
// scripts/common/cmpt/ui/scrollList/LoopList.ts

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
var Res_1 = require("../../../util/Res");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/** 列表元素模板类型 */
var TemplateType;
(function (TemplateType) {
    TemplateType[TemplateType["NODE"] = 0] = "NODE";
    TemplateType[TemplateType["PREFAB"] = 1] = "PREFAB";
})(TemplateType || (TemplateType = {}));
/**
 * 无限循环列表(轮播图)
 */
var LoopList = /** @class */ (function (_super) {
    __extends(LoopList, _super);
    function LoopList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateType = TemplateType.PREFAB;
        _this.templatePrefab = null;
        _this.templateNode = null;
        _this._firstDirty = false;
        _this._refreshDirty = false;
        /** 当前显示的数据下标 */
        _this._curIdx = 0;
        /** 所有item的中间节点下标 */
        _this._midIdx = 2;
        /** 实际需显示的数据长度 */
        _this._dataLen = 0;
        _this._refreshCall = null;
        _this._target = null;
        _this._pageView = null;
        return _this;
    }
    Object.defineProperty(LoopList.prototype, "pageView", {
        get: function () {
            if (!this._pageView) {
                this._pageView = this.getComponent(cc.PageView);
            }
            return this._pageView;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoopList.prototype, "view", {
        get: function () { return this.pageView.content.parent; },
        enumerable: false,
        configurable: true
    });
    LoopList.prototype.start = function () {
        // 注册事件
        this.node.on("scroll-ended", this.onScrollEnd, this);
    };
    LoopList.prototype.lateUpdate = function () {
        if (this.pageView.getPages().length === 0) {
            return;
        }
        if (this._firstDirty) {
            this._firstDirty = false;
            this.pageView.setContentPosition(cc.v2(-this.view.width / 2 - this._midIdx * this.view.width, 0));
            this.pageView.setCurrentPageIndex(this._midIdx);
        }
        if (this._refreshDirty) {
            this._refreshDirty = false;
            this.refresh();
        }
    };
    /**
     * 初始化循环列表
     * @param length 数据长度
     * @param curIdx 初始显示的数据
     * @param refreshCall 每个item刷新时的回调
     * @param target 调用refreshCall时的this
     */
    LoopList.prototype.onInit = function (length, curIdx, refreshCall, target) {
        if (target === void 0) { target = null; }
        this._dataLen = length;
        this._curIdx = cc.misc.clampf(curIdx, 0, this._dataLen - 1);
        this._refreshCall = refreshCall;
        this._target = target;
        this._firstDirty = true;
        this._refreshDirty = true;
        // 生成节点
        if (this.pageView.getPages().length === 0) {
            var tmp = this.templateType === TemplateType.PREFAB ? this.templatePrefab : this.templateNode;
            for (var i = 0; i < 5; i++) {
                var node = Res_1.default.instantiate(tmp, this.node);
                node.active = true;
                node.setPosition(0, 0);
                this.pageView.addPage(node);
            }
            this.pageView.content.getComponent(cc.Layout).updateLayout();
        }
    };
    /**
     * 重置数据长度与当前显示的数据下标
     */
    LoopList.prototype.resetData = function (length, curIdx) {
        if (curIdx === void 0) { curIdx = null; }
        this._dataLen = length;
        this._curIdx = cc.misc.clampf(curIdx === null ? this._curIdx : curIdx, 0, this._dataLen - 1);
        this._refreshDirty = true;
    };
    /**
     * 根据下标设置当前显示的数据
     */
    LoopList.prototype.setCurIdx = function (curIdx) {
        this._curIdx = curIdx;
        this._refreshDirty = true;
    };
    LoopList.prototype.onScrollEnd = function () {
        var cur = this.pageView.getCurrentPageIndex();
        if (cur === this._midIdx) {
            return;
        }
        this.pageView.setContentPosition(cc.v2(-this.view.width / 2 - this._midIdx * this.view.width, 0));
        this.pageView.setCurrentPageIndex(this._midIdx);
        this._curIdx += cur - this._midIdx;
        while (this._curIdx < 0) {
            this._curIdx += this._dataLen;
        }
        while (this._curIdx > this._dataLen - 1) {
            this._curIdx -= this._dataLen;
        }
        this._refreshDirty = true;
    };
    LoopList.prototype.refresh = function () {
        var _this = this;
        this.pageView.content.children.forEach(function (item, index) {
            var i = _this._curIdx - (_this._midIdx - index);
            while (i < 0) {
                i += _this._dataLen;
            }
            while (i > _this._dataLen - 1) {
                i -= _this._dataLen;
            }
            if (_this._refreshCall) {
                _this._refreshCall.call(_this._target, item, i, i === _this._curIdx);
            }
        });
    };
    /** item刷新事件 */
    LoopList.ITEM_REFRESH = "LoopList-itemRefresh";
    __decorate([
        property({
            type: cc.Enum(TemplateType),
            tooltip: CC_DEV && "列表元素模板类型"
        })
    ], LoopList.prototype, "templateType", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: CC_DEV && "列表元素模板预制体",
            visible: function () { return this.templateType === TemplateType.PREFAB; }
        })
    ], LoopList.prototype, "templatePrefab", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && "列表元素模板节点",
            visible: function () { return this.templateType === TemplateType.NODE; }
        })
    ], LoopList.prototype, "templateNode", void 0);
    LoopList = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(cc.PageView),
        menu("Framework/UI组件/LoopList")
    ], LoopList);
    return LoopList;
}(cc.Component));
exports.default = LoopList;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcc2Nyb2xsTGlzdFxcTG9vcExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBRTlCLElBQUEsS0FBa0UsRUFBRSxDQUFDLFVBQVUsRUFBN0UsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBRXRGLGVBQWU7QUFDZixJQUFLLFlBR0o7QUFIRCxXQUFLLFlBQVk7SUFDYiwrQ0FBSSxDQUFBO0lBQ0osbURBQU0sQ0FBQTtBQUNWLENBQUMsRUFISSxZQUFZLEtBQVosWUFBWSxRQUdoQjtBQUVEOztHQUVHO0FBS0g7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUE4SUM7UUF0SVUsa0JBQVksR0FBaUIsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQU9qRCxvQkFBYyxHQUFjLElBQUksQ0FBQztRQU9qQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUU1QixpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUN2QyxnQkFBZ0I7UUFDUixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLG9CQUFvQjtRQUNaLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFDcEIsaUJBQWlCO1FBQ1QsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGtCQUFZLEdBQXlELElBQUksQ0FBQztRQUMxRSxhQUFPLEdBQVEsSUFBSSxDQUFDO1FBRXBCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDOztJQTJHMUMsQ0FBQztJQTFHRyxzQkFBVyw4QkFBUTthQUFuQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFD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O1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNO1lBQ2YsT0FBTyxFQUFFLE1BQU0sSUFBSSxXQUFXO1lBQzlCLE9BQU8sZ0JBQUssT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2xFLENBQUM7b0RBQ3NDO0lBT3hDO1FBTEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJO1lBQ2IsT0FBTyxFQUFFLE1BQU0sSUFBSSxVQUFVO1lBQzdCLE9BQU8sZ0JBQUssT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2hFLENBQUM7a0RBQ2tDO0lBdEJuQixRQUFRO1FBSjVCLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMseUJBQXlCLENBQUM7T0FDWCxRQUFRLENBOEk1QjtJQUFELGVBQUM7Q0E5SUQsQUE4SUMsQ0E5SXFDLEVBQUUsQ0FBQyxTQUFTLEdBOElqRDtrQkE5SW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzIGZyb20gXCIuLi8uLi8uLi91dGlsL1Jlc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgcmVxdWlyZUNvbXBvbmVudCwgZGlzYWxsb3dNdWx0aXBsZSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKiDliJfooajlhYPntKDmqKHmnb/nsbvlnosgKi9cclxuZW51bSBUZW1wbGF0ZVR5cGUge1xyXG4gICAgTk9ERSxcclxuICAgIFBSRUZBQlxyXG59XHJcblxyXG4vKipcclxuICog5peg6ZmQ5b6q546v5YiX6KGoKOi9ruaSreWbvilcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkByZXF1aXJlQ29tcG9uZW50KGNjLlBhZ2VWaWV3KVxyXG5AbWVudShcIkZyYW1ld29yay9VSee7hOS7ti9Mb29wTGlzdFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb29wTGlzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKiogaXRlbeWIt+aWsOS6i+S7tiAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBJVEVNX1JFRlJFU0g6IHN0cmluZyA9IFwiTG9vcExpc3QtaXRlbVJlZnJlc2hcIjtcclxuXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkVudW0oVGVtcGxhdGVUeXBlKSxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgXCLliJfooajlhYPntKDmqKHmnb/nsbvlnotcIlxyXG4gICAgfSlcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZVR5cGU6IFRlbXBsYXRlVHlwZSA9IFRlbXBsYXRlVHlwZS5QUkVGQUI7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5YiX6KGo5YWD57Sg5qih5p2/6aKE5Yi25L2TXCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudGVtcGxhdGVUeXBlID09PSBUZW1wbGF0ZVR5cGUuUFJFRkFCOyB9XHJcbiAgICB9KVxyXG4gICAgcHVibGljIHRlbXBsYXRlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgXCLliJfooajlhYPntKDmqKHmnb/oioLngrlcIixcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50ZW1wbGF0ZVR5cGUgPT09IFRlbXBsYXRlVHlwZS5OT0RFOyB9XHJcbiAgICB9KVxyXG4gICAgcHVibGljIHRlbXBsYXRlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfZmlyc3REaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfcmVmcmVzaERpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiog5b2T5YmN5pi+56S655qE5pWw5o2u5LiL5qCHICovXHJcbiAgICBwcml2YXRlIF9jdXJJZHggPSAwO1xyXG4gICAgLyoqIOaJgOaciWl0ZW3nmoTkuK3pl7ToioLngrnkuIvmoIcgKi9cclxuICAgIHByaXZhdGUgX21pZElkeCA9IDI7XHJcbiAgICAvKiog5a6e6ZmF6ZyA5pi+56S655qE5pWw5o2u6ZW/5bqmICovXHJcbiAgICBwcml2YXRlIF9kYXRhTGVuID0gMDtcclxuICAgIHByaXZhdGUgX3JlZnJlc2hDYWxsOiAobm9kZTogY2MuTm9kZSwgaWR4OiBudW1iZXIsIGlzQ3VyOiBib29sZWFuKSA9PiB2b2lkID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3RhcmdldDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9wYWdlVmlldzogY2MuUGFnZVZpZXcgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBwYWdlVmlldygpOiBjYy5QYWdlVmlldyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wYWdlVmlldykge1xyXG4gICAgICAgICAgICB0aGlzLl9wYWdlVmlldyA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VWaWV3O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmlldygpOiBjYy5Ob2RlIHsgcmV0dXJuIHRoaXMucGFnZVZpZXcuY29udGVudC5wYXJlbnQ7IH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5rOo5YaM5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsLWVuZGVkXCIsIHRoaXMub25TY3JvbGxFbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsYXRlVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VWaWV3LmdldFBhZ2VzKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcnN0RGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyc3REaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNldENvbnRlbnRQb3NpdGlvbihjYy52MigtdGhpcy52aWV3LndpZHRoIC8gMiAtIHRoaXMuX21pZElkeCAqIHRoaXMudmlldy53aWR0aCwgMCkpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNldEN1cnJlbnRQYWdlSW5kZXgodGhpcy5fbWlkSWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlZnJlc2hEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5b6q546v5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0gbGVuZ3RoIOaVsOaNrumVv+W6plxyXG4gICAgICogQHBhcmFtIGN1cklkeCDliJ3lp4vmmL7npLrnmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSByZWZyZXNoQ2FsbCDmr4/kuKppdGVt5Yi35paw5pe255qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOiwg+eUqHJlZnJlc2hDYWxs5pe255qEdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Jbml0KGxlbmd0aDogbnVtYmVyLCBjdXJJZHg6IG51bWJlciwgcmVmcmVzaENhbGw6IChub2RlOiBjYy5Ob2RlLCBpZHg6IG51bWJlciwgaXNDdXI6IGJvb2xlYW4pID0+IHZvaWQsIHRhcmdldDogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2RhdGFMZW4gPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fY3VySWR4ID0gY2MubWlzYy5jbGFtcGYoY3VySWR4LCAwLCB0aGlzLl9kYXRhTGVuIC0gMSk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaENhbGwgPSByZWZyZXNoQ2FsbDtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5fZmlyc3REaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaERpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8g55Sf5oiQ6IqC54K5XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZVZpZXcuZ2V0UGFnZXMoKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbGV0IHRtcDogYW55ID0gdGhpcy50ZW1wbGF0ZVR5cGUgPT09IFRlbXBsYXRlVHlwZS5QUkVGQUIgPyB0aGlzLnRlbXBsYXRlUHJlZmFiIDogdGhpcy50ZW1wbGF0ZU5vZGU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IFJlcy5pbnN0YW50aWF0ZSh0bXAsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5hZGRQYWdlKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS51cGRhdGVMYXlvdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43nva7mlbDmja7plb/luqbkuI7lvZPliY3mmL7npLrnmoTmlbDmja7kuIvmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0RGF0YShsZW5ndGg6IG51bWJlciwgY3VySWR4OiBudW1iZXIgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YUxlbiA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLl9jdXJJZHggPSBjYy5taXNjLmNsYW1wZihjdXJJZHggPT09IG51bGwgPyB0aGlzLl9jdXJJZHggOiBjdXJJZHgsIDAsIHRoaXMuX2RhdGFMZW4gLSAxKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5LiL5qCH6K6+572u5b2T5YmN5pi+56S655qE5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDdXJJZHgoY3VySWR4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jdXJJZHggPSBjdXJJZHg7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaERpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2Nyb2xsRW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjdXIgPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICBpZiAoY3VyID09PSB0aGlzLl9taWRJZHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LnNldENvbnRlbnRQb3NpdGlvbihjYy52MigtdGhpcy52aWV3LndpZHRoIC8gMiAtIHRoaXMuX21pZElkeCAqIHRoaXMudmlldy53aWR0aCwgMCkpO1xyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuc2V0Q3VycmVudFBhZ2VJbmRleCh0aGlzLl9taWRJZHgpO1xyXG4gICAgICAgIHRoaXMuX2N1cklkeCArPSBjdXIgLSB0aGlzLl9taWRJZHg7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2N1cklkeCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VySWR4ICs9IHRoaXMuX2RhdGFMZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh0aGlzLl9jdXJJZHggPiB0aGlzLl9kYXRhTGVuIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJJZHggLT0gdGhpcy5fZGF0YUxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaERpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2goKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy5fY3VySWR4IC0gKHRoaXMuX21pZElkeCAtIGluZGV4KTtcclxuICAgICAgICAgICAgd2hpbGUgKGkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBpICs9IHRoaXMuX2RhdGFMZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKGkgPiB0aGlzLl9kYXRhTGVuIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgaSAtPSB0aGlzLl9kYXRhTGVuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVmcmVzaENhbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hDYWxsLmNhbGwodGhpcy5fdGFyZ2V0LCBpdGVtLCBpLCBpID09PSB0aGlzLl9jdXJJZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19