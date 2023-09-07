"use strict";
cc._RF.push(module, '23c51D+ML1JI7Nz58WdBOmf', 'VirtualLayout');
// scripts/common/cmpt/ui/scrollList/VirtualLayout.ts

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
var Tool_1 = require("../../../util/Tool");
var VirtualItem_1 = require("./VirtualItem");
var VirtualList_1 = require("./VirtualList");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple;
/**
 * 布局模式
 */
var LayoutType;
(function (LayoutType) {
    /** 横向 */
    LayoutType[LayoutType["HORIZONTAL"] = 0] = "HORIZONTAL";
    /** 纵向 */
    LayoutType[LayoutType["VERTICAL"] = 1] = "VERTICAL";
    /** 网格 */
    LayoutType[LayoutType["GRID"] = 2] = "GRID";
})(LayoutType || (LayoutType = {}));
/**
 * 布局轴向，只用于GRID布局。
 */
var AxisDirection;
(function (AxisDirection) {
    AxisDirection[AxisDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
    AxisDirection[AxisDirection["VERTICAL"] = 1] = "VERTICAL";
})(AxisDirection || (AxisDirection = {}));
/**
 * 纵向排列方向
 */
var VerticalDirection;
(function (VerticalDirection) {
    VerticalDirection[VerticalDirection["TOP_TO_BOTTOM"] = 0] = "TOP_TO_BOTTOM";
    VerticalDirection[VerticalDirection["BOTTOM_TO_TOP"] = 1] = "BOTTOM_TO_TOP";
})(VerticalDirection || (VerticalDirection = {}));
/**
 * 横向排列方向
 */
var HorizontalDirection;
(function (HorizontalDirection) {
    HorizontalDirection[HorizontalDirection["LEFT_TO_RIGHT"] = 0] = "LEFT_TO_RIGHT";
    HorizontalDirection[HorizontalDirection["RIGHT_TO_LEFT"] = 1] = "RIGHT_TO_LEFT";
})(HorizontalDirection || (HorizontalDirection = {}));
/**
 * 虚拟列表所需的布局组件
 */
var VirtualLayout = /** @class */ (function (_super) {
    __extends(VirtualLayout, _super);
    function VirtualLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = LayoutType.VERTICAL;
        _this.startAxis = AxisDirection.HORIZONTAL;
        _this.left = 0;
        _this.right = 0;
        _this.top = 0;
        _this.bottom = 0;
        _this.spacingX = 0;
        _this.spacingY = 0;
        _this.verticalDirection = VerticalDirection.TOP_TO_BOTTOM;
        _this.horizontalDirection = HorizontalDirection.LEFT_TO_RIGHT;
        /** 所属虚拟列表 */
        _this._list = null;
        /** mask节点（content父节点） */
        _this._view = null;
        /** view坐标系下view的边界矩形 */
        _this._viewEdge = null;
        /** 元素节点大小固定时的size */
        _this._fixedSize = null;
        /** 标记当前帧是否需要更新content size */
        _this._sizeDirty = false;
        /** 标记当前帧是否需要更新view区域数据显示 */
        _this._viewDirty = false;
        /** 标记当前帧是否需要同步others content的坐标 */
        _this._posDirty = false;
        /** main content激活状态的item */
        _this._items = [];
        /** main content被回收的item池（不移出节点树，只设置opacity） */
        _this._itemPool = [];
        /** others content激活状态的item，下标顺序与this.list.Others数组一致 */
        _this._otherItemsArr = [];
        /** others content被回收的item池数组（不移出节点树，只设置opacity），下标顺序与this.list.Others数组一致 */
        _this._otherItemPoolArr = [];
        return _this;
    }
    VirtualLayout.prototype.onInit = function (list) {
        var _this = this;
        this._list = list;
        this._view = this.node.parent;
        this._viewEdge = this.getNodeEdgeRect(this._view);
        // 初始化分层相关数据
        this._otherItemsArr = [];
        this._otherItemPoolArr = [];
        this._list.others.forEach(function (e) {
            _this._otherItemsArr.push([]);
            _this._otherItemPoolArr.push([]);
        });
        // 元素大小固定时初始化fixedSize
        if (this._fixedSize === null) {
            this.addItemNode(false);
            this._fixedSize = this._itemPool[0].getContentSize();
        }
        // 注册事件
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, this);
        this._view.on(cc.Node.EventType.SIZE_CHANGED, this.onViewSizeChanged, this);
    };
    VirtualLayout.prototype.onDestroy = function () {
        // 注销事件
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, this);
        this._view.off(cc.Node.EventType.SIZE_CHANGED, this.onViewSizeChanged, this);
    };
    /**
     * 立即更新布局
     */
    VirtualLayout.prototype.forceUpdate = function () {
        this.updatePos();
        this.updateSize();
        this.updateView();
    };
    VirtualLayout.prototype.lateUpdate = function () {
        this.forceUpdate();
    };
    /**
     * 同步others的坐标
     */
    VirtualLayout.prototype.updatePos = function () {
        var _this = this;
        if (!this._posDirty) {
            return;
        }
        this._posDirty = false;
        this._list.others.forEach(function (e) {
            e.content.position = _this.node.position;
        });
    };
    /**
     * 更新content size
     */
    VirtualLayout.prototype.updateSize = function () {
        if (!this._sizeDirty) {
            return;
        }
        this._sizeDirty = false;
        if (this._list.isFixedSize) {
            this.updateSizeFixed();
        }
        else {
            this.updateSizeUnfixed();
        }
    };
    VirtualLayout.prototype.updateSizeFixed = function () {
        if (this.type === LayoutType.VERTICAL) {
            if (this._list.argsArr.length <= 0) {
                this.node.height = 0;
                return;
            }
            this.node.height = this.top + this.bottom + (this._list.argsArr.length - 1) * this.spacingY + this._fixedSize.height * this._list.argsArr.length;
        }
        else if (this.type === LayoutType.HORIZONTAL) {
            if (this._list.argsArr.length <= 0) {
                this.node.width = 0;
                return;
            }
            this.node.width = this.left + this.right + (this._list.argsArr.length - 1) * this.spacingX + this._fixedSize.width * this._list.argsArr.length;
        }
        else {
            if (this.startAxis === AxisDirection.HORIZONTAL) {
                if (this._list.argsArr.length <= 0) {
                    this.node.height = 0;
                    return;
                }
                // 计算一行可以排列几个，至少1个
                var num = Math.floor((this.node.width - this.left - this.right + this.spacingX) / (this._fixedSize.width + this.spacingX));
                num = Math.max(num, 1);
                // 计算可以排列几行
                var row = Math.ceil(this._list.argsArr.length / num);
                // 高度
                this.node.height = this.top + this.bottom + (row - 1) * this.spacingY + this._fixedSize.height * row;
            }
            else {
                if (this._list.argsArr.length <= 0) {
                    this.node.width = 0;
                    return;
                }
                // 计算一列可以排列几个，至少1个
                var num = Math.floor((this.node.height - this.top - this.bottom + this.spacingY) / (this._fixedSize.height + this.spacingY));
                num = Math.max(num, 1);
                // 计算可以排列几列
                var column = Math.ceil(this._list.argsArr.length / num);
                // 宽度
                this.node.width = this.left + this.right + (column - 1) * this.spacingX + this._fixedSize.width * column;
            }
        }
    };
    VirtualLayout.prototype.updateSizeUnfixed = function () {
        // 缓存宽高，最后赋值，是因为修改content size时会触发scrollview._calculateBoundary，改变content的坐标
        var result = 0;
        if (this.type === LayoutType.VERTICAL) {
            if (this._list.argsArr.length <= 0) {
                this.node.height = 0;
                return;
            }
            result = this.top + this.bottom + (this._list.argsArr.length - 1) * this.spacingY;
            for (var i = 0; i < this._list.argsArr.length; i++) {
                var size = this.calcItemSizeUnfixed(i);
                result += size.height;
            }
            this.node.height = result;
        }
        else if (this.type === LayoutType.HORIZONTAL) {
            if (this._list.argsArr.length <= 0) {
                this.node.width = 0;
                return;
            }
            result = this.left + this.right + (this._list.argsArr.length - 1) * this.spacingX;
            for (var i = 0; i < this._list.argsArr.length; i++) {
                var size = this.calcItemSizeUnfixed(i);
                result += size.width;
            }
            this.node.width = result;
        }
    };
    /**
     * 更新view区域数据显示
     */
    VirtualLayout.prototype.updateView = function () {
        if (!this._viewDirty || this._list.argsArr.length <= 0) {
            return;
        }
        this._viewDirty = false;
        if (this._list.isFixedSize) {
            this.updateViewFixed();
        }
        else {
            this.updateViewUnfixed();
        }
    };
    VirtualLayout.prototype.updateViewFixed = function () {
        var _this = this;
        var viewResult = this.checkViewItem();
        var inView = viewResult.inView;
        var outView = viewResult.outView;
        var contentEdge = this.getNodeEdgeRect(this.node);
        var xMax, xMin, yMax, yMin;
        if (this.type === LayoutType.VERTICAL) {
            var _loop_1 = function (i) {
                if (this_1.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                    yMax = contentEdge.yMax - (this_1.top + i * this_1.spacingY + this_1._fixedSize.height * i);
                    yMin = yMax - this_1._fixedSize.height;
                    if (yMax + this_1.node.y < this_1._viewEdge.yMin) {
                        return "break";
                    }
                    if (yMin + this_1.node.y > this_1._viewEdge.yMax) {
                        return "continue";
                    }
                }
                else {
                    yMin = contentEdge.yMin + this_1.bottom + i * this_1.spacingY + this_1._fixedSize.height * i;
                    yMax = yMin + this_1._fixedSize.height;
                    if (yMin + this_1.node.y > this_1._viewEdge.yMax) {
                        return "break";
                    }
                    if (yMax + this_1.node.y < this_1._viewEdge.yMin) {
                        return "continue";
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).dataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_1.addItemNode() : outView.shift();
                var item = this_1._items[itemIdx];
                this_1.setItem(cc.v3(0, yMin + item.anchorY * item.height), i, itemIdx);
            };
            var this_1 = this;
            for (var i = 0; i < this._list.argsArr.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        }
        else if (this.type === LayoutType.HORIZONTAL) {
            var _loop_2 = function (i) {
                if (this_2.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                    xMax = contentEdge.xMax - (this_2.right + i * this_2.spacingX + this_2._fixedSize.width * i);
                    xMin = xMax - this_2._fixedSize.width;
                    if (xMax + this_2.node.x < this_2._viewEdge.xMin) {
                        return "break";
                    }
                    if (xMin + this_2.node.x > this_2._viewEdge.xMax) {
                        return "continue";
                    }
                }
                else {
                    xMin = contentEdge.xMin + this_2.left + i * this_2.spacingX + this_2._fixedSize.width * i;
                    xMax = xMin + this_2._fixedSize.width;
                    if (xMin + this_2.node.x > this_2._viewEdge.xMax) {
                        return "break";
                    }
                    if (xMax + this_2.node.x < this_2._viewEdge.xMin) {
                        return "continue";
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).dataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_2.addItemNode() : outView.shift();
                var item = this_2._items[itemIdx];
                this_2.setItem(cc.v3(xMin + item.anchorX * item.width, 0), i, itemIdx);
            };
            var this_2 = this;
            for (var i = 0; i < this._list.argsArr.length; i++) {
                var state_2 = _loop_2(i);
                if (state_2 === "break")
                    break;
            }
        }
        else {
            var _loop_3 = function (i) {
                // 计算当前元素排在第几行第几列，从0开始
                var rowIndex = 0;
                var columnIndex = 0;
                if (this_3.startAxis === AxisDirection.HORIZONTAL) {
                    // 起始轴为横向
                    var num = Math.floor((this_3.node.width - this_3.left - this_3.right + this_3.spacingX) / (this_3._fixedSize.width + this_3.spacingX));
                    num = Math.max(num, 1);
                    rowIndex = Math.floor(i / num);
                    columnIndex = i % num;
                    // 计算纵向
                    if (this_3.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        yMax = contentEdge.yMax - (this_3.top + rowIndex * this_3.spacingY + this_3._fixedSize.height * rowIndex);
                        yMin = yMax - this_3._fixedSize.height;
                        if (yMax + this_3.node.y < this_3._viewEdge.yMin) {
                            return "break";
                        }
                        if (yMin + this_3.node.y > this_3._viewEdge.yMax) {
                            return "continue";
                        }
                    }
                    else {
                        yMin = contentEdge.yMin + this_3.bottom + rowIndex * this_3.spacingY + this_3._fixedSize.height * rowIndex;
                        yMax = yMin + this_3._fixedSize.height;
                        if (yMin + this_3.node.y > this_3._viewEdge.yMax) {
                            return "break";
                        }
                        if (yMax + this_3.node.y < this_3._viewEdge.yMin) {
                            return "continue";
                        }
                    }
                    // 计算横向
                    if (this_3.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                        xMax = contentEdge.xMax - (this_3.right + columnIndex * this_3.spacingX + this_3._fixedSize.width * columnIndex);
                        xMin = xMax - this_3._fixedSize.width;
                    }
                    else {
                        xMin = contentEdge.xMin + this_3.left + columnIndex * this_3.spacingX + this_3._fixedSize.width * columnIndex;
                        xMax = xMin + this_3._fixedSize.width;
                    }
                    if (xMax + this_3.node.x < this_3._viewEdge.xMin || xMin + this_3.node.x > this_3._viewEdge.xMax) {
                        return "continue";
                    }
                }
                else {
                    // 起始轴为纵向
                    var num = Math.floor((this_3.node.height - this_3.top - this_3.bottom + this_3.spacingY) / (this_3._fixedSize.height + this_3.spacingY));
                    num = Math.max(num, 1);
                    rowIndex = i % num;
                    columnIndex = Math.floor(i / num);
                    // 计算横向
                    if (this_3.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                        xMax = contentEdge.xMax - (this_3.right + columnIndex * this_3.spacingX + this_3._fixedSize.width * columnIndex);
                        xMin = xMax - this_3._fixedSize.width;
                        if (xMax + this_3.node.x < this_3._viewEdge.xMin) {
                            return "break";
                        }
                        if (xMin + this_3.node.x > this_3._viewEdge.xMax) {
                            return "continue";
                        }
                    }
                    else {
                        xMin = contentEdge.xMin + this_3.left + columnIndex * this_3.spacingX + this_3._fixedSize.width * columnIndex;
                        xMax = xMin + this_3._fixedSize.width;
                        if (xMin + this_3.node.x > this_3._viewEdge.xMax) {
                            return "break";
                        }
                        if (xMax + this_3.node.x < this_3._viewEdge.xMin) {
                            return "continue";
                        }
                    }
                    // 计算纵向
                    if (this_3.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        yMax = contentEdge.yMax - (this_3.top + rowIndex * this_3.spacingY + this_3._fixedSize.height * rowIndex);
                        yMin = yMax - this_3._fixedSize.height;
                    }
                    else {
                        yMin = contentEdge.yMin + this_3.bottom + rowIndex * this_3.spacingY + this_3._fixedSize.height * rowIndex;
                        yMax = yMin + this_3._fixedSize.height;
                    }
                    if (yMax + this_3.node.y < this_3._viewEdge.yMin || yMin + this_3.node.y > this_3._viewEdge.yMax) {
                        return "continue";
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).dataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_3.addItemNode() : outView.shift();
                var item = this_3._items[itemIdx];
                this_3.setItem(cc.v3(xMin + item.anchorX * item.width, yMin + item.anchorY * item.height), i, itemIdx);
            };
            var this_3 = this;
            for (var i = 0; i < this._list.argsArr.length; i++) {
                var state_3 = _loop_3(i);
                if (state_3 === "break")
                    break;
            }
        }
        // 回收区域外的节点
        for (var i = outView.length - 1; i >= 0; i--) {
            this.putActivatedItemByIndex(outView[i]);
        }
    };
    VirtualLayout.prototype.updateViewUnfixed = function () {
        var _this = this;
        var viewResult = this.checkViewItem();
        var inView = viewResult.inView;
        var outView = viewResult.outView;
        var contentEdge = this.getNodeEdgeRect(this.node);
        var xMax, xMin, yMax, yMin;
        if (this.type === LayoutType.VERTICAL) {
            var totalHeight = 0;
            var _loop_4 = function (i) {
                var size = this_4.calcItemSizeUnfixed(i);
                totalHeight += size.height;
                if (this_4.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                    yMax = contentEdge.yMax - (this_4.top + i * this_4.spacingY + (totalHeight - size.height));
                    yMin = yMax - size.height;
                    if (yMax + this_4.node.y < this_4._viewEdge.yMin) {
                        return "break";
                    }
                    if (yMin + this_4.node.y > this_4._viewEdge.yMax) {
                        return "continue";
                    }
                }
                else {
                    yMin = contentEdge.yMin + this_4.bottom + i * this_4.spacingY + (totalHeight - size.height);
                    yMax = yMin + size.height;
                    if (yMin + this_4.node.y > this_4._viewEdge.yMax) {
                        return "break";
                    }
                    if (yMax + this_4.node.y < this_4._viewEdge.yMin) {
                        return "continue";
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).dataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_4.addItemNode() : outView.shift();
                var item = this_4._items[itemIdx];
                item.setContentSize(size);
                this_4.setItem(cc.v3(0, yMin + item.anchorY * size.height), i, itemIdx);
            };
            var this_4 = this;
            for (var i = 0; i < this._list.argsArr.length; i++) {
                var state_4 = _loop_4(i);
                if (state_4 === "break")
                    break;
            }
        }
        else if (this.type === LayoutType.HORIZONTAL) {
            var totalWidth = 0;
            var _loop_5 = function (i) {
                var size = this_5.calcItemSizeUnfixed(i);
                totalWidth += size.width;
                if (this_5.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                    xMax = contentEdge.xMax - (this_5.right + i * this_5.spacingX + (totalWidth - size.width));
                    xMin = xMax - size.width;
                    if (xMax + this_5.node.x < this_5._viewEdge.xMin) {
                        return "break";
                    }
                    if (xMin + this_5.node.x > this_5._viewEdge.xMax) {
                        return "continue";
                    }
                }
                else {
                    xMin = contentEdge.xMin + this_5.left + i * this_5.spacingX + (totalWidth - size.width);
                    xMax = xMin + size.width;
                    if (xMin + this_5.node.x > this_5._viewEdge.xMax) {
                        return "break";
                    }
                    if (xMax + this_5.node.x < this_5._viewEdge.xMin) {
                        return "continue";
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).dataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_5.addItemNode() : outView.shift();
                var item = this_5._items[itemIdx];
                item.setContentSize(size);
                this_5.setItem(cc.v3(xMin + item.anchorX * size.width, 0), i, itemIdx);
            };
            var this_5 = this;
            for (var i = 0; i < this._list.argsArr.length; i++) {
                var state_5 = _loop_5(i);
                if (state_5 === "break")
                    break;
            }
        }
        // 回收区域外的节点
        for (var i = outView.length - 1; i >= 0; i--) {
            this.putActivatedItemByIndex(outView[i]);
        }
    };
    /**
     * 区分在view内部与外部的items数组下标（返回的下标数组会从小到大排序）
     */
    VirtualLayout.prototype.checkViewItem = function () {
        // 显示区域内部的下标
        var inView = [];
        // 显示区域外部的下标
        var outView = [];
        if (this.type === LayoutType.VERTICAL) {
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                var box = item.getBoundingBox();
                if (box.yMin + this.node.y <= this._viewEdge.yMax && box.yMax + this.node.y >= this._viewEdge.yMin) {
                    inView.push(i);
                }
                else {
                    outView.push(i);
                }
            }
        }
        else if (this.type === LayoutType.HORIZONTAL) {
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                var box = item.getBoundingBox();
                if (box.xMin + this.node.x <= this._viewEdge.xMax && box.xMax + this.node.x >= this._viewEdge.xMin) {
                    inView.push(i);
                }
                else {
                    outView.push(i);
                }
            }
        }
        else {
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                var box = item.getBoundingBox();
                if (box.xMin + this.node.x <= this._viewEdge.xMax && box.xMax + this.node.x >= this._viewEdge.xMin
                    && box.yMin + this.node.y <= this._viewEdge.yMax && box.yMax + this.node.y >= this._viewEdge.yMin) {
                    inView.push(i);
                }
                else {
                    outView.push(i);
                }
            }
        }
        return { inView: inView, outView: outView };
    };
    /**
     * 设置item数据与坐标
     * @param p 节点坐标
     * @param dataIdx this._dataArr的下标
     * @param itemIdx this._items的下标
     */
    VirtualLayout.prototype.setItem = function (p, dataIdx, itemIdx) {
        var item = this._items[itemIdx];
        item.position = p;
        var vi = item.getComponent(VirtualItem_1.default);
        vi.dataIdx = dataIdx;
        vi.args = this._list.argsArr[dataIdx];
        vi.onRefresh(vi.args);
        if (this._list.others.length > 0) {
            var nodes_1 = [];
            this._otherItemsArr.forEach(function (e) {
                e[itemIdx].position = p;
                nodes_1.push(e[itemIdx]);
            });
            vi.others = nodes_1;
            vi.onRefreshOthers.apply(vi, vi.others);
        }
    };
    /**
     * 激活新的节点，并添加到content下
     * @param show 默认为true。false时不激活节点并添加进节点池中（仅在onInit中使用）
     * @returns 激活的节点在this._items中的下标
     */
    VirtualLayout.prototype.addItemNode = function (show) {
        var _this = this;
        if (show === void 0) { show = true; }
        var node = null;
        if (this._itemPool.length > 0) {
            node = this._itemPool.pop();
            node.opacity = 255;
            this._items.push(node);
            this._otherItemPoolArr.forEach(function (e, i) {
                var otherNode = e.pop();
                otherNode.opacity = 255;
                _this._otherItemsArr[i].push(otherNode);
            });
        }
        else {
            var tmp = this._list.main.templateType === VirtualList_1.MainTemplateType.PREFAB ? this._list.main.templatePrefab : this._list.main.templateNode;
            node = Res_1.default.instantiate(tmp, this.node);
            if (!node.getComponent(VirtualItem_1.default)) {
                node.addComponent(VirtualItem_1.default);
            }
            this.node.addChild(node);
            if (show) {
                node.opacity = 255;
                this._items.push(node);
            }
            else {
                this.putItemNode(node);
            }
            // 拷贝一份子节点数组，防止子节点移除时改变下标
            var childrenCopy_1 = node.children.slice(0);
            this._list.others.forEach(function (e, i) {
                var otherNode = null;
                switch (e.templateType) {
                    case VirtualList_1.OtherTemplateType.NODE:
                        otherNode = Res_1.default.instantiate(e.templateNode, _this.node);
                        break;
                    case VirtualList_1.OtherTemplateType.PREFAB:
                        otherNode = Res_1.default.instantiate(e.templatePrefab, _this.node);
                        break;
                    case VirtualList_1.OtherTemplateType.MAIN_ITEM_CHILD:
                        if (!Tool_1.default.inRange(0, childrenCopy_1.length - 1, e.templateChild)) {
                            cc.error("[VirtualLayout.addItemNode] error e.templateChild: " + e.templateChild);
                            return;
                        }
                        otherNode = childrenCopy_1[e.templateChild];
                        otherNode.removeFromParent();
                        break;
                    default:
                        cc.error("[VirtualLayout.addItemNode] error e.templateType: " + e.templateType);
                        return;
                }
                e.content.addChild(otherNode);
                if (show) {
                    otherNode.opacity = 255;
                    _this._otherItemsArr[i].push(otherNode);
                }
                else {
                    _this.putItemNode(otherNode, true, i);
                }
            });
        }
        return this._items.length - 1;
    };
    /**
     * 将节点放入节点池
     * @param node
     * @param isOther 是否为Others下的节点
     * @param otherIdx Others的下标
     */
    VirtualLayout.prototype.putItemNode = function (node, isOther, otherIdx) {
        if (isOther === void 0) { isOther = false; }
        if (otherIdx === void 0) { otherIdx = 0; }
        node.opacity = 0;
        // 防止已回收的节点触发点击事件
        node.setPosition(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        if (isOther) {
            this._otherItemPoolArr[otherIdx].push(node);
        }
        else {
            var vi = node.getComponent(VirtualItem_1.default);
            vi.onReset();
            this._itemPool.push(node);
        }
    };
    /**
     * 回收已激活的节点
     * @param index 节点在this._items中的下标
     */
    VirtualLayout.prototype.putActivatedItemByIndex = function (index) {
        var _this = this;
        this.putItemNode(this._items[index]);
        this._otherItemsArr.forEach(function (arr, otherIdx) { _this.putItemNode(arr[index], true, otherIdx); });
        this._items.splice(index, 1);
        this._otherItemsArr.forEach(function (arr) {
            arr.splice(index, 1);
        });
    };
    /**
     * 子节点坐标系下坐标转换为父节点坐标系下坐标
     */
    VirtualLayout.prototype.convertToParentPos = function (pos, child) {
        return pos.add(child.position);
    };
    /**
     * 父节点坐标系下坐标转换为子节点坐标系下坐标
     */
    VirtualLayout.prototype.convertToChildPos = function (pos, child) {
        return pos.sub(child.position);
    };
    /**
     * 获取节点自身坐标系下的节点边界矩形
     */
    VirtualLayout.prototype.getNodeEdgeRect = function (node) {
        return cc.rect(-node.width * node.anchorX, -node.height * node.anchorY, node.width, node.height);
    };
    /**
     * 根据元素下标计算对应元素大小，isFixedSize为false时使用
     * @param idx
     */
    VirtualLayout.prototype.calcItemSizeUnfixed = function (idx) {
        if (this._list.calcItemSize) {
            return this._list.calcItemSize(this._list.argsArr[idx]);
        }
        else {
            return this._fixedSize;
        }
    };
    /**
     * content位移监听回调
     */
    VirtualLayout.prototype.onPositionChanged = function () {
        // ScrollView源码的bug处理
        // 1.超出边界的差值会记录在_outOfBoundaryAmount里，但是这个_outOfBoundaryAmount不是每次检测边界时都更新的，它需要_outOfBoundaryAmountDirty为true才会更新
        // 2.在content size改变的时候，ScrollView会检测content有没有超出边界，此时会更新_outOfBoundaryAmount并直接修改content坐标。但是修改完content坐标之后_outOfBoundaryAmount记录的仍旧是旧值，此时_outOfBoundaryAmountDirty为false。
        // 3.ScrollView在touchend的时候会触发检测当前有没有超出边界，有的话自动回弹滚动。由于_outOfBoundaryAmountDirty为false，所以并未更新_outOfBoundaryAmount，而是直接取错误的_outOfBoundaryAmount作为超出边界的值，然后进行错误的自动回弹。
        this._list.scrollView["_outOfBoundaryAmountDirty"] = true;
        // 更新标记
        this._viewDirty = true;
        this._posDirty = true;
    };
    /**
     * view size监听回调
     */
    VirtualLayout.prototype.onViewSizeChanged = function () {
        this._viewEdge = this.getNodeEdgeRect(this._view);
    };
    /**
     * 获取content相对view左上角原点位置的偏移值
     * @param idx 元素下标
     * @param itemAnchor 元素的锚点位置（左下角为0点）
     * @param viewAnchor view的锚点位置（左下角为0点）
     */
    VirtualLayout.prototype.getScrollOffset = function (idx, itemAnchor, viewAnchor) {
        idx = Math.min(idx, this._list.argsArr.length - 1);
        return this._list.isFixedSize ? this.getScrollOffsetFixed(idx, itemAnchor, viewAnchor) : this.getScrollOffsetUnfixed(idx, itemAnchor, viewAnchor);
    };
    VirtualLayout.prototype.getScrollOffsetFixed = function (idx, itemAnchor, viewAnchor) {
        var contentEdge = this.getNodeEdgeRect(this.node);
        var xMax, xMin, yMax, yMin;
        if (this.type === LayoutType.VERTICAL) {
            if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                yMax = contentEdge.yMax - (this.top + idx * this.spacingY + this._fixedSize.height * idx);
                yMin = yMax - this._fixedSize.height;
            }
            else {
                yMin = contentEdge.yMin + this.bottom + idx * this.spacingY + this._fixedSize.height * idx;
                yMax = yMin + this._fixedSize.height;
            }
            var x = this._viewEdge.xMin - (contentEdge.xMin + this.node.x);
            var y = contentEdge.yMax - (this._fixedSize.height * itemAnchor.y + yMin) - (1 - viewAnchor.y) * this._viewEdge.height;
            return cc.v2(x, y);
        }
        else if (this.type === LayoutType.HORIZONTAL) {
            if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                xMax = contentEdge.xMax - (this.right + idx * this.spacingX + this._fixedSize.width * idx);
                xMin = xMax - this._fixedSize.width;
            }
            else {
                xMin = contentEdge.xMin + this.left + idx * this.spacingX + this._fixedSize.width * idx;
                xMax = xMin + this._fixedSize.width;
            }
            var x = this._fixedSize.width * itemAnchor.x + xMin - contentEdge.xMin - viewAnchor.x * this._viewEdge.width;
            var y = contentEdge.yMax - (this._viewEdge.yMax - this.node.y);
            return cc.v2(x, y);
        }
        else {
            // 计算当前元素排在第几行第几列，从0开始
            var rowIndex = 0;
            var columnIndex = 0;
            if (this.startAxis === AxisDirection.HORIZONTAL) {
                var num = Math.floor((this.node.width - this.left - this.right + this.spacingX) / (this._fixedSize.width + this.spacingX));
                num = Math.max(num, 1);
                rowIndex = Math.floor(idx / num);
                columnIndex = idx % num;
            }
            else {
                var num = Math.floor((this.node.height - this.top - this.bottom + this.spacingY) / (this._fixedSize.height + this.spacingY));
                num = Math.max(num, 1);
                rowIndex = idx % num;
                columnIndex = Math.floor(idx / num);
            }
            if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                yMax = contentEdge.yMax - (this.top + rowIndex * this.spacingY + this._fixedSize.height * rowIndex);
                yMin = yMax - this._fixedSize.height;
            }
            else {
                yMin = contentEdge.yMin + this.bottom + rowIndex * this.spacingY + this._fixedSize.height * rowIndex;
                yMax = yMin + this._fixedSize.height;
            }
            if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                xMax = contentEdge.xMax - (this.right + columnIndex * this.spacingX + this._fixedSize.width * columnIndex);
                xMin = xMax - this._fixedSize.width;
            }
            else {
                xMin = contentEdge.xMin + this.left + columnIndex * this.spacingX + this._fixedSize.width * columnIndex;
                xMax = xMin + this._fixedSize.width;
            }
            var x = this._fixedSize.width * itemAnchor.x + xMin - contentEdge.xMin - viewAnchor.x * this._viewEdge.width;
            var y = contentEdge.yMax - (this._fixedSize.height * itemAnchor.y + yMin) - (1 - viewAnchor.y) * this._viewEdge.height;
            return cc.v2(x, y);
        }
    };
    VirtualLayout.prototype.getScrollOffsetUnfixed = function (idx, itemAnchor, viewAnchor) {
        var contentEdge = this.getNodeEdgeRect(this.node);
        var xMax, xMin, yMax, yMin;
        var curSize = this.calcItemSizeUnfixed(idx);
        if (this.type === LayoutType.VERTICAL) {
            var totalHeight = 0;
            for (var i = 0; i < idx; i++) {
                var size = this.calcItemSizeUnfixed(i);
                totalHeight += size.height;
            }
            if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                yMax = contentEdge.yMax - (this.top + idx * this.spacingY + totalHeight);
                yMin = yMax - curSize.height;
            }
            else {
                yMin = contentEdge.yMin + this.bottom + idx * this.spacingY + totalHeight;
                yMax = yMin + curSize.height;
            }
            var x = this._viewEdge.xMin - (contentEdge.xMin + this.node.x);
            var y = contentEdge.yMax - (curSize.height * itemAnchor.y + yMin) - (1 - viewAnchor.y) * this._viewEdge.height;
            return cc.v2(x, y);
        }
        else if (this.type === LayoutType.HORIZONTAL) {
            var totalWidth = 0;
            for (var i = 0; i < idx; i++) {
                var size = this.calcItemSizeUnfixed(i);
                totalWidth += size.width;
            }
            if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                xMax = contentEdge.xMax - (this.right + idx * this.spacingX + totalWidth);
                xMin = xMax - curSize.width;
            }
            else {
                xMin = contentEdge.xMin + this.left + idx * this.spacingX + totalWidth;
                xMax = xMin + curSize.width;
            }
            var x = curSize.width * itemAnchor.x + xMin - contentEdge.xMin - viewAnchor.x * this._viewEdge.width;
            var y = contentEdge.yMax - (this._viewEdge.yMax - this.node.y);
            return cc.v2(x, y);
        }
        return null;
    };
    /**
     * 重新排列
     * @param clear 是否清空节点，默认true(仅当不会影响已有元素节点排列时才可传入false)
     */
    VirtualLayout.prototype.rearrange = function (clear) {
        var _this = this;
        if (clear === void 0) { clear = true; }
        this._sizeDirty = true;
        this._viewDirty = true;
        if (clear) {
            this._items.forEach(function (e, i) {
                _this.putItemNode(e);
                _this._otherItemsArr.forEach(function (arr, otherIdx) { _this.putItemNode(arr[i], true, otherIdx); });
            });
            this._items.length = 0;
            this._otherItemsArr.forEach(function (arr) { arr.length = 0; });
        }
    };
    /**
     * 刷新所有激活的item
     */
    VirtualLayout.prototype.refreshAllItems = function () {
        var _this = this;
        this._items.forEach(function (item) {
            var vi = item.getComponent(VirtualItem_1.default);
            vi.onRefresh(vi.args);
            if (_this._list.others.length > 0) {
                vi.onRefreshOthers.apply(vi, vi.others);
            }
        });
    };
    __decorate([
        property({ type: cc.Enum(LayoutType), tooltip: CC_DEV && "布局模式" })
    ], VirtualLayout.prototype, "type", void 0);
    __decorate([
        property({
            type: cc.Enum(AxisDirection),
            tooltip: CC_DEV && "GRID布局的起始轴方向\nHORIZONTAL：固定宽度，动态改变高度\nVERTICAL：固定高度，动态改变宽度",
            visible: function () { return this.type === LayoutType.GRID; }
        })
    ], VirtualLayout.prototype, "startAxis", void 0);
    __decorate([
        property({ visible: function () { return this.type === LayoutType.HORIZONTAL || this.type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "left", void 0);
    __decorate([
        property({ visible: function () { return this.type === LayoutType.HORIZONTAL || this.type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "right", void 0);
    __decorate([
        property({ visible: function () { return this.type === LayoutType.VERTICAL || this.type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "top", void 0);
    __decorate([
        property({ visible: function () { return this.type === LayoutType.VERTICAL || this.type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "bottom", void 0);
    __decorate([
        property({ visible: function () { return this.type === LayoutType.HORIZONTAL || this.type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "spacingX", void 0);
    __decorate([
        property({ visible: function () { return this.type === LayoutType.VERTICAL || this.type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "spacingY", void 0);
    __decorate([
        property({
            type: cc.Enum(VerticalDirection),
            visible: function () { return this.type === LayoutType.VERTICAL || this.type === LayoutType.GRID; }
        })
    ], VirtualLayout.prototype, "verticalDirection", void 0);
    __decorate([
        property({
            type: cc.Enum(HorizontalDirection),
            visible: function () { return this.type === LayoutType.HORIZONTAL || this.type === LayoutType.GRID; }
        })
    ], VirtualLayout.prototype, "horizontalDirection", void 0);
    VirtualLayout = __decorate([
        ccclass,
        disallowMultiple
    ], VirtualLayout);
    return VirtualLayout;
}(cc.Component));
exports.default = VirtualLayout;

cc._RF.pop();