
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/scrollList/CircleList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcc2Nyb2xsTGlzdFxcQ2lyY2xlTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFFaEMsSUFBQSxLQUFpRCxFQUFFLENBQUMsVUFBVSxFQUE1RCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxpQkFBaUIsdUJBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFckUsV0FBVztBQUNYLElBQU0sV0FBVyxHQUFXLEdBQUcsQ0FBQztBQUVoQzs7R0FFRztBQUlIO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBK0hDO1FBN0hXLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsaUJBQVcsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVuQyxpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUUxQixXQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGdCQUFVLEdBQVcsV0FBVyxDQUFDO1FBQ2pDLG1CQUFhLEdBQVcsV0FBVyxDQUFDO1FBQ3BDLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG9CQUFjLEdBQXlCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDakQsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUM5QixpQkFBaUI7UUFDVCxpQkFBVyxHQUE0QixJQUFJLENBQUM7O0lBZ0h4RCxDQUFDO0lBN0dHLHNCQUFXLGlDQUFTO1FBRHBCLHdCQUF3QjthQUN4QixjQUFpQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQzFELFVBQXFCLENBQVM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FKeUQ7SUFNMUQ7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QVEsRUFBRTtnQkFDbEIsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDakIsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNsQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBNUhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ2M7SUFFaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO21EQUNFO0lBRTNDO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxXQUFXLEVBQUUsQ0FBQzttREFDWDtJQU5qQixVQUFVO1FBSDlCLE9BQU87UUFDUCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLDJCQUEyQixDQUFDO09BQ2IsVUFBVSxDQStIOUI7SUFBRCxpQkFBQztDQS9IRCxBQStIQyxDQS9IdUMsRUFBRSxDQUFDLFNBQVMsR0ErSG5EO2tCQS9Ib0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb29sIGZyb20gXCIuLi8uLi8uLi91dGlsL1Rvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqIOWIneWni+inkuW6piAqL1xyXG5jb25zdCBJTklUX0RFR1JFRTogbnVtYmVyID0gMjcwO1xyXG5cclxuLyoqXHJcbiAqIOeOr+W9ouWIl+ihqO+8jOWwhuiKgueCueS7peakreWchuaOkuWIl1xyXG4gKi9cclxuQGNjY2xhc3NcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbkBtZW51KFwiRnJhbWV3b3JrL1VJ57uE5Lu2L0NpcmNsZUxpc3RcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlTGlzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY29udGVudDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLmpK3lnIbplb/nn63ovbRcIiB9KVxyXG4gICAgcHJpdmF0ZSBlbGxpcHNlQXhlczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi5YiX6KGo6Ieq5Yqo5rua5Yqo55qE6YCf5bqmXCIgfSlcclxuICAgIHByaXZhdGUgc2Nyb2xsU3BlZWQ6IG51bWJlciA9IDIwMDtcclxuXHJcbiAgICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9jdXJEZWdyZWU6IG51bWJlciA9IElOSVRfREVHUkVFO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0RGVncmVlOiBudW1iZXIgPSBJTklUX0RFR1JFRTtcclxuICAgIHByaXZhdGUgX3Njcm9sbGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaXRlbURlZ3JlZU1hcDogTWFwPGNjLk5vZGUsIG51bWJlcj4gPSBuZXcgTWFwKCk7XHJcbiAgICBwcml2YXRlIF9tYXhEZWx0YTogbnVtYmVyID0gMDtcclxuICAgIC8qKiDlrZDoioLngrnooqvpgInkuK3ml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgX3NlbGVjdENhbGw6IChpdGVtOiBjYy5Ob2RlKSA9PiB2b2lkID0gbnVsbDtcclxuXHJcbiAgICAvKiog6Jma5ouf6KeS5bqm77yM5a2Q6IqC54K55Lya5qC55o2u6KeS5bqm6K6h566X5Z2Q5qCHICovXHJcbiAgICBwdWJsaWMgZ2V0IGN1ckRlZ3JlZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VyRGVncmVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGN1ckRlZ3JlZSh2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9jdXJEZWdyZWUgPSBUb29sLm5vcm1hbGl6ZURlZ3JlZSh2KTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hJdGVtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5YiX6KGo77yM5oyJ6KeS5bqm5Z2H5YyA5o6S5YiXY29udGVudOaJgOacieWtkOiKgueCuVxyXG4gICAgICogQHBhcmFtIHNlbGVjdENhbGwgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KHNlbGVjdENhbGw6IChpdGVtOiBjYy5Ob2RlKSA9PiB2b2lkID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21heERlbHRhID0gMDtcclxuICAgICAgICB0aGlzLl9pdGVtRGVncmVlTWFwLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0Q2FsbCA9IHNlbGVjdENhbGw7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXZlcmFnZTogbnVtYmVyID0gMzYwIC8gdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goKHYsIGkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faXRlbURlZ3JlZU1hcC5zZXQodiwgaSAqIGF2ZXJhZ2UpO1xyXG5cclxuICAgICAgICAgICAgdi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLml0ZW1Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgICAgICB2Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5pdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgICAgICB2Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5pdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEl0ZW1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmu5rliqjliLDmjIflrprlrZDoioLngrnlpIRcclxuICAgICAqIEBwYXJhbSBpdGVtIOWtkOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9JdGVtKGl0ZW06IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2l0ZW1EZWdyZWVNYXAuaGFzKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtRGVncmVlID0gdGhpcy5faXRlbURlZ3JlZU1hcC5nZXQoaXRlbSk7XHJcbiAgICAgICAgbGV0IGRlbHRhID0gSU5JVF9ERUdSRUUgLSBpdGVtRGVncmVlO1xyXG4gICAgICAgIHRoaXMuX3RhcmdldERlZ3JlZSA9IFRvb2wubm9ybWFsaXplRGVncmVlKGRlbHRhKTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdENhbGw/LihpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hJdGVtcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW4uZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGVncmVlID0gVG9vbC5ub3JtYWxpemVEZWdyZWUodGhpcy5faXRlbURlZ3JlZU1hcC5nZXQodikgKyB0aGlzLmN1ckRlZ3JlZSk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBUb29sLmdldEVsbGlwc2VQb2ludCh0aGlzLmVsbGlwc2VBeGVzLngsIHRoaXMuZWxsaXBzZUF4ZXMueSwgZGVncmVlKTtcclxuICAgICAgICAgICAgdi5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICB2LnpJbmRleCA9IC12Lnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0IHx8ICF0aGlzLl9zY3JvbGxpbmcgfHwgdGhpcy5jdXJEZWdyZWUgPT09IHRoaXMuX3RhcmdldERlZ3JlZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVsdGEgPSBNYXRoLmFicyh0aGlzLl90YXJnZXREZWdyZWUgLSB0aGlzLmN1ckRlZ3JlZSk7XHJcbiAgICAgICAgbGV0IGRlZ3JlZSA9IHRoaXMuY3VyRGVncmVlO1xyXG4gICAgICAgIGxldCBzaWduID0gKGRlbHRhIDwgMTgwID8gMSA6IC0xKSAqIE1hdGguc2lnbih0aGlzLl90YXJnZXREZWdyZWUgLSB0aGlzLmN1ckRlZ3JlZSk7XHJcbiAgICAgICAgZGVncmVlICs9IGR0ICogdGhpcy5zY3JvbGxTcGVlZCAqIHNpZ247XHJcblxyXG4gICAgICAgIGlmICgodGhpcy5jdXJEZWdyZWUgPiB0aGlzLl90YXJnZXREZWdyZWUgJiYgZGVncmVlIDwgdGhpcy5fdGFyZ2V0RGVncmVlKSB8fCAodGhpcy5jdXJEZWdyZWUgPCB0aGlzLl90YXJnZXREZWdyZWUgJiYgZGVncmVlID4gdGhpcy5fdGFyZ2V0RGVncmVlKSkge1xyXG4gICAgICAgICAgICBkZWdyZWUgPSB0aGlzLl90YXJnZXREZWdyZWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1ckRlZ3JlZSA9IGRlZ3JlZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGl0ZW1Ub3VjaE1vdmUoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZGVsdGEgPSBldmVudC5nZXREZWx0YVgoKTtcclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWF4RGVsdGEgPCBNYXRoLmFicyhkZWx0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4RGVsdGEgPSBNYXRoLmFicyhkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyRGVncmVlID0gdGhpcy5jdXJEZWdyZWUgKyBkZWx0YSAvIDU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpdGVtVG91Y2hFbmQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBpZiAodGhpcy5fbWF4RGVsdGEgPCA1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21heERlbHRhID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0l0ZW0obm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtaW5EZWx0YSA9IDM2MDtcclxuICAgICAgICBsZXQgbWluTm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlblswXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgaXRlbURlZ3JlZSA9IFRvb2wubm9ybWFsaXplRGVncmVlKHRoaXMuX2l0ZW1EZWdyZWVNYXAuZ2V0KGl0ZW0pICsgdGhpcy5jdXJEZWdyZWUpO1xyXG4gICAgICAgICAgICBsZXQgZGVsdGEgPSBNYXRoLmFicyhJTklUX0RFR1JFRSAtIGl0ZW1EZWdyZWUpO1xyXG4gICAgICAgICAgICBpZiAoZGVsdGEgPiAxODApIHtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0gaXRlbURlZ3JlZSArIDM2MCAtIElOSVRfREVHUkVFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZWx0YSA8IG1pbkRlbHRhKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5EZWx0YSA9IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgbWluTm9kZSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWF4RGVsdGEgPSAwO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9JdGVtKG1pbk5vZGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==