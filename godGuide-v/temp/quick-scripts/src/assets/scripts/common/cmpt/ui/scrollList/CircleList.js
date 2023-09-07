"use strict";
cc._RF.push(module, 'b16a3Aay4tOsrajlZkk+6I1', 'CircleList');
// scripts/common/cmpt/ui/scrollList/CircleList.ts

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
var Tool_1 = require("../../../util/Tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
/** 初始角度 */
var INIT_DEGREE = 270;
/**
 * 环形列表，将节点以椭圆排列
 */
var CircleList = /** @class */ (function (_super) {
    __extends(CircleList, _super);
    function CircleList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.ellipseAxes = cc.v2(0, 0);
        _this.scrollSpeed = 200;
        _this._init = false;
        _this._curDegree = INIT_DEGREE;
        _this._targetDegree = INIT_DEGREE;
        _this._scrolling = false;
        _this._itemDegreeMap = new Map();
        _this._maxDelta = 0;
        /** 子节点被选中时的回调 */
        _this._selectCall = null;
        return _this;
    }
    Object.defineProperty(CircleList.prototype, "curDegree", {
        /** 虚拟角度，子节点会根据角度计算坐标 */
        get: function () { return this._curDegree; },
        set: function (v) {
            this._curDegree = Tool_1.default.normalizeDegree(v);
            this.refreshItems();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化列表，按角度均匀排列content所有子节点
     * @param selectCall
     */
    CircleList.prototype.init = function (selectCall) {
        var _this = this;
        if (selectCall === void 0) { selectCall = null; }
        this._init = true;
        this._scrolling = false;
        this._maxDelta = 0;
        this._itemDegreeMap.clear();
        this._selectCall = selectCall;
        if (this.content.childrenCount <= 0) {
            return;
        }
        var average = 360 / this.content.childrenCount;
        this.content.children.forEach(function (v, i) {
            _this._itemDegreeMap.set(v, i * average);
            v.on(cc.Node.EventType.TOUCH_MOVE, _this.itemTouchMove, _this);
            v.on(cc.Node.EventType.TOUCH_END, _this.itemTouchEnd, _this);
            v.on(cc.Node.EventType.TOUCH_CANCEL, _this.itemTouchEnd, _this);
        });
        this.refreshItems();
    };
    /**
     * 滚动到指定子节点处
     * @param item 子节点
     */
    CircleList.prototype.scrollToItem = function (item) {
        var _a;
        if (!this._itemDegreeMap.has(item)) {
            return;
        }
        var itemDegree = this._itemDegreeMap.get(item);
        var delta = INIT_DEGREE - itemDegree;
        this._targetDegree = Tool_1.default.normalizeDegree(delta);
        this._scrolling = true;
        (_a = this._selectCall) === null || _a === void 0 ? void 0 : _a.call(this, item);
    };
    CircleList.prototype.refreshItems = function () {
        var _this = this;
        this.content.children.forEach(function (v, i) {
            var degree = Tool_1.default.normalizeDegree(_this._itemDegreeMap.get(v) + _this.curDegree);
            var pos = Tool_1.default.getEllipsePoint(_this.ellipseAxes.x, _this.ellipseAxes.y, degree);
            v.setPosition(pos);
            v.zIndex = -v.y;
        });
    };
    CircleList.prototype.update = function (dt) {
        if (!this._init || !this._scrolling || this.curDegree === this._targetDegree) {
            return;
        }
        var delta = Math.abs(this._targetDegree - this.curDegree);
        var degree = this.curDegree;
        var sign = (delta < 180 ? 1 : -1) * Math.sign(this._targetDegree - this.curDegree);
        degree += dt * this.scrollSpeed * sign;
        if ((this.curDegree > this._targetDegree && degree < this._targetDegree) || (this.curDegree < this._targetDegree && degree > this._targetDegree)) {
            degree = this._targetDegree;
            this._scrolling = false;
        }
        this.curDegree = degree;
    };
    CircleList.prototype.itemTouchMove = function (event) {
        var delta = event.getDeltaX();
        if (Math.abs(delta) < 1) {
            return;
        }
        if (this._maxDelta < Math.abs(delta)) {
            this._maxDelta = Math.abs(delta);
        }
        this.curDegree = this.curDegree + delta / 5;
    };
    CircleList.prototype.itemTouchEnd = function (event) {
        var node = event.target;
        if (this._maxDelta < 5) {
            this._maxDelta = 0;
            this.scrollToItem(node);
            return;
        }
        var minDelta = 360;
        var minNode = this.content.children[0];
        for (var i = 0; i < this.content.children.length; i++) {
            var item = this.content.children[i];
            var itemDegree = Tool_1.default.normalizeDegree(this._itemDegreeMap.get(item) + this.curDegree);
            var delta = Math.abs(INIT_DEGREE - itemDegree);
            if (delta > 180) {
                delta = itemDegree + 360 - INIT_DEGREE;
            }
            if (delta < minDelta) {
                minDelta = delta;
                minNode = item;
            }
        }
        this._maxDelta = 0;
        this.scrollToItem(minNode);
    };
    __decorate([
        property(cc.Node)
    ], CircleList.prototype, "content", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "椭圆长短轴" })
    ], CircleList.prototype, "ellipseAxes", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "列表自动滚动的速度" })
    ], CircleList.prototype, "scrollSpeed", void 0);
    CircleList = __decorate([
        ccclass,
        executeInEditMode,
        menu("Framework/UI组件/CircleList")
    ], CircleList);
    return CircleList;
}(cc.Component));
exports.default = CircleList;

cc._RF.pop();