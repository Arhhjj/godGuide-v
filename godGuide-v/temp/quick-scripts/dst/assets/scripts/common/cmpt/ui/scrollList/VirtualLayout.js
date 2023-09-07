
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/scrollList/VirtualLayout.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcc2Nyb2xsTGlzdFxcVmlydHVhbExheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLDZDQUF3QztBQUN4Qyw2Q0FBOEY7QUFFeEYsSUFBQSxLQUEwQyxFQUFFLENBQUMsVUFBVSxFQUFyRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFFOUQ7O0dBRUc7QUFDSCxJQUFLLFVBT0o7QUFQRCxXQUFLLFVBQVU7SUFDWCxTQUFTO0lBQ1QsdURBQVUsQ0FBQTtJQUNWLFNBQVM7SUFDVCxtREFBUSxDQUFBO0lBQ1IsU0FBUztJQUNULDJDQUFJLENBQUE7QUFDUixDQUFDLEVBUEksVUFBVSxLQUFWLFVBQVUsUUFPZDtBQUVEOztHQUVHO0FBQ0gsSUFBSyxhQUdKO0FBSEQsV0FBSyxhQUFhO0lBQ2QsNkRBQVUsQ0FBQTtJQUNWLHlEQUFRLENBQUE7QUFDWixDQUFDLEVBSEksYUFBYSxLQUFiLGFBQWEsUUFHakI7QUFFRDs7R0FFRztBQUNILElBQUssaUJBR0o7QUFIRCxXQUFLLGlCQUFpQjtJQUNsQiwyRUFBYSxDQUFBO0lBQ2IsMkVBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSEksaUJBQWlCLEtBQWpCLGlCQUFpQixRQUdyQjtBQUVEOztHQUVHO0FBQ0gsSUFBSyxtQkFHSjtBQUhELFdBQUssbUJBQW1CO0lBQ3BCLCtFQUFhLENBQUE7SUFDYiwrRUFBYSxDQUFBO0FBQ2pCLENBQUMsRUFISSxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBR3ZCO0FBRUQ7O0dBRUc7QUFHSDtJQUFrRSxpQ0FBWTtJQUE5RTtRQUFBLHFFQXMxQkM7UUFwMUJVLFVBQUksR0FBZSxVQUFVLENBQUMsUUFBUSxDQUFDO1FBT3ZDLGVBQVMsR0FBa0IsYUFBYSxDQUFD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QUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUNsQyxPQUFPLGdCQUFLLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDN0YsQ0FBQzs4REFDa0Y7SUF2Q25FLGFBQWE7UUFGakMsT0FBTztRQUNQLGdCQUFnQjtPQUNJLGFBQWEsQ0FzMUJqQztJQUFELG9CQUFDO0NBdDFCRCxBQXMxQkMsQ0F0MUJpRSxFQUFFLENBQUMsU0FBUyxHQXMxQjdFO2tCQXQxQm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzIGZyb20gXCIuLi8uLi8uLi91dGlsL1Jlc1wiO1xyXG5pbXBvcnQgVG9vbCBmcm9tIFwiLi4vLi4vLi4vdXRpbC9Ub29sXCI7XHJcbmltcG9ydCBWaXJ0dWFsSXRlbSBmcm9tIFwiLi9WaXJ0dWFsSXRlbVwiO1xyXG5pbXBvcnQgVmlydHVhbExpc3QsIHsgTWFpblRlbXBsYXRlVHlwZSwgT3RoZXJUZW1wbGF0ZVR5cGUsIFZpcnR1YWxBcmdzIH0gZnJvbSBcIi4vVmlydHVhbExpc3RcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGRpc2FsbG93TXVsdGlwbGUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICog5biD5bGA5qih5byPXHJcbiAqL1xyXG5lbnVtIExheW91dFR5cGUge1xyXG4gICAgLyoqIOaoquWQkSAqL1xyXG4gICAgSE9SSVpPTlRBTCxcclxuICAgIC8qKiDnurXlkJEgKi9cclxuICAgIFZFUlRJQ0FMLFxyXG4gICAgLyoqIOe9keagvCAqL1xyXG4gICAgR1JJRFxyXG59XHJcblxyXG4vKipcclxuICog5biD5bGA6L205ZCR77yM5Y+q55So5LqOR1JJROW4g+WxgOOAglxyXG4gKi9cclxuZW51bSBBeGlzRGlyZWN0aW9uIHtcclxuICAgIEhPUklaT05UQUwsXHJcbiAgICBWRVJUSUNBTFxyXG59XHJcblxyXG4vKipcclxuICog57q15ZCR5o6S5YiX5pa55ZCRXHJcbiAqL1xyXG5lbnVtIFZlcnRpY2FsRGlyZWN0aW9uIHtcclxuICAgIFRPUF9UT19CT1RUT00sXHJcbiAgICBCT1RUT01fVE9fVE9QXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmqKrlkJHmjpLliJfmlrnlkJFcclxuICovXHJcbmVudW0gSG9yaXpvbnRhbERpcmVjdGlvbiB7XHJcbiAgICBMRUZUX1RPX1JJR0hULFxyXG4gICAgUklHSFRfVE9fTEVGVFxyXG59XHJcblxyXG4vKipcclxuICog6Jma5ouf5YiX6KGo5omA6ZyA55qE5biD5bGA57uE5Lu2XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5AZGlzYWxsb3dNdWx0aXBsZVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXJ0dWFsTGF5b3V0PFQgZXh0ZW5kcyBWaXJ0dWFsQXJncz4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShMYXlvdXRUeXBlKSwgdG9vbHRpcDogQ0NfREVWICYmIFwi5biD5bGA5qih5byPXCIgfSlcclxuICAgIHB1YmxpYyB0eXBlOiBMYXlvdXRUeXBlID0gTGF5b3V0VHlwZS5WRVJUSUNBTDtcclxuXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkVudW0oQXhpc0RpcmVjdGlvbiksXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwiR1JJROW4g+WxgOeahOi1t+Wni+i9tOaWueWQkVxcbkhPUklaT05UQUzvvJrlm7rlrprlrr3luqbvvIzliqjmgIHmlLnlj5jpq5jluqZcXG5WRVJUSUNBTO+8muWbuuWumumrmOW6pu+8jOWKqOaAgeaUueWPmOWuveW6plwiLFxyXG4gICAgICAgIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnR5cGUgPT09IExheW91dFR5cGUuR1JJRDsgfVxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBzdGFydEF4aXM6IEF4aXNEaXJlY3Rpb24gPSBBeGlzRGlyZWN0aW9uLkhPUklaT05UQUw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5IT1JJWk9OVEFMIHx8IHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5HUklEOyB9IH0pXHJcbiAgICBwdWJsaWMgbGVmdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50eXBlID09PSBMYXlvdXRUeXBlLkhPUklaT05UQUwgfHwgdGhpcy50eXBlID09PSBMYXlvdXRUeXBlLkdSSUQ7IH0gfSlcclxuICAgIHB1YmxpYyByaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50eXBlID09PSBMYXlvdXRUeXBlLlZFUlRJQ0FMIHx8IHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5HUklEOyB9IH0pXHJcbiAgICBwdWJsaWMgdG9wOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHZpc2libGUoKSB7IHJldHVybiB0aGlzLnR5cGUgPT09IExheW91dFR5cGUuVkVSVElDQUwgfHwgdGhpcy50eXBlID09PSBMYXlvdXRUeXBlLkdSSUQ7IH0gfSlcclxuICAgIHB1YmxpYyBib3R0b206IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5IT1JJWk9OVEFMIHx8IHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5HUklEOyB9IH0pXHJcbiAgICBwdWJsaWMgc3BhY2luZ1g6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5WRVJUSUNBTCB8fCB0aGlzLnR5cGUgPT09IExheW91dFR5cGUuR1JJRDsgfSB9KVxyXG4gICAgcHVibGljIHNwYWNpbmdZOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bShWZXJ0aWNhbERpcmVjdGlvbiksXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5WRVJUSUNBTCB8fCB0aGlzLnR5cGUgPT09IExheW91dFR5cGUuR1JJRDsgfVxyXG4gICAgfSlcclxuICAgIHB1YmxpYyB2ZXJ0aWNhbERpcmVjdGlvbjogVmVydGljYWxEaXJlY3Rpb24gPSBWZXJ0aWNhbERpcmVjdGlvbi5UT1BfVE9fQk9UVE9NO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bShIb3Jpem9udGFsRGlyZWN0aW9uKSxcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50eXBlID09PSBMYXlvdXRUeXBlLkhPUklaT05UQUwgfHwgdGhpcy50eXBlID09PSBMYXlvdXRUeXBlLkdSSUQ7IH1cclxuICAgIH0pXHJcbiAgICBwdWJsaWMgaG9yaXpvbnRhbERpcmVjdGlvbjogSG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24uTEVGVF9UT19SSUdIVDtcclxuXHJcbiAgICAvKiog5omA5bGe6Jma5ouf5YiX6KGoICovXHJcbiAgICBwcml2YXRlIF9saXN0OiBWaXJ0dWFsTGlzdDxUPiA9IG51bGw7XHJcbiAgICAvKiogbWFza+iKgueCue+8iGNvbnRlbnTniLboioLngrnvvIkgKi9cclxuICAgIHByaXZhdGUgX3ZpZXc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqIHZpZXflnZDmoIfns7vkuIt2aWV355qE6L6555WM55+p5b2iICovXHJcbiAgICBwcml2YXRlIF92aWV3RWRnZTogY2MuUmVjdCA9IG51bGw7XHJcbiAgICAvKiog5YWD57Sg6IqC54K55aSn5bCP5Zu65a6a5pe255qEc2l6ZSAqL1xyXG4gICAgcHJpdmF0ZSBfZml4ZWRTaXplOiBjYy5TaXplID0gbnVsbDtcclxuICAgIC8qKiDmoIforrDlvZPliY3luKfmmK/lkKbpnIDopoHmm7TmlrBjb250ZW50IHNpemUgKi9cclxuICAgIHByaXZhdGUgX3NpemVEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOagh+iusOW9k+WJjeW4p+aYr+WQpumcgOimgeabtOaWsHZpZXfljLrln5/mlbDmja7mmL7npLogKi9cclxuICAgIHByaXZhdGUgX3ZpZXdEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOagh+iusOW9k+WJjeW4p+aYr+WQpumcgOimgeWQjOatpW90aGVycyBjb250ZW5055qE5Z2Q5qCHICovXHJcbiAgICBwcml2YXRlIF9wb3NEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIG1haW4gY29udGVudOa/gOa0u+eKtuaAgeeahGl0ZW0gKi9cclxuICAgIHByaXZhdGUgX2l0ZW1zOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIC8qKiBtYWluIGNvbnRlbnTooqvlm57mlLbnmoRpdGVt5rGg77yI5LiN56e75Ye66IqC54K55qCR77yM5Y+q6K6+572ub3BhY2l0ee+8iSAqL1xyXG4gICAgcHJpdmF0ZSBfaXRlbVBvb2w6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgLyoqIG90aGVycyBjb250ZW505r+A5rS754q25oCB55qEaXRlbe+8jOS4i+agh+mhuuW6j+S4jnRoaXMubGlzdC5PdGhlcnPmlbDnu4TkuIDoh7QgKi9cclxuICAgIHByaXZhdGUgX290aGVySXRlbXNBcnI6IGNjLk5vZGVbXVtdID0gW107XHJcbiAgICAvKiogb3RoZXJzIGNvbnRlbnTooqvlm57mlLbnmoRpdGVt5rGg5pWw57uE77yI5LiN56e75Ye66IqC54K55qCR77yM5Y+q6K6+572ub3BhY2l0ee+8ie+8jOS4i+agh+mhuuW6j+S4jnRoaXMubGlzdC5PdGhlcnPmlbDnu4TkuIDoh7QgKi9cclxuICAgIHByaXZhdGUgX290aGVySXRlbVBvb2xBcnI6IGNjLk5vZGVbXVtdID0gW107XHJcblxyXG4gICAgcHVibGljIG9uSW5pdChsaXN0OiBWaXJ0dWFsTGlzdDxUPik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIHRoaXMuX3ZpZXdFZGdlID0gdGhpcy5nZXROb2RlRWRnZVJlY3QodGhpcy5fdmlldyk7XHJcblxyXG4gICAgICAgIC8vIOWIneWni+WMluWIhuWxguebuOWFs+aVsOaNrlxyXG4gICAgICAgIHRoaXMuX290aGVySXRlbXNBcnIgPSBbXTtcclxuICAgICAgICB0aGlzLl9vdGhlckl0ZW1Qb29sQXJyID0gW107XHJcbiAgICAgICAgdGhpcy5fbGlzdC5vdGhlcnMuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9vdGhlckl0ZW1zQXJyLnB1c2goW10pO1xyXG4gICAgICAgICAgICB0aGlzLl9vdGhlckl0ZW1Qb29sQXJyLnB1c2goW10pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlhYPntKDlpKflsI/lm7rlrprml7bliJ3lp4vljJZmaXhlZFNpemVcclxuICAgICAgICBpZiAodGhpcy5fZml4ZWRTaXplID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbU5vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9maXhlZFNpemUgPSB0aGlzLl9pdGVtUG9vbFswXS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5rOo5YaM5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMub25Qb3NpdGlvbkNoYW5nZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX3ZpZXcub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLm9uVmlld1NpemVDaGFuZ2VkLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIOazqOmUgOS6i+S7tlxyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5vblBvc2l0aW9uQ2hhbmdlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fdmlldy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLm9uVmlld1NpemVDaGFuZ2VkLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeri+WNs+abtOaWsOW4g+WxgFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9yY2VVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQb3MoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNpemUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbGF0ZVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkIzmraVvdGhlcnPnmoTlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQb3MoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wb3NEaXJ0eSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Bvc0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGlzdC5vdGhlcnMuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLmNvbnRlbnQucG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrBjb250ZW50IHNpemVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaXplKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fc2l6ZURpcnR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9saXN0LmlzRml4ZWRTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2l6ZUZpeGVkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaXplVW5maXhlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNpemVGaXhlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBMYXlvdXRUeXBlLlZFUlRJQ0FMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gdGhpcy50b3AgKyB0aGlzLmJvdHRvbSArICh0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIC0gMSkgKiB0aGlzLnNwYWNpbmdZICsgdGhpcy5fZml4ZWRTaXplLmhlaWdodCAqIHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IExheW91dFR5cGUuSE9SSVpPTlRBTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5hcmdzQXJyLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSB0aGlzLmxlZnQgKyB0aGlzLnJpZ2h0ICsgKHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGggLSAxKSAqIHRoaXMuc3BhY2luZ1ggKyB0aGlzLl9maXhlZFNpemUud2lkdGggKiB0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0QXhpcyA9PT0gQXhpc0RpcmVjdGlvbi5IT1JJWk9OVEFMKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5hcmdzQXJyLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOiuoeeul+S4gOihjOWPr+S7peaOkuWIl+WHoOS4qu+8jOiHs+WwkTHkuKpcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBNYXRoLmZsb29yKCh0aGlzLm5vZGUud2lkdGggLSB0aGlzLmxlZnQgLSB0aGlzLnJpZ2h0ICsgdGhpcy5zcGFjaW5nWCkgLyAodGhpcy5fZml4ZWRTaXplLndpZHRoICsgdGhpcy5zcGFjaW5nWCkpO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gTWF0aC5tYXgobnVtLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIOiuoeeul+WPr+S7peaOkuWIl+WHoOihjFxyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguY2VpbCh0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIC8gbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vIOmrmOW6plxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IHRoaXMudG9wICsgdGhpcy5ib3R0b20gKyAocm93IC0gMSkgKiB0aGlzLnNwYWNpbmdZICsgdGhpcy5fZml4ZWRTaXplLmhlaWdodCAqIHJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDorqHnrpfkuIDliJflj6/ku6XmjpLliJflh6DkuKrvvIzoh7PlsJEx5LiqXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTWF0aC5mbG9vcigodGhpcy5ub2RlLmhlaWdodCAtIHRoaXMudG9wIC0gdGhpcy5ib3R0b20gKyB0aGlzLnNwYWNpbmdZKSAvICh0aGlzLl9maXhlZFNpemUuaGVpZ2h0ICsgdGhpcy5zcGFjaW5nWSkpO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gTWF0aC5tYXgobnVtLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIOiuoeeul+WPr+S7peaOkuWIl+WHoOWIl1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IE1hdGguY2VpbCh0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIC8gbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vIOWuveW6plxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gdGhpcy5sZWZ0ICsgdGhpcy5yaWdodCArIChjb2x1bW4gLSAxKSAqIHRoaXMuc3BhY2luZ1ggKyB0aGlzLl9maXhlZFNpemUud2lkdGggKiBjb2x1bW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaXplVW5maXhlZCgpOiB2b2lkIHtcclxuICAgICAgICAvLyDnvJPlrZjlrr3pq5jvvIzmnIDlkI7otYvlgLzvvIzmmK/lm6DkuLrkv67mlLljb250ZW50IHNpemXml7bkvJrop6blj5FzY3JvbGx2aWV3Ll9jYWxjdWxhdGVCb3VuZGFyee+8jOaUueWPmGNvbnRlbnTnmoTlnZDmoIdcclxuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBMYXlvdXRUeXBlLlZFUlRJQ0FMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRvcCArIHRoaXMuYm90dG9tICsgKHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGggLSAxKSAqIHRoaXMuc3BhY2luZ1k7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlzdC5hcmdzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuY2FsY0l0ZW1TaXplVW5maXhlZChpKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzaXplLmhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gcmVzdWx0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBMYXlvdXRUeXBlLkhPUklaT05UQUwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5sZWZ0ICsgdGhpcy5yaWdodCArICh0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIC0gMSkgKiB0aGlzLnNwYWNpbmdYO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLmNhbGNJdGVtU2l6ZVVuZml4ZWQoaSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05pawdmlld+WMuuWfn+aVsOaNruaYvuekulxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWV3RGlydHkgfHwgdGhpcy5fbGlzdC5hcmdzQXJyLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdmlld0RpcnR5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9saXN0LmlzRml4ZWRTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlld0ZpeGVkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3VW5maXhlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpZXdGaXhlZCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmlld1Jlc3VsdCA9IHRoaXMuY2hlY2tWaWV3SXRlbSgpO1xyXG4gICAgICAgIGxldCBpblZpZXcgPSB2aWV3UmVzdWx0LmluVmlldztcclxuICAgICAgICBsZXQgb3V0VmlldyA9IHZpZXdSZXN1bHQub3V0VmlldztcclxuICAgICAgICBsZXQgY29udGVudEVkZ2UgPSB0aGlzLmdldE5vZGVFZGdlUmVjdCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGxldCB4TWF4OiBudW1iZXIsIHhNaW46IG51bWJlciwgeU1heDogbnVtYmVyLCB5TWluOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5WRVJUSUNBTCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgICAgICB5TWF4ID0gY29udGVudEVkZ2UueU1heCAtICh0aGlzLnRvcCArIGkgKiB0aGlzLnNwYWNpbmdZICsgdGhpcy5fZml4ZWRTaXplLmhlaWdodCAqIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHlNaW4gPSB5TWF4IC0gdGhpcy5fZml4ZWRTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeU1heCArIHRoaXMubm9kZS55IDwgdGhpcy5fdmlld0VkZ2UueU1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHlNaW4gKyB0aGlzLm5vZGUueSA+IHRoaXMuX3ZpZXdFZGdlLnlNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB5TWluID0gY29udGVudEVkZ2UueU1pbiArIHRoaXMuYm90dG9tICsgaSAqIHRoaXMuc3BhY2luZ1kgKyB0aGlzLl9maXhlZFNpemUuaGVpZ2h0ICogaTtcclxuICAgICAgICAgICAgICAgICAgICB5TWF4ID0geU1pbiArIHRoaXMuX2ZpeGVkU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHlNaW4gKyB0aGlzLm5vZGUueSA+IHRoaXMuX3ZpZXdFZGdlLnlNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5TWF4ICsgdGhpcy5ub2RlLnkgPCB0aGlzLl92aWV3RWRnZS55TWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDliKTmlq3mmL7npLrljLrln5/lhoXpg6jmmK/lkKbmnInoioLngrnmmL7npLrmraTmnaHmlbDmja5cclxuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGluVmlldy5maW5kSW5kZXgoKGUpID0+IHsgcmV0dXJuIHRoaXMuX2l0ZW1zW2VdLmdldENvbXBvbmVudChWaXJ0dWFsSXRlbSkuZGF0YUlkeCA9PT0gaTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ6IqC54K55pi+56S65q2k5p2h5pWw5o2u77yM6ZyA5L2/55So5pi+56S65Yy65Z+f5aSW55qE6IqC54K55pi+56S65q2k5p2h5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkeDogbnVtYmVyID0gb3V0Vmlldy5sZW5ndGggPT09IDAgPyB0aGlzLmFkZEl0ZW1Ob2RlKCkgOiBvdXRWaWV3LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMuX2l0ZW1zW2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGNjLnYzKDAsIHlNaW4gKyBpdGVtLmFuY2hvclkgKiBpdGVtLmhlaWdodCksIGksIGl0ZW1JZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IExheW91dFR5cGUuSE9SSVpPTlRBTCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeE1heCA9IGNvbnRlbnRFZGdlLnhNYXggLSAodGhpcy5yaWdodCArIGkgKiB0aGlzLnNwYWNpbmdYICsgdGhpcy5fZml4ZWRTaXplLndpZHRoICogaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgeE1pbiA9IHhNYXggLSB0aGlzLl9maXhlZFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhNYXggKyB0aGlzLm5vZGUueCA8IHRoaXMuX3ZpZXdFZGdlLnhNaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4TWluICsgdGhpcy5ub2RlLnggPiB0aGlzLl92aWV3RWRnZS54TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeE1pbiA9IGNvbnRlbnRFZGdlLnhNaW4gKyB0aGlzLmxlZnQgKyBpICogdGhpcy5zcGFjaW5nWCArIHRoaXMuX2ZpeGVkU2l6ZS53aWR0aCAqIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgeE1heCA9IHhNaW4gKyB0aGlzLl9maXhlZFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhNaW4gKyB0aGlzLm5vZGUueCA+IHRoaXMuX3ZpZXdFZGdlLnhNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4TWF4ICsgdGhpcy5ub2RlLnggPCB0aGlzLl92aWV3RWRnZS54TWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDliKTmlq3mmL7npLrljLrln5/lhoXpg6jmmK/lkKbmnInoioLngrnmmL7npLrmraTmnaHmlbDmja5cclxuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGluVmlldy5maW5kSW5kZXgoKGUpID0+IHsgcmV0dXJuIHRoaXMuX2l0ZW1zW2VdLmdldENvbXBvbmVudChWaXJ0dWFsSXRlbSkuZGF0YUlkeCA9PT0gaTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ6IqC54K55pi+56S65q2k5p2h5pWw5o2u77yM6ZyA5L2/55So5pi+56S65Yy65Z+f5aSW55qE6IqC54K55pi+56S65q2k5p2h5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkeDogbnVtYmVyID0gb3V0Vmlldy5sZW5ndGggPT09IDAgPyB0aGlzLmFkZEl0ZW1Ob2RlKCkgOiBvdXRWaWV3LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMuX2l0ZW1zW2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGNjLnYzKHhNaW4gKyBpdGVtLmFuY2hvclggKiBpdGVtLndpZHRoLCAwKSwgaSwgaXRlbUlkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8g6K6h566X5b2T5YmN5YWD57Sg5o6S5Zyo56ys5Yeg6KGM56ys5Yeg5YiX77yM5LuOMOW8gOWni1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvd0luZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbkluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRBeGlzID09PSBBeGlzRGlyZWN0aW9uLkhPUklaT05UQUwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDotbflp4vovbTkuLrmqKrlkJFcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtID0gTWF0aC5mbG9vcigodGhpcy5ub2RlLndpZHRoIC0gdGhpcy5sZWZ0IC0gdGhpcy5yaWdodCArIHRoaXMuc3BhY2luZ1gpIC8gKHRoaXMuX2ZpeGVkU2l6ZS53aWR0aCArIHRoaXMuc3BhY2luZ1gpKTtcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSBNYXRoLm1heChudW0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0luZGV4ID0gTWF0aC5mbG9vcihpIC8gbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IGkgJSBudW07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6h566X57q15ZCRXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeU1heCA9IGNvbnRlbnRFZGdlLnlNYXggLSAodGhpcy50b3AgKyByb3dJbmRleCAqIHRoaXMuc3BhY2luZ1kgKyB0aGlzLl9maXhlZFNpemUuaGVpZ2h0ICogcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5TWluID0geU1heCAtIHRoaXMuX2ZpeGVkU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5TWF4ICsgdGhpcy5ub2RlLnkgPCB0aGlzLl92aWV3RWRnZS55TWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeU1pbiArIHRoaXMubm9kZS55ID4gdGhpcy5fdmlld0VkZ2UueU1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5TWluID0gY29udGVudEVkZ2UueU1pbiArIHRoaXMuYm90dG9tICsgcm93SW5kZXggKiB0aGlzLnNwYWNpbmdZICsgdGhpcy5fZml4ZWRTaXplLmhlaWdodCAqIHJvd0luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5TWF4ID0geU1pbiArIHRoaXMuX2ZpeGVkU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5TWluICsgdGhpcy5ub2RlLnkgPiB0aGlzLl92aWV3RWRnZS55TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeU1heCArIHRoaXMubm9kZS55IDwgdGhpcy5fdmlld0VkZ2UueU1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6h566X5qiq5ZCRXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhNYXggPSBjb250ZW50RWRnZS54TWF4IC0gKHRoaXMucmlnaHQgKyBjb2x1bW5JbmRleCAqIHRoaXMuc3BhY2luZ1ggKyB0aGlzLl9maXhlZFNpemUud2lkdGggKiBjb2x1bW5JbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhNaW4gPSB4TWF4IC0gdGhpcy5fZml4ZWRTaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhNaW4gPSBjb250ZW50RWRnZS54TWluICsgdGhpcy5sZWZ0ICsgY29sdW1uSW5kZXggKiB0aGlzLnNwYWNpbmdYICsgdGhpcy5fZml4ZWRTaXplLndpZHRoICogY29sdW1uSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhNYXggPSB4TWluICsgdGhpcy5fZml4ZWRTaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeE1heCArIHRoaXMubm9kZS54IDwgdGhpcy5fdmlld0VkZ2UueE1pbiB8fCB4TWluICsgdGhpcy5ub2RlLnggPiB0aGlzLl92aWV3RWRnZS54TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6LW35aeL6L205Li657q15ZCRXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IE1hdGguZmxvb3IoKHRoaXMubm9kZS5oZWlnaHQgLSB0aGlzLnRvcCAtIHRoaXMuYm90dG9tICsgdGhpcy5zcGFjaW5nWSkgLyAodGhpcy5fZml4ZWRTaXplLmhlaWdodCArIHRoaXMuc3BhY2luZ1kpKTtcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSBNYXRoLm1heChudW0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0luZGV4ID0gaSAlIG51bTtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IE1hdGguZmxvb3IoaSAvIG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6h566X5qiq5ZCRXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhNYXggPSBjb250ZW50RWRnZS54TWF4IC0gKHRoaXMucmlnaHQgKyBjb2x1bW5JbmRleCAqIHRoaXMuc3BhY2luZ1ggKyB0aGlzLl9maXhlZFNpemUud2lkdGggKiBjb2x1bW5JbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhNaW4gPSB4TWF4IC0gdGhpcy5fZml4ZWRTaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeE1heCArIHRoaXMubm9kZS54IDwgdGhpcy5fdmlld0VkZ2UueE1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhNaW4gKyB0aGlzLm5vZGUueCA+IHRoaXMuX3ZpZXdFZGdlLnhNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeE1pbiA9IGNvbnRlbnRFZGdlLnhNaW4gKyB0aGlzLmxlZnQgKyBjb2x1bW5JbmRleCAqIHRoaXMuc3BhY2luZ1ggKyB0aGlzLl9maXhlZFNpemUud2lkdGggKiBjb2x1bW5JbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeE1heCA9IHhNaW4gKyB0aGlzLl9maXhlZFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4TWluICsgdGhpcy5ub2RlLnggPiB0aGlzLl92aWV3RWRnZS54TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeE1heCArIHRoaXMubm9kZS54IDwgdGhpcy5fdmlld0VkZ2UueE1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6h566X57q15ZCRXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeU1heCA9IGNvbnRlbnRFZGdlLnlNYXggLSAodGhpcy50b3AgKyByb3dJbmRleCAqIHRoaXMuc3BhY2luZ1kgKyB0aGlzLl9maXhlZFNpemUuaGVpZ2h0ICogcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5TWluID0geU1heCAtIHRoaXMuX2ZpeGVkU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeU1pbiA9IGNvbnRlbnRFZGdlLnlNaW4gKyB0aGlzLmJvdHRvbSArIHJvd0luZGV4ICogdGhpcy5zcGFjaW5nWSArIHRoaXMuX2ZpeGVkU2l6ZS5oZWlnaHQgKiByb3dJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeU1heCA9IHlNaW4gKyB0aGlzLl9maXhlZFNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeU1heCArIHRoaXMubm9kZS55IDwgdGhpcy5fdmlld0VkZ2UueU1pbiB8fCB5TWluICsgdGhpcy5ub2RlLnkgPiB0aGlzLl92aWV3RWRnZS55TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDliKTmlq3mmL7npLrljLrln5/lhoXpg6jmmK/lkKbmnInoioLngrnmmL7npLrmraTmnaHmlbDmja5cclxuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGluVmlldy5maW5kSW5kZXgoKGUpID0+IHsgcmV0dXJuIHRoaXMuX2l0ZW1zW2VdLmdldENvbXBvbmVudChWaXJ0dWFsSXRlbSkuZGF0YUlkeCA9PT0gaTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ6IqC54K55pi+56S65q2k5p2h5pWw5o2u77yM6ZyA5L2/55So5pi+56S65Yy65Z+f5aSW55qE6IqC54K55pi+56S65q2k5p2h5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkeDogbnVtYmVyID0gb3V0Vmlldy5sZW5ndGggPT09IDAgPyB0aGlzLmFkZEl0ZW1Ob2RlKCkgOiBvdXRWaWV3LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMuX2l0ZW1zW2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGNjLnYzKHhNaW4gKyBpdGVtLmFuY2hvclggKiBpdGVtLndpZHRoLCB5TWluICsgaXRlbS5hbmNob3JZICogaXRlbS5oZWlnaHQpLCBpLCBpdGVtSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Zue5pS25Yy65Z+f5aSW55qE6IqC54K5XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG91dFZpZXcubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy5wdXRBY3RpdmF0ZWRJdGVtQnlJbmRleChvdXRWaWV3W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVWaWV3VW5maXhlZCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmlld1Jlc3VsdCA9IHRoaXMuY2hlY2tWaWV3SXRlbSgpO1xyXG4gICAgICAgIGxldCBpblZpZXcgPSB2aWV3UmVzdWx0LmluVmlldztcclxuICAgICAgICBsZXQgb3V0VmlldyA9IHZpZXdSZXN1bHQub3V0VmlldztcclxuICAgICAgICBsZXQgY29udGVudEVkZ2UgPSB0aGlzLmdldE5vZGVFZGdlUmVjdCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGxldCB4TWF4OiBudW1iZXIsIHhNaW46IG51bWJlciwgeU1heDogbnVtYmVyLCB5TWluOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5WRVJUSUNBTCkge1xyXG4gICAgICAgICAgICBsZXQgdG90YWxIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlzdC5hcmdzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuY2FsY0l0ZW1TaXplVW5maXhlZChpKTtcclxuICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgICAgICB5TWF4ID0gY29udGVudEVkZ2UueU1heCAtICh0aGlzLnRvcCArIGkgKiB0aGlzLnNwYWNpbmdZICsgKHRvdGFsSGVpZ2h0IC0gc2l6ZS5oZWlnaHQpKTtcclxuICAgICAgICAgICAgICAgICAgICB5TWluID0geU1heCAtIHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5TWF4ICsgdGhpcy5ub2RlLnkgPCB0aGlzLl92aWV3RWRnZS55TWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeU1pbiArIHRoaXMubm9kZS55ID4gdGhpcy5fdmlld0VkZ2UueU1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHlNaW4gPSBjb250ZW50RWRnZS55TWluICsgdGhpcy5ib3R0b20gKyBpICogdGhpcy5zcGFjaW5nWSArICh0b3RhbEhlaWdodCAtIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB5TWF4ID0geU1pbiArIHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5TWluICsgdGhpcy5ub2RlLnkgPiB0aGlzLl92aWV3RWRnZS55TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeU1heCArIHRoaXMubm9kZS55IDwgdGhpcy5fdmlld0VkZ2UueU1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5pi+56S65Yy65Z+f5YaF6YOo5piv5ZCm5pyJ6IqC54K55pi+56S65q2k5p2h5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBpblZpZXcuZmluZEluZGV4KChlKSA9PiB7IHJldHVybiB0aGlzLl9pdGVtc1tlXS5nZXRDb21wb25lbnQoVmlydHVhbEl0ZW0pLmRhdGFJZHggPT09IGk7IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOayoeacieiKgueCueaYvuekuuatpOadoeaVsOaNru+8jOmcgOS9v+eUqOaYvuekuuWMuuWfn+WklueahOiKgueCueaYvuekuuatpOadoeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1JZHg6IG51bWJlciA9IG91dFZpZXcubGVuZ3RoID09PSAwID8gdGhpcy5hZGRJdGVtTm9kZSgpIDogb3V0Vmlldy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSB0aGlzLl9pdGVtc1tpdGVtSWR4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0Q29udGVudFNpemUoc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oY2MudjMoMCwgeU1pbiArIGl0ZW0uYW5jaG9yWSAqIHNpemUuaGVpZ2h0KSwgaSwgaXRlbUlkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5IT1JJWk9OVEFMKSB7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbFdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3QuYXJnc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLmNhbGNJdGVtU2l6ZVVuZml4ZWQoaSk7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFdpZHRoICs9IHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQpIHtcclxuICAgICAgICAgICAgICAgICAgICB4TWF4ID0gY29udGVudEVkZ2UueE1heCAtICh0aGlzLnJpZ2h0ICsgaSAqIHRoaXMuc3BhY2luZ1ggKyAodG90YWxXaWR0aCAtIHNpemUud2lkdGgpKTtcclxuICAgICAgICAgICAgICAgICAgICB4TWluID0geE1heCAtIHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhNYXggKyB0aGlzLm5vZGUueCA8IHRoaXMuX3ZpZXdFZGdlLnhNaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4TWluICsgdGhpcy5ub2RlLnggPiB0aGlzLl92aWV3RWRnZS54TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeE1pbiA9IGNvbnRlbnRFZGdlLnhNaW4gKyB0aGlzLmxlZnQgKyBpICogdGhpcy5zcGFjaW5nWCArICh0b3RhbFdpZHRoIC0gc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeE1heCA9IHhNaW4gKyBzaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4TWluICsgdGhpcy5ub2RlLnggPiB0aGlzLl92aWV3RWRnZS54TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeE1heCArIHRoaXMubm9kZS54IDwgdGhpcy5fdmlld0VkZ2UueE1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5pi+56S65Yy65Z+f5YaF6YOo5piv5ZCm5pyJ6IqC54K55pi+56S65q2k5p2h5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBpblZpZXcuZmluZEluZGV4KChlKSA9PiB7IHJldHVybiB0aGlzLl9pdGVtc1tlXS5nZXRDb21wb25lbnQoVmlydHVhbEl0ZW0pLmRhdGFJZHggPT09IGk7IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOayoeacieiKgueCueaYvuekuuatpOadoeaVsOaNru+8jOmcgOS9v+eUqOaYvuekuuWMuuWfn+WklueahOiKgueCueaYvuekuuatpOadoeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1JZHg6IG51bWJlciA9IG91dFZpZXcubGVuZ3RoID09PSAwID8gdGhpcy5hZGRJdGVtTm9kZSgpIDogb3V0Vmlldy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSB0aGlzLl9pdGVtc1tpdGVtSWR4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0Q29udGVudFNpemUoc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oY2MudjMoeE1pbiArIGl0ZW0uYW5jaG9yWCAqIHNpemUud2lkdGgsIDApLCBpLCBpdGVtSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Zue5pS25Yy65Z+f5aSW55qE6IqC54K5XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG91dFZpZXcubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy5wdXRBY3RpdmF0ZWRJdGVtQnlJbmRleChvdXRWaWV3W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljLrliIblnKh2aWV35YaF6YOo5LiO5aSW6YOo55qEaXRlbXPmlbDnu4TkuIvmoIfvvIjov5Tlm57nmoTkuIvmoIfmlbDnu4TkvJrku47lsI/liLDlpKfmjpLluo/vvIlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja1ZpZXdJdGVtKCk6IHsgaW5WaWV3OiBudW1iZXJbXSwgb3V0VmlldzogbnVtYmVyW10gfSB7XHJcbiAgICAgICAgLy8g5pi+56S65Yy65Z+f5YaF6YOo55qE5LiL5qCHXHJcbiAgICAgICAgbGV0IGluVmlldzogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAvLyDmmL7npLrljLrln5/lpJbpg6jnmoTkuIvmoIdcclxuICAgICAgICBsZXQgb3V0VmlldzogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gTGF5b3V0VHlwZS5WRVJUSUNBTCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2l0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJveCA9IGl0ZW0uZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmIChib3gueU1pbiArIHRoaXMubm9kZS55IDw9IHRoaXMuX3ZpZXdFZGdlLnlNYXggJiYgYm94LnlNYXggKyB0aGlzLm5vZGUueSA+PSB0aGlzLl92aWV3RWRnZS55TWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5WaWV3LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dFZpZXcucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBMYXlvdXRUeXBlLkhPUklaT05UQUwpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9pdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBib3ggPSBpdGVtLmdldEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm94LnhNaW4gKyB0aGlzLm5vZGUueCA8PSB0aGlzLl92aWV3RWRnZS54TWF4ICYmIGJveC54TWF4ICsgdGhpcy5ub2RlLnggPj0gdGhpcy5fdmlld0VkZ2UueE1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluVmlldy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRWaWV3LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2l0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJveCA9IGl0ZW0uZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmIChib3gueE1pbiArIHRoaXMubm9kZS54IDw9IHRoaXMuX3ZpZXdFZGdlLnhNYXggJiYgYm94LnhNYXggKyB0aGlzLm5vZGUueCA+PSB0aGlzLl92aWV3RWRnZS54TWluXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgYm94LnlNaW4gKyB0aGlzLm5vZGUueSA8PSB0aGlzLl92aWV3RWRnZS55TWF4ICYmIGJveC55TWF4ICsgdGhpcy5ub2RlLnkgPj0gdGhpcy5fdmlld0VkZ2UueU1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluVmlldy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRWaWV3LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IGluVmlldzogaW5WaWV3LCBvdXRWaWV3OiBvdXRWaWV3IH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5pdGVt5pWw5o2u5LiO5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gcCDoioLngrnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBkYXRhSWR4IHRoaXMuX2RhdGFBcnLnmoTkuIvmoIcgXHJcbiAgICAgKiBAcGFyYW0gaXRlbUlkeCB0aGlzLl9pdGVtc+eahOS4i+agh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEl0ZW0ocDogY2MuVmVjMywgZGF0YUlkeDogbnVtYmVyLCBpdGVtSWR4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2l0ZW1zW2l0ZW1JZHhdO1xyXG4gICAgICAgIGl0ZW0ucG9zaXRpb24gPSBwO1xyXG4gICAgICAgIGxldCB2aSA9IGl0ZW0uZ2V0Q29tcG9uZW50KFZpcnR1YWxJdGVtKTtcclxuICAgICAgICB2aS5kYXRhSWR4ID0gZGF0YUlkeDtcclxuICAgICAgICB2aS5hcmdzID0gdGhpcy5fbGlzdC5hcmdzQXJyW2RhdGFJZHhdO1xyXG4gICAgICAgIHZpLm9uUmVmcmVzaCh2aS5hcmdzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3Qub3RoZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG5vZGVzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fb3RoZXJJdGVtc0Fyci5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlW2l0ZW1JZHhdLnBvc2l0aW9uID0gcDtcclxuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goZVtpdGVtSWR4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2aS5vdGhlcnMgPSBub2RlcztcclxuICAgICAgICAgICAgdmkub25SZWZyZXNoT3RoZXJzKC4uLnZpLm90aGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5r+A5rS75paw55qE6IqC54K577yM5bm25re75Yqg5YiwY29udGVudOS4i1xyXG4gICAgICogQHBhcmFtIHNob3cg6buY6K6k5Li6dHJ1ZeOAgmZhbHNl5pe25LiN5r+A5rS76IqC54K55bm25re75Yqg6L+b6IqC54K55rGg5Lit77yI5LuF5Zyob25Jbml05Lit5L2/55So77yJXHJcbiAgICAgKiBAcmV0dXJucyDmv4DmtLvnmoToioLngrnlnKh0aGlzLl9pdGVtc+S4reeahOS4i+agh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEl0ZW1Ob2RlKHNob3c6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1Qb29sLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX2l0ZW1Qb29sLnBvcCgpO1xyXG4gICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9vdGhlckl0ZW1Qb29sQXJyLmZvckVhY2goKGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvdGhlck5vZGUgPSBlLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgb3RoZXJOb2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vdGhlckl0ZW1zQXJyW2ldLnB1c2gob3RoZXJOb2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRtcDogY2MuTm9kZSB8IGNjLlByZWZhYiA9IHRoaXMuX2xpc3QubWFpbi50ZW1wbGF0ZVR5cGUgPT09IE1haW5UZW1wbGF0ZVR5cGUuUFJFRkFCID8gdGhpcy5fbGlzdC5tYWluLnRlbXBsYXRlUHJlZmFiIDogdGhpcy5fbGlzdC5tYWluLnRlbXBsYXRlTm9kZTtcclxuICAgICAgICAgICAgbm9kZSA9IFJlcy5pbnN0YW50aWF0ZSh0bXAsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIGlmICghbm9kZS5nZXRDb21wb25lbnQoVmlydHVhbEl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENvbXBvbmVudChWaXJ0dWFsSXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHV0SXRlbU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOaLt+i0neS4gOS7veWtkOiKgueCueaVsOe7hO+8jOmYsuatouWtkOiKgueCueenu+mZpOaXtuaUueWPmOS4i+agh1xyXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW5Db3B5ID0gbm9kZS5jaGlsZHJlbi5zbGljZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5vdGhlcnMuZm9yRWFjaCgoZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG90aGVyTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGUudGVtcGxhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPdGhlclRlbXBsYXRlVHlwZS5OT0RFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck5vZGUgPSBSZXMuaW5zdGFudGlhdGUoZS50ZW1wbGF0ZU5vZGUsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3RoZXJUZW1wbGF0ZVR5cGUuUFJFRkFCOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck5vZGUgPSBSZXMuaW5zdGFudGlhdGUoZS50ZW1wbGF0ZVByZWZhYiwgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPdGhlclRlbXBsYXRlVHlwZS5NQUlOX0lURU1fQ0hJTEQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghVG9vbC5pblJhbmdlKDAsIGNoaWxkcmVuQ29weS5sZW5ndGggLSAxLCBlLnRlbXBsYXRlQ2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihgW1ZpcnR1YWxMYXlvdXQuYWRkSXRlbU5vZGVdIGVycm9yIGUudGVtcGxhdGVDaGlsZDogJHtlLnRlbXBsYXRlQ2hpbGR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJOb2RlID0gY2hpbGRyZW5Db3B5W2UudGVtcGxhdGVDaGlsZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGBbVmlydHVhbExheW91dC5hZGRJdGVtTm9kZV0gZXJyb3IgZS50ZW1wbGF0ZVR5cGU6ICR7ZS50ZW1wbGF0ZVR5cGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUuY29udGVudC5hZGRDaGlsZChvdGhlck5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdGhlck5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vdGhlckl0ZW1zQXJyW2ldLnB1c2gob3RoZXJOb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXRJdGVtTm9kZShvdGhlck5vZGUsIHRydWUsIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG6IqC54K55pS+5YWl6IqC54K55rGgXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBcclxuICAgICAqIEBwYXJhbSBpc090aGVyIOaYr+WQpuS4uk90aGVyc+S4i+eahOiKgueCuVxyXG4gICAgICogQHBhcmFtIG90aGVySWR4IE90aGVyc+eahOS4i+agh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHB1dEl0ZW1Ob2RlKG5vZGU6IGNjLk5vZGUsIGlzT3RoZXI6IGJvb2xlYW4gPSBmYWxzZSwgb3RoZXJJZHg6IG51bWJlciA9IDApOiB2b2lkIHtcclxuICAgICAgICBub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIC8vIOmYsuatouW3suWbnuaUtueahOiKgueCueinpuWPkeeCueWHu+S6i+S7tlxyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcclxuICAgICAgICBpZiAoaXNPdGhlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9vdGhlckl0ZW1Qb29sQXJyW290aGVySWR4XS5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2aSA9IG5vZGUuZ2V0Q29tcG9uZW50KFZpcnR1YWxJdGVtKTtcclxuICAgICAgICAgICAgdmkub25SZXNldCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtUG9vbC5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWbnuaUtuW3sua/gOa0u+eahOiKgueCuVxyXG4gICAgICogQHBhcmFtIGluZGV4IOiKgueCueWcqHRoaXMuX2l0ZW1z5Lit55qE5LiL5qCHXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHV0QWN0aXZhdGVkSXRlbUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHV0SXRlbU5vZGUodGhpcy5faXRlbXNbaW5kZXhdKTtcclxuICAgICAgICB0aGlzLl9vdGhlckl0ZW1zQXJyLmZvckVhY2goKGFyciwgb3RoZXJJZHgpID0+IHsgdGhpcy5wdXRJdGVtTm9kZShhcnJbaW5kZXhdLCB0cnVlLCBvdGhlcklkeCk7IH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMuX290aGVySXRlbXNBcnIuZm9yRWFjaCgoYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Q6IqC54K55Z2Q5qCH57O75LiL5Z2Q5qCH6L2s5o2i5Li654i26IqC54K55Z2Q5qCH57O75LiL5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydFRvUGFyZW50UG9zKHBvczogY2MuVmVjMywgY2hpbGQ6IGNjLk5vZGUpOiBjYy5WZWMzIHtcclxuICAgICAgICByZXR1cm4gcG9zLmFkZChjaGlsZC5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDniLboioLngrnlnZDmoIfns7vkuIvlnZDmoIfovazmjaLkuLrlrZDoioLngrnlnZDmoIfns7vkuIvlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9DaGlsZFBvcyhwb3M6IGNjLlZlYzMsIGNoaWxkOiBjYy5Ob2RlKTogY2MuVmVjMyB7XHJcbiAgICAgICAgcmV0dXJuIHBvcy5zdWIoY2hpbGQucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6IqC54K56Ieq6Lqr5Z2Q5qCH57O75LiL55qE6IqC54K56L6555WM55+p5b2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Tm9kZUVkZ2VSZWN0KG5vZGU6IGNjLk5vZGUpOiBjYy5SZWN0IHtcclxuICAgICAgICByZXR1cm4gY2MucmVjdCgtbm9kZS53aWR0aCAqIG5vZGUuYW5jaG9yWCwgLW5vZGUuaGVpZ2h0ICogbm9kZS5hbmNob3JZLCBub2RlLndpZHRoLCBub2RlLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lhYPntKDkuIvmoIforqHnrpflr7nlupTlhYPntKDlpKflsI/vvIxpc0ZpeGVkU2l6ZeS4umZhbHNl5pe25L2/55SoXHJcbiAgICAgKiBAcGFyYW0gaWR4IFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGNJdGVtU2l6ZVVuZml4ZWQoaWR4OiBudW1iZXIpOiBjYy5TaXplIHtcclxuICAgICAgICBpZiAodGhpcy5fbGlzdC5jYWxjSXRlbVNpemUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QuY2FsY0l0ZW1TaXplKHRoaXMuX2xpc3QuYXJnc0FycltpZHhdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZml4ZWRTaXplO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnRlbnTkvY3np7vnm5HlkKzlm57osINcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblBvc2l0aW9uQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBTY3JvbGxWaWV35rqQ56CB55qEYnVn5aSE55CGXHJcbiAgICAgICAgLy8gMS7otoXlh7rovrnnlYznmoTlt67lgLzkvJrorrDlvZXlnKhfb3V0T2ZCb3VuZGFyeUFtb3VudOmHjO+8jOS9huaYr+i/meS4ql9vdXRPZkJvdW5kYXJ5QW1vdW505LiN5piv5q+P5qyh5qOA5rWL6L6555WM5pe26YO95pu05paw55qE77yM5a6D6ZyA6KaBX291dE9mQm91bmRhcnlBbW91bnREaXJ0eeS4unRydWXmiY3kvJrmm7TmlrBcclxuICAgICAgICAvLyAyLuWcqGNvbnRlbnQgc2l6ZeaUueWPmOeahOaXtuWAme+8jFNjcm9sbFZpZXfkvJrmo4DmtYtjb250ZW505pyJ5rKh5pyJ6LaF5Ye66L6555WM77yM5q2k5pe25Lya5pu05pawX291dE9mQm91bmRhcnlBbW91bnTlubbnm7TmjqXkv67mlLljb250ZW505Z2Q5qCH44CC5L2G5piv5L+u5pS55a6MY29udGVudOWdkOagh+S5i+WQjl9vdXRPZkJvdW5kYXJ5QW1vdW506K6w5b2V55qE5LuN5pen5piv5pen5YC877yM5q2k5pe2X291dE9mQm91bmRhcnlBbW91bnREaXJ0eeS4umZhbHNl44CCXHJcbiAgICAgICAgLy8gMy5TY3JvbGxWaWV35ZyodG91Y2hlbmTnmoTml7blgJnkvJrop6blj5Hmo4DmtYvlvZPliY3mnInmsqHmnInotoXlh7rovrnnlYzvvIzmnInnmoTor53oh6rliqjlm57lvLnmu5rliqjjgILnlLHkuo5fb3V0T2ZCb3VuZGFyeUFtb3VudERpcnR55Li6ZmFsc2XvvIzmiYDku6XlubbmnKrmm7TmlrBfb3V0T2ZCb3VuZGFyeUFtb3VudO+8jOiAjOaYr+ebtOaOpeWPlumUmeivr+eahF9vdXRPZkJvdW5kYXJ5QW1vdW505L2c5Li66LaF5Ye66L6555WM55qE5YC877yM54S25ZCO6L+b6KGM6ZSZ6K+v55qE6Ieq5Yqo5Zue5by544CCXHJcbiAgICAgICAgdGhpcy5fbGlzdC5zY3JvbGxWaWV3W1wiX291dE9mQm91bmRhcnlBbW91bnREaXJ0eVwiXSA9IHRydWU7XHJcbiAgICAgICAgLy8g5pu05paw5qCH6K6wXHJcbiAgICAgICAgdGhpcy5fdmlld0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9wb3NEaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2aWV3IHNpemXnm5HlkKzlm57osINcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblZpZXdTaXplQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl92aWV3RWRnZSA9IHRoaXMuZ2V0Tm9kZUVkZ2VSZWN0KHRoaXMuX3ZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WY29udGVudOebuOWvuXZpZXflt6bkuIrop5Lljp/ngrnkvY3nva7nmoTlgY/np7vlgLxcclxuICAgICAqIEBwYXJhbSBpZHgg5YWD57Sg5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0gaXRlbUFuY2hvciDlhYPntKDnmoTplJrngrnkvY3nva7vvIjlt6bkuIvop5LkuLow54K577yJXHJcbiAgICAgKiBAcGFyYW0gdmlld0FuY2hvciB2aWV355qE6ZSa54K55L2N572u77yI5bem5LiL6KeS5Li6MOeCue+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2Nyb2xsT2Zmc2V0KGlkeDogbnVtYmVyLCBpdGVtQW5jaG9yOiBjYy5WZWMyLCB2aWV3QW5jaG9yOiBjYy5WZWMyKTogY2MuVmVjMiB7XHJcbiAgICAgICAgaWR4ID0gTWF0aC5taW4oaWR4LCB0aGlzLl9saXN0LmFyZ3NBcnIubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QuaXNGaXhlZFNpemUgPyB0aGlzLmdldFNjcm9sbE9mZnNldEZpeGVkKGlkeCwgaXRlbUFuY2hvciwgdmlld0FuY2hvcikgOiB0aGlzLmdldFNjcm9sbE9mZnNldFVuZml4ZWQoaWR4LCBpdGVtQW5jaG9yLCB2aWV3QW5jaG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNjcm9sbE9mZnNldEZpeGVkKGlkeDogbnVtYmVyLCBpdGVtQW5jaG9yOiBjYy5WZWMyLCB2aWV3QW5jaG9yOiBjYy5WZWMyKTogY2MuVmVjMiB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRFZGdlID0gdGhpcy5nZXROb2RlRWRnZVJlY3QodGhpcy5ub2RlKTtcclxuICAgICAgICBsZXQgeE1heDogbnVtYmVyLCB4TWluOiBudW1iZXIsIHlNYXg6IG51bWJlciwgeU1pbjogbnVtYmVyO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IExheW91dFR5cGUuVkVSVElDQUwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgIHlNYXggPSBjb250ZW50RWRnZS55TWF4IC0gKHRoaXMudG9wICsgaWR4ICogdGhpcy5zcGFjaW5nWSArIHRoaXMuX2ZpeGVkU2l6ZS5oZWlnaHQgKiBpZHgpO1xyXG4gICAgICAgICAgICAgICAgeU1pbiA9IHlNYXggLSB0aGlzLl9maXhlZFNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeU1pbiA9IGNvbnRlbnRFZGdlLnlNaW4gKyB0aGlzLmJvdHRvbSArIGlkeCAqIHRoaXMuc3BhY2luZ1kgKyB0aGlzLl9maXhlZFNpemUuaGVpZ2h0ICogaWR4O1xyXG4gICAgICAgICAgICAgICAgeU1heCA9IHlNaW4gKyB0aGlzLl9maXhlZFNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fdmlld0VkZ2UueE1pbiAtIChjb250ZW50RWRnZS54TWluICsgdGhpcy5ub2RlLngpO1xyXG4gICAgICAgICAgICBsZXQgeSA9IGNvbnRlbnRFZGdlLnlNYXggLSAodGhpcy5fZml4ZWRTaXplLmhlaWdodCAqIGl0ZW1BbmNob3IueSArIHlNaW4pIC0gKDEgLSB2aWV3QW5jaG9yLnkpICogdGhpcy5fdmlld0VkZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IExheW91dFR5cGUuSE9SSVpPTlRBTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQpIHtcclxuICAgICAgICAgICAgICAgIHhNYXggPSBjb250ZW50RWRnZS54TWF4IC0gKHRoaXMucmlnaHQgKyBpZHggKiB0aGlzLnNwYWNpbmdYICsgdGhpcy5fZml4ZWRTaXplLndpZHRoICogaWR4KTtcclxuICAgICAgICAgICAgICAgIHhNaW4gPSB4TWF4IC0gdGhpcy5fZml4ZWRTaXplLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeE1pbiA9IGNvbnRlbnRFZGdlLnhNaW4gKyB0aGlzLmxlZnQgKyBpZHggKiB0aGlzLnNwYWNpbmdYICsgdGhpcy5fZml4ZWRTaXplLndpZHRoICogaWR4O1xyXG4gICAgICAgICAgICAgICAgeE1heCA9IHhNaW4gKyB0aGlzLl9maXhlZFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9maXhlZFNpemUud2lkdGggKiBpdGVtQW5jaG9yLnggKyB4TWluIC0gY29udGVudEVkZ2UueE1pbiAtIHZpZXdBbmNob3IueCAqIHRoaXMuX3ZpZXdFZGdlLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgeSA9IGNvbnRlbnRFZGdlLnlNYXggLSAodGhpcy5fdmlld0VkZ2UueU1heCAtIHRoaXMubm9kZS55KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOiuoeeul+W9k+WJjeWFg+e0oOaOkuWcqOesrOWHoOihjOesrOWHoOWIl++8jOS7jjDlvIDlp4tcclxuICAgICAgICAgICAgbGV0IHJvd0luZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0QXhpcyA9PT0gQXhpc0RpcmVjdGlvbi5IT1JJWk9OVEFMKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTWF0aC5mbG9vcigodGhpcy5ub2RlLndpZHRoIC0gdGhpcy5sZWZ0IC0gdGhpcy5yaWdodCArIHRoaXMuc3BhY2luZ1gpIC8gKHRoaXMuX2ZpeGVkU2l6ZS53aWR0aCArIHRoaXMuc3BhY2luZ1gpKTtcclxuICAgICAgICAgICAgICAgIG51bSA9IE1hdGgubWF4KG51bSwgMSk7XHJcbiAgICAgICAgICAgICAgICByb3dJbmRleCA9IE1hdGguZmxvb3IoaWR4IC8gbnVtKTtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gaWR4ICUgbnVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IE1hdGguZmxvb3IoKHRoaXMubm9kZS5oZWlnaHQgLSB0aGlzLnRvcCAtIHRoaXMuYm90dG9tICsgdGhpcy5zcGFjaW5nWSkgLyAodGhpcy5fZml4ZWRTaXplLmhlaWdodCArIHRoaXMuc3BhY2luZ1kpKTtcclxuICAgICAgICAgICAgICAgIG51bSA9IE1hdGgubWF4KG51bSwgMSk7XHJcbiAgICAgICAgICAgICAgICByb3dJbmRleCA9IGlkeCAlIG51bTtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gTWF0aC5mbG9vcihpZHggLyBudW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbERpcmVjdGlvbiA9PT0gVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTSkge1xyXG4gICAgICAgICAgICAgICAgeU1heCA9IGNvbnRlbnRFZGdlLnlNYXggLSAodGhpcy50b3AgKyByb3dJbmRleCAqIHRoaXMuc3BhY2luZ1kgKyB0aGlzLl9maXhlZFNpemUuaGVpZ2h0ICogcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgeU1pbiA9IHlNYXggLSB0aGlzLl9maXhlZFNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeU1pbiA9IGNvbnRlbnRFZGdlLnlNaW4gKyB0aGlzLmJvdHRvbSArIHJvd0luZGV4ICogdGhpcy5zcGFjaW5nWSArIHRoaXMuX2ZpeGVkU2l6ZS5oZWlnaHQgKiByb3dJbmRleDtcclxuICAgICAgICAgICAgICAgIHlNYXggPSB5TWluICsgdGhpcy5fZml4ZWRTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICB4TWF4ID0gY29udGVudEVkZ2UueE1heCAtICh0aGlzLnJpZ2h0ICsgY29sdW1uSW5kZXggKiB0aGlzLnNwYWNpbmdYICsgdGhpcy5fZml4ZWRTaXplLndpZHRoICogY29sdW1uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgeE1pbiA9IHhNYXggLSB0aGlzLl9maXhlZFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4TWluID0gY29udGVudEVkZ2UueE1pbiArIHRoaXMubGVmdCArIGNvbHVtbkluZGV4ICogdGhpcy5zcGFjaW5nWCArIHRoaXMuX2ZpeGVkU2l6ZS53aWR0aCAqIGNvbHVtbkluZGV4O1xyXG4gICAgICAgICAgICAgICAgeE1heCA9IHhNaW4gKyB0aGlzLl9maXhlZFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9maXhlZFNpemUud2lkdGggKiBpdGVtQW5jaG9yLnggKyB4TWluIC0gY29udGVudEVkZ2UueE1pbiAtIHZpZXdBbmNob3IueCAqIHRoaXMuX3ZpZXdFZGdlLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgeSA9IGNvbnRlbnRFZGdlLnlNYXggLSAodGhpcy5fZml4ZWRTaXplLmhlaWdodCAqIGl0ZW1BbmNob3IueSArIHlNaW4pIC0gKDEgLSB2aWV3QW5jaG9yLnkpICogdGhpcy5fdmlld0VkZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2Nyb2xsT2Zmc2V0VW5maXhlZChpZHg6IG51bWJlciwgaXRlbUFuY2hvcjogY2MuVmVjMiwgdmlld0FuY2hvcjogY2MuVmVjMik6IGNjLlZlYzIge1xyXG4gICAgICAgIGxldCBjb250ZW50RWRnZSA9IHRoaXMuZ2V0Tm9kZUVkZ2VSZWN0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgbGV0IHhNYXg6IG51bWJlciwgeE1pbjogbnVtYmVyLCB5TWF4OiBudW1iZXIsIHlNaW46IG51bWJlcjtcclxuICAgICAgICBsZXQgY3VyU2l6ZTogY2MuU2l6ZSA9IHRoaXMuY2FsY0l0ZW1TaXplVW5maXhlZChpZHgpO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IExheW91dFR5cGUuVkVSVElDQUwpIHtcclxuICAgICAgICAgICAgbGV0IHRvdGFsSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkeDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuY2FsY0l0ZW1TaXplVW5maXhlZChpKTtcclxuICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsRGlyZWN0aW9uID09PSBWZXJ0aWNhbERpcmVjdGlvbi5UT1BfVE9fQk9UVE9NKSB7XHJcbiAgICAgICAgICAgICAgICB5TWF4ID0gY29udGVudEVkZ2UueU1heCAtICh0aGlzLnRvcCArIGlkeCAqIHRoaXMuc3BhY2luZ1kgKyB0b3RhbEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB5TWluID0geU1heCAtIGN1clNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeU1pbiA9IGNvbnRlbnRFZGdlLnlNaW4gKyB0aGlzLmJvdHRvbSArIGlkeCAqIHRoaXMuc3BhY2luZ1kgKyB0b3RhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgIHlNYXggPSB5TWluICsgY3VyU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl92aWV3RWRnZS54TWluIC0gKGNvbnRlbnRFZGdlLnhNaW4gKyB0aGlzLm5vZGUueCk7XHJcbiAgICAgICAgICAgIGxldCB5ID0gY29udGVudEVkZ2UueU1heCAtIChjdXJTaXplLmhlaWdodCAqIGl0ZW1BbmNob3IueSArIHlNaW4pIC0gKDEgLSB2aWV3QW5jaG9yLnkpICogdGhpcy5fdmlld0VkZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IExheW91dFR5cGUuSE9SSVpPTlRBTCkge1xyXG4gICAgICAgICAgICBsZXQgdG90YWxXaWR0aDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZHg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLmNhbGNJdGVtU2l6ZVVuZml4ZWQoaSk7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFdpZHRoICs9IHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICB4TWF4ID0gY29udGVudEVkZ2UueE1heCAtICh0aGlzLnJpZ2h0ICsgaWR4ICogdGhpcy5zcGFjaW5nWCArIHRvdGFsV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgeE1pbiA9IHhNYXggLSBjdXJTaXplLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeE1pbiA9IGNvbnRlbnRFZGdlLnhNaW4gKyB0aGlzLmxlZnQgKyBpZHggKiB0aGlzLnNwYWNpbmdYICsgdG90YWxXaWR0aDtcclxuICAgICAgICAgICAgICAgIHhNYXggPSB4TWluICsgY3VyU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgeCA9IGN1clNpemUud2lkdGggKiBpdGVtQW5jaG9yLnggKyB4TWluIC0gY29udGVudEVkZ2UueE1pbiAtIHZpZXdBbmNob3IueCAqIHRoaXMuX3ZpZXdFZGdlLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgeSA9IGNvbnRlbnRFZGdlLnlNYXggLSAodGhpcy5fdmlld0VkZ2UueU1heCAtIHRoaXMubm9kZS55KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeaWsOaOkuWIl1xyXG4gICAgICogQHBhcmFtIGNsZWFyIOaYr+WQpua4heepuuiKgueCue+8jOm7mOiupHRydWUo5LuF5b2T5LiN5Lya5b2x5ZON5bey5pyJ5YWD57Sg6IqC54K55o6S5YiX5pe25omN5Y+v5Lyg5YWlZmFsc2UpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFycmFuZ2UoY2xlYXI6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl92aWV3RGlydHkgPSB0cnVlO1xyXG4gICAgICAgIGlmIChjbGVhcikge1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1dEl0ZW1Ob2RlKGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3RoZXJJdGVtc0Fyci5mb3JFYWNoKChhcnIsIG90aGVySWR4KSA9PiB7IHRoaXMucHV0SXRlbU5vZGUoYXJyW2ldLCB0cnVlLCBvdGhlcklkeCk7IH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5faXRlbXMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fb3RoZXJJdGVtc0Fyci5mb3JFYWNoKChhcnIpID0+IHsgYXJyLmxlbmd0aCA9IDA7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOaJgOaciea/gOa0u+eahGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZnJlc2hBbGxJdGVtcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2aSA9IGl0ZW0uZ2V0Q29tcG9uZW50KFZpcnR1YWxJdGVtKTtcclxuICAgICAgICAgICAgdmkub25SZWZyZXNoKHZpLmFyZ3MpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5vdGhlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmkub25SZWZyZXNoT3RoZXJzKC4uLnZpLm90aGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=